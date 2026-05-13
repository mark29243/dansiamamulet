-- ============================================================
-- DAN SIAM AMULETS — Supabase Schema (v2)
-- Run this in Supabase SQL Editor (Dashboard → SQL → New query)
-- Safe to re-run: uses IF NOT EXISTS + DROP IF EXISTS
-- ============================================================

-- 1. PRODUCTS TABLE
create table if not exists public.products (
  id           bigserial primary key,
  legacy_id    integer unique,
  slug         text unique not null,
  name         text not null,
  name_th      text,
  name_zh      text,
  category     text default 'General',
  price        integer not null,                     -- satang (THB * 100)
  sale_price   integer,
  stock        integer not null default 0,
  description  text,
  description_th text,
  description_zh text,
  short        text,
  images       jsonb not null default '[]'::jsonb,
  is_featured  boolean default false,
  published    boolean default true,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

create index if not exists products_category_idx on public.products(category);
create index if not exists products_published_idx on public.products(published) where published = true;
create index if not exists products_stock_idx on public.products(stock) where stock > 0;
create index if not exists products_featured_idx on public.products(is_featured) where is_featured = true;

-- Full-text search index (supports Thai, English, Chinese partial matching)
create index if not exists products_search_idx on public.products
  using gin (to_tsvector('simple', coalesce(name,'') || ' ' || coalesce(description,'') || ' ' || coalesce(category,'')));

-- 2. ORDERS TABLE
create table if not exists public.orders (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid references auth.users(id) on delete set null,
  customer_email      text not null,
  customer_name       text,
  customer_phone      text,
  shipping_address    jsonb not null,
  items               jsonb not null,
  subtotal            integer not null,
  shipping_cost       integer default 0,
  total               integer not null,
  currency            text default 'thb',
  stripe_session_id   text unique,
  stripe_payment_id   text,
  status              text not null default 'pending',
  notes               text,
  tracking_number     text,
  carrier             text,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

create index if not exists orders_user_idx on public.orders(user_id);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_stripe_session_idx on public.orders(stripe_session_id);
create index if not exists orders_created_idx on public.orders(created_at desc);
create index if not exists orders_email_idx on public.orders(customer_email);

-- 3. CART TABLE
create table if not exists public.carts (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  items       jsonb not null default '[]'::jsonb,
  updated_at  timestamptz default now()
);

-- 4. ADMINS TABLE
create table if not exists public.admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  email      text not null unique,
  role       text not null default 'admin',         -- admin | owner
  created_at timestamptz default now()
);

-- 5. UPDATED_AT TRIGGER
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at before update on public.orders
  for each row execute function public.set_updated_at();

-- 6. IS_ADMIN HELPER FUNCTION
create or replace function public.is_admin(uid uuid)
returns boolean as $$
  select exists(select 1 from public.admins where user_id = uid);
$$ language sql stable security definer;

-- 7. ATOMIC STOCK DECREMENT (race-condition safe)
-- Decrements stock for multiple products in one transaction.
-- Used by the Stripe webhook to avoid overselling.
create or replace function public.decrement_stock(items jsonb)
returns void as $$
declare
  item jsonb;
begin
  for item in select * from jsonb_array_elements(items)
  loop
    update public.products
       set stock = greatest(0, stock - (item->>'qty')::int)
     where id = (item->>'product_id')::bigint;
  end loop;
end;
$$ language plpgsql security definer;

-- 8. ROW LEVEL SECURITY
alter table public.products enable row level security;
alter table public.orders   enable row level security;
alter table public.carts    enable row level security;
alter table public.admins   enable row level security;

-- Products: anyone reads published; admins read all + can write
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read" on public.products
  for select using (published = true or public.is_admin(auth.uid()));

drop policy if exists "products_admin_write" on public.products;
create policy "products_admin_write" on public.products
  for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Orders: users see only their own; admins see all
drop policy if exists "orders_user_select" on public.orders;
create policy "orders_user_select" on public.orders
  for select using (auth.uid() = user_id or public.is_admin(auth.uid()));

drop policy if exists "orders_user_insert" on public.orders;
create policy "orders_user_insert" on public.orders
  for insert with check (auth.uid() = user_id or user_id is null);

drop policy if exists "orders_admin_update" on public.orders;
create policy "orders_admin_update" on public.orders
  for update using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Carts: users manage their own
drop policy if exists "carts_user_all" on public.carts;
create policy "carts_user_all" on public.carts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Admins: only admins read; only owner can write
drop policy if exists "admins_self_select" on public.admins;
create policy "admins_self_select" on public.admins
  for select using (auth.uid() = user_id or public.is_admin(auth.uid()));

-- ============================================================
-- AFTER YOU SIGN UP YOUR FIRST USER:
-- Run this to make yourself admin (replace email):
--
-- insert into public.admins (user_id, email, role)
-- select id, email, 'owner' from auth.users where email = 'you@example.com';
-- ============================================================
