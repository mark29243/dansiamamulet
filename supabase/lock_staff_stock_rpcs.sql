-- ============================================================================
-- LOCK DOWN INTERNAL & STAFF STOCK RPC FUNCTIONS (Zero-Trust Database Layer)
-- Run this once in Supabase Dashboard -> SQL Editor
-- ============================================================================
-- After deploying /api/staff/stock-rpc, all staff stock tools and server APIs
-- call these RPCs using service_role. Revoking PUBLIC and anon prevents anyone
-- from calling them directly via PostgREST with the public ANON_KEY.

DO $$
DECLARE
  fn RECORD;
BEGIN
  FOR fn IN
    SELECT p.oid::regprocedure AS regproc
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND p.proname IN (
        'quick_mark_sold',
        'quick_restore_stock',
        'quick_update_platform_info',
        'get_stock_dashboard_summary',
        'get_products_paginated',
        'decrement_stock',
        'decrement_stock_batch',
        'rate_limit_hit'
      )
  LOOP
    EXECUTE format('REVOKE ALL ON FUNCTION %s FROM PUBLIC, anon, authenticated;', fn.regproc);
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO service_role;', fn.regproc);
  END LOOP;
END $$;
