import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { createOrder } from "@/lib/services.functions";
import { toast } from "sonner";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSuccess from "@/components/checkout/OrderSuccess";
import PackageSummary from "@/components/checkout/PackageSummary";

interface CheckoutProps {
  service: any;
  package: any;
}

const Checkout = ({ service, package: pkg }: CheckoutProps) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: user?.user_metadata?.['full_name'] || "",
    email: user?.email || "",
    password: "",
    phone: "",
    address: "",
    country: "Bangladesh",
  });
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let currentUserId = user?.id;

      // If user is not logged in, sign them up first
      if (!user) {
        if (!formData.password) {
          throw new Error("Password is required to create an account.");
        }
        
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
            },
          },
        });

        if (signUpError) throw signUpError;
        currentUserId = signUpData.user?.id;
        
        if (!currentUserId) {
          throw new Error("Failed to create account. Please try again.");
        }
        
        toast.success("Account created successfully!");
      }

      const order = await createOrder({
        data: {
          userId: currentUserId,
          packageId: pkg.id,
          customerDetails: formData,
          amount: pkg.price,
          packageName: pkg.name,
          serviceType: service.title,
          paymentMethod: paymentMethod
        }
      });
      
      setOrderSuccess(order);
      toast.success("Order placed successfully!");
    } catch (error: any) {
      console.error("Order error:", error);
      toast.error(error.message || "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-24">
        <OrderSuccess orderNumber={orderSuccess.order_number} email={formData.email} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="container-custom max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Checkout Flow */}
          <div className="lg:col-span-8">
            <CheckoutForm 
              formData={formData}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              step={step}
              nextStep={nextStep}
              prevStep={prevStep}
              onPaymentMethodChange={setPaymentMethod}
              selectedPaymentMethod={paymentMethod}
              amount={pkg.price}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <PackageSummary service={service} package={pkg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
