-- ============================================================
-- DAN SIAM AMULETS — COMPLETE SUPABASE DATABASE SCHEMA
-- Run this in your new Supabase Project:
-- Dashboard → SQL Editor → New query → Paste & Run
-- ============================================================

-- 1. PRODUCTS TABLE
create table if not exists public.products (
  id              bigserial primary key,
  legacy_id       integer unique,
  slug            text unique not null,
  name            text not null,
  name_th         text,
  name_zh         text,
  category        text default 'General',
  price           integer not null,                     -- satang (THB * 100)
  sale_price      integer,
  stock           integer not null default 0,
  description     text,
  description_th  text,
  description_zh  text,
  short           text,
  images          jsonb not null default '[]'::jsonb,
  is_featured     boolean default false,
  published       boolean default true,
  views           integer default 0,
  mark_location   text,
  mark_fb         boolean default false,
  mark_tt         boolean default false,
  mark_ig         boolean default false,
  mark_shopee2    boolean default false,
  mark_thaimart   boolean default false,
  name_shopee     text,
  name_shopee2    text,
  name_lazada     text,
  name_facebook   text,
  name_tiktok     text,
  name_instagram  text,
  storage_location text,
  search_text     text,
  thumbnail_url   text,
  image_embedding jsonb,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create index if not exists products_category_idx on public.products(category);
create index if not exists products_published_idx on public.products(published) where published = true;
create index if not exists products_stock_idx on public.products(stock) where stock > 0;
create index if not exists products_featured_idx on public.products(is_featured) where is_featured = true;
create index if not exists products_search_idx on public.products
  using gin (to_tsvector('simple', coalesce(name,'') || ' ' || coalesce(description,'') || ' ' || coalesce(category,'')));

-- 2. SHOPEE PRODUCTS TABLE
create table if not exists public.shopee_products (
  id              bigserial primary key,
  name            text not null,
  name_th         text,
  name_shopee     text,
  price           numeric,
  stock           integer not null default 0,
  images          jsonb not null default '[]'::jsonb,
  shopee_images   jsonb not null default '[]'::jsonb,
  mark_location   text,
  mark_fb         boolean default false,
  mark_tt         boolean default false,
  mark_ig         boolean default false,
  mark_shopee2    boolean default false,
  mark_thaimart   boolean default false,
  name_shopee2    text,
  name_lazada     text,
  name_facebook   text,
  name_tiktok     text,
  name_instagram  text,
  storage_location text,
  search_text     text,
  description     text,
  description_th  text,
  description_zh  text,
  short           text,
  image_embedding jsonb,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- 3. JUNE PRODUCTS TABLE
create table if not exists public.june_products (
  id              bigserial primary key,
  name            text not null,
  name_th         text,
  name_shopee     text,
  price           numeric,
  stock           integer not null default 0,
  images          jsonb not null default '[]'::jsonb,
  shopee_images   jsonb not null default '[]'::jsonb,
  mark_location   text,
  mark_fb         boolean default false,
  mark_tt         boolean default false,
  mark_ig         boolean default false,
  mark_shopee2    boolean default false,
  mark_thaimart   boolean default false,
  name_shopee2    text,
  name_lazada     text,
  name_facebook   text,
  name_tiktok     text,
  name_instagram  text,
  storage_location text,
  search_text     text,
  description     text,
  description_th  text,
  description_zh  text,
  short           text,
  image_embedding jsonb,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- 4. ORDERS TABLE
create table if not exists public.orders (
  id                        uuid primary key default gen_random_uuid(),
  user_id                   uuid references auth.users(id) on delete set null,
  customer_email            text not null,
  customer_name             text,
  customer_phone            text,
  shipping_address          jsonb not null,
  items                     jsonb not null,
  subtotal                  integer not null,
  shipping_cost             integer default 0,
  total                     integer not null,
  currency                  text default 'thb',
  stripe_session_id         text unique,
  stripe_payment_id         text,
  status                    text not null default 'pending',
  notes                     text,
  payment_slip_url          text,
  payment_slip_uploaded_at  timestamptz,
  tracking_number           text,
  tracking_url              text,
  carrier                   text,
  created_at                timestamptz default now(),
  updated_at                timestamptz default now()
);

create index if not exists orders_user_idx on public.orders(user_id);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_stripe_session_idx on public.orders(stripe_session_id);
create index if not exists orders_created_idx on public.orders(created_at desc);
create index if not exists orders_email_idx on public.orders(customer_email);

-- 5. CARTS TABLE
create table if not exists public.carts (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  items       jsonb not null default '[]'::jsonb,
  updated_at  timestamptz default now()
);

-- 6. ADMINS TABLE
create table if not exists public.admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  email      text not null unique,
  role       text not null default 'admin',         -- admin | owner
  created_at timestamptz default now()
);

-- 7. BLOG POSTS TABLE
create table if not exists public.blog_posts (
  id              bigserial primary key,
  slug            text unique not null,
  title           text not null,
  title_th        text,
  title_zh        text,
  excerpt         text,
  excerpt_th      text,
  excerpt_zh      text,
  content         text,
  content_th      text,
  content_zh      text,
  cover_image     text,
  category        text,
  views           integer default 0,
  published       boolean default true,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- 8. ACCOUNTING RECORDS TABLE
create table if not exists public.accounting_records (
  id              bigserial primary key,
  type            text not null check (type in ('INCOME', 'EXPENSE', 'SALE')),
  date            date not null,
  category        text,
  product_name    text,
  amount          numeric not null default 0,
  cost            numeric default 0,
  fee             numeric default 0,
  shipping        numeric default 0,
  description     text,
  image_url       text,
  order_id        text,
  created_at      timestamptz default now()
);

-- 9. USER ADDRESSES TABLE
create table if not exists public.addresses (
  id          bigserial primary key,
  user_id     uuid references auth.users(id) on delete cascade,
  label       text not null default 'Home',
  name        text not null,
  phone       text,
  address     text not null,
  city        text,
  province    text,
  postal_code text,
  country     text default 'Thailand',
  is_default  boolean default false,
  created_at  timestamptz default now()
);

-- 10. REVIEWS TABLE
create table if not exists public.reviews (
  id          bigserial primary key,
  order_id    text,
  user_email  text,
  rating      integer not null check (rating between 1 and 5),
  body        text,
  approved    boolean default false,
  created_at  timestamptz default now()
);

-- 11. DISCOUNT CODES TABLE
create table if not exists public.discount_codes (
  id          bigserial primary key,
  code        text unique not null,
  email       text,
  percent     integer not null default 5,
  expires_at  timestamptz not null,
  used        boolean default false,
  used_at     timestamptz,
  review_id   bigint,
  created_at  timestamptz default now()
);

-- 12. PRODUCT VIEW EVENTS TABLE
create table if not exists public.product_view_events (
  id          bigserial primary key,
  product_id  bigint not null,
  created_at  timestamptz default now()
);
create index if not exists product_view_events_created_idx on public.product_view_events(created_at desc);

-- 13. WISHLIST EVENTS TABLE
create table if not exists public.wishlist_events (
  id          bigserial primary key,
  product_id  bigint not null,
  action      text not null,
  created_at  timestamptz default now()
);

-- 14. LABEL CONTACTS TABLE
create table if not exists public.label_contacts (
  id          bigserial primary key,
  name        text not null,
  phone       text,
  address     text not null,
  province    text,
  zip         text,
  created_at  timestamptz default now()
);

-- 15. AUDIT LOGS TABLE
create table if not exists public.audit_logs (
  id          uuid primary key default gen_random_uuid(),
  table_name  text not null,
  action      text not null check (action in ('INSERT', 'UPDATE', 'DELETE')),
  record_id   text not null,
  old_data    jsonb,
  new_data    jsonb,
  changed_by  uuid references auth.users(id) on delete set null,
  created_at  timestamptz default now()
);

-- 16. PROCESSED WEBHOOK EVENTS TABLE
create table if not exists public.processed_webhook_events (
  id          bigserial primary key,
  event_id    text unique not null,
  event_type  text,
  created_at  timestamptz default now()
);

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Function: set_updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at before update on public.products for each row execute function public.set_updated_at();
create trigger shopee_products_updated_at before update on public.shopee_products for each row execute function public.set_updated_at();
create trigger june_products_updated_at before update on public.june_products for each row execute function public.set_updated_at();
create trigger orders_updated_at before update on public.orders for each row execute function public.set_updated_at();
create trigger blog_posts_updated_at before update on public.blog_posts for each row execute function public.set_updated_at();

-- Function: is_admin
create or replace function public.is_admin(uid uuid)
returns boolean as $$
  select exists(select 1 from public.admins where user_id = uid);
$$ language sql stable security definer;

-- Function: increment_product_views
create or replace function public.increment_product_views(product_id bigint)
returns void language plpgsql security definer as $$
begin
  update public.products
  set views = coalesce(views, 0) + 1
  where id = product_id;
end;
$$;
grant execute on function public.increment_product_views(bigint) to anon, authenticated, service_role;

-- Function: decrement_stock (for checkout)
create or replace function public.decrement_stock(items jsonb)
returns void as $$
declare
  item jsonb;
  current_stock int;
  need_qty int;
  prod_id bigint;
begin
  for item in select * from jsonb_array_elements(items)
  loop
    prod_id  := (item->>'product_id')::bigint;
    need_qty := (item->>'qty')::int;

    select stock into current_stock from public.products where id = prod_id for update;

    if current_stock is null then
      raise exception 'Product % not found', prod_id;
    end if;

    if current_stock < need_qty then
      raise exception 'Insufficient stock for product %: have %, need %', prod_id, current_stock, need_qty;
    end if;

    update public.products set stock = stock - need_qty where id = prod_id;
  end loop;
end;
$$ language plpgsql security definer;

revoke execute on function public.decrement_stock(jsonb) from public, anon, authenticated;
grant execute on function public.decrement_stock(jsonb) to service_role;

-- Function: audit_trigger_func
create or replace function public.audit_trigger_func()
returns trigger as $$
declare
  user_id uuid;
begin
  begin user_id := auth.uid(); exception when others then user_id := null; end;
  if (tg_op = 'DELETE') then
    insert into public.audit_logs (table_name, action, record_id, old_data, changed_by)
    values (tg_table_name::text, tg_op, old.id::text, row_to_json(old)::jsonb, user_id);
    return old;
  elsif (tg_op = 'UPDATE') then
    if row_to_json(old) is distinct from row_to_json(new) then
      insert into public.audit_logs (table_name, action, record_id, old_data, new_data, changed_by)
      values (tg_table_name::text, tg_op, new.id::text, row_to_json(old)::jsonb, row_to_json(new)::jsonb, user_id);
    end if;
    return new;
  elsif (tg_op = 'INSERT') then
    insert into public.audit_logs (table_name, action, record_id, new_data, changed_by)
    values (tg_table_name::text, tg_op, new.id::text, row_to_json(new)::jsonb, user_id);
    return new;
  end if;
  return null;
end;
$$ language plpgsql security definer;

create trigger audit_products_trigger after insert or update or delete on public.products for each row execute function public.audit_trigger_func();
create trigger audit_orders_trigger after insert or update or delete on public.orders for each row execute function public.audit_trigger_func();

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================
alter table public.products enable row level security;
alter table public.shopee_products enable row level security;
alter table public.june_products enable row level security;
alter table public.orders enable row level security;
alter table public.carts enable row level security;
alter table public.admins enable row level security;
alter table public.blog_posts enable row level security;
alter table public.accounting_records enable row level security;
alter table public.addresses enable row level security;
alter table public.reviews enable row level security;
alter table public.discount_codes enable row level security;
alter table public.product_view_events enable row level security;
alter table public.audit_logs enable row level security;

-- Products: Public can read published, service_role & admin can manage
create policy "products_public_read" on public.products for select using (published = true or public.is_admin(auth.uid()));
create policy "products_admin_write" on public.products for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Shopee & June products: Admin & Staff (via service_role or admin)
create policy "shopee_products_all" on public.shopee_products for all using (true) with check (true);
create policy "june_products_all" on public.june_products for all using (true) with check (true);

-- Orders: Users see own, Admins see all
create policy "orders_user_select" on public.orders for select using (auth.uid() = user_id or public.is_admin(auth.uid()));
create policy "orders_admin_update" on public.orders for update using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Carts: Users manage own
create policy "carts_user_all" on public.carts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Admins: Admins can view
create policy "admins_self_select" on public.admins for select using (auth.uid() = user_id or public.is_admin(auth.uid()));

-- Blog: Public can read published
create policy "blog_public_read" on public.blog_posts for select using (published = true or public.is_admin(auth.uid()));
create policy "blog_admin_all" on public.blog_posts for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Reviews: Public read approved
create policy "reviews_public_read" on public.reviews for select using (approved = true or public.is_admin(auth.uid()));

-- Addresses: Users manage own
create policy "addresses_user_all" on public.addresses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Realtime publication setup
alter publication supabase_realtime add table public.orders;
