import { createServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getServices = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabase
    .from("services")
    .select("*, service_packages(*)")
    .order("sort_order");
  if (error) throw error;
  return data;
});

export const getServiceById = createServerFn({ method: "GET" })
  .inputValidator(z.string().parse)
  .handler(async ({ data: id }) => {
    // First try to find by ID if it's a valid UUID
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
    
    let query = supabase
      .from("services")
      .select("*, service_packages(*)");
    
    if (isUuid) {
      query = query.or(`id.eq.${id},slug.eq.${id}`);
    } else {
      query = query.eq("slug", id);
    }
    
    const { data, error } = await query.maybeSingle();
    
    if (error) throw error;
    if (!data) return null;
    return data;
  });

export const createOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({
    userId: z.string().optional(),
    packageId: z.string(),
    customerDetails: z.object({
      name: z.string(),
      email: z.string(),
      phone: z.string().optional(),
      address: z.string().optional(),
      country: z.string().optional()
    }),
    amount: z.number(),
    packageName: z.string().optional(),
    serviceType: z.string().optional(),
    paymentMethod: z.string().optional(),
    status: z.string().optional(),
    paymentStatus: z.string().optional()
  }).parse)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .insert({
        order_number: `ORD-${Date.now()}`,
        user_id: data.userId,
        customer_name: data.customerDetails.name,
        customer_email: data.customerDetails.email,
        customer_phone: data.customerDetails.phone,
        service_type: data.serviceType || 'Digital Service',
        package_name: data.packageName,
        amount: data.amount,
        status: data.status || 'pending',
        payment_status: data.paymentStatus || 'unpaid',
        payment_method: data.paymentMethod
      } as any)
      .select()
      .single();
    if (error) throw error;
    return order;
  });
