import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { z } from "zod";

export const getServices = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("services")
    .select("*, service_packages(*)")
    .order("sort_order");
  if (error) throw error;
  return data;
});

export const createOrder = createServerFn({ method: "POST" })
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
    packageName: z.string().optional()
  }).parse)
  .handler(async ({ data }) => {
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .insert({
        order_number: `ORD-${Date.now()}`,
        user_id: data.userId,
        customer_name: data.customerDetails.name,
        customer_email: data.customerDetails.email,
        customer_phone: data.customerDetails.phone,
        service_type: 'Digital Service',
        package_name: data.packageName,
        amount: data.amount,
        status: 'pending'
      } as any) // Typecast for now as package_id was removed in last migration to match frontend Order interface
      .select()
      .single();
    if (error) throw error;
    return order;
  });
