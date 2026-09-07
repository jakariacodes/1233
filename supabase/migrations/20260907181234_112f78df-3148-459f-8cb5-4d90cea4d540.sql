
CREATE TABLE public.invoices (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  invoice_number text not null unique,
  customer_name text not null,
  customer_email text not null,
  currency text not null default 'USD',
  amount numeric not null default 0,
  amount_paid numeric not null default 0,
  amount_due numeric not null default 0,
  status text not null default 'due',
  issue_date timestamptz not null default now(),
  due_date timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

CREATE TABLE public.order_payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  invoice_id uuid references public.invoices(id) on delete cascade,
  amount numeric not null,
  method text,
  reference text,
  note text,
  paid_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

GRANT SELECT ON public.invoices TO authenticated;
GRANT ALL ON public.invoices TO service_role;
GRANT SELECT ON public.order_payments TO authenticated;
GRANT ALL ON public.order_payments TO service_role;

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own invoices" ON public.invoices FOR SELECT TO authenticated
USING (
  public.has_role(auth.uid(), 'admin')
  OR EXISTS (SELECT 1 FROM public.orders o WHERE o.id = invoices.order_id AND (o.user_id = auth.uid() OR o.customer_email = auth.email()))
);
CREATE POLICY "Admins manage invoices" ON public.invoices FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users view own payments" ON public.order_payments FOR SELECT TO authenticated
USING (
  public.has_role(auth.uid(), 'admin')
  OR EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_payments.order_id AND (o.user_id = auth.uid() OR o.customer_email = auth.email()))
);
CREATE POLICY "Admins manage payments" ON public.order_payments FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

GRANT INSERT, UPDATE, DELETE ON public.invoices TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.order_payments TO authenticated;

CREATE OR REPLACE FUNCTION public.create_invoice_for_order()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.invoices (order_id, invoice_number, customer_name, customer_email, currency, amount, amount_paid, amount_due, status, due_date)
  VALUES (
    NEW.id,
    'INV-' || to_char(now(), 'YYYYMM') || '-' || upper(substr(replace(NEW.id::text, '-', ''), 1, 6)),
    NEW.customer_name,
    NEW.customer_email,
    COALESCE(NEW.currency, 'USD'),
    NEW.amount,
    CASE WHEN NEW.payment_status = 'paid' THEN NEW.amount ELSE 0 END,
    CASE WHEN NEW.payment_status = 'paid' THEN 0 ELSE NEW.amount END,
    CASE WHEN NEW.payment_status = 'paid' THEN 'paid' ELSE 'due' END,
    now() + interval '7 days'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_create_invoice_for_order
AFTER INSERT ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.create_invoice_for_order();

CREATE OR REPLACE FUNCTION public.recalc_invoice_totals()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_order uuid := COALESCE(NEW.order_id, OLD.order_id);
  v_paid numeric;
  v_total numeric;
BEGIN
  SELECT COALESCE(SUM(amount), 0) INTO v_paid FROM public.order_payments WHERE order_id = v_order;
  SELECT amount INTO v_total FROM public.invoices WHERE order_id = v_order;

  UPDATE public.invoices
  SET amount_paid = v_paid,
      amount_due = GREATEST(COALESCE(v_total,0) - v_paid, 0),
      status = CASE WHEN v_paid <= 0 THEN 'due' WHEN v_paid >= COALESCE(v_total,0) THEN 'paid' ELSE 'partial' END,
      updated_at = now()
  WHERE order_id = v_order;

  UPDATE public.orders
  SET payment_status = CASE WHEN v_paid <= 0 THEN 'unpaid' WHEN v_paid >= COALESCE(v_total,0) THEN 'paid' ELSE 'partial' END
  WHERE id = v_order;

  RETURN NULL;
END;
$$;

CREATE TRIGGER trg_recalc_invoice_totals
AFTER INSERT OR UPDATE OR DELETE ON public.order_payments
FOR EACH ROW EXECUTE FUNCTION public.recalc_invoice_totals();

INSERT INTO public.invoices (order_id, invoice_number, customer_name, customer_email, currency, amount, amount_paid, amount_due, status, issue_date, due_date)
SELECT o.id,
  'INV-' || to_char(COALESCE(o.created_at, now()), 'YYYYMM') || '-' || upper(substr(replace(o.id::text, '-', ''), 1, 6)),
  o.customer_name, o.customer_email, COALESCE(o.currency, 'USD'), o.amount,
  CASE WHEN o.payment_status = 'paid' THEN o.amount ELSE 0 END,
  CASE WHEN o.payment_status = 'paid' THEN 0 ELSE o.amount END,
  CASE WHEN o.payment_status = 'paid' THEN 'paid' ELSE 'due' END,
  COALESCE(o.created_at, now()), COALESCE(o.created_at, now()) + interval '7 days'
FROM public.orders o
WHERE NOT EXISTS (SELECT 1 FROM public.invoices i WHERE i.order_id = o.id);
