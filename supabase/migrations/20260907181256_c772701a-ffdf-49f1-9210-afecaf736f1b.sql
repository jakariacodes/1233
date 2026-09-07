
REVOKE EXECUTE ON FUNCTION public.create_invoice_for_order() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.recalc_invoice_totals() FROM PUBLIC, anon, authenticated;
