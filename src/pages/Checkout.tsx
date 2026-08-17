import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, CreditCard, Shield, User, MapPin, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { createOrder } from "@/lib/services.functions";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

interface CheckoutProps {
  service: any;
  package: any;
}

const Checkout = ({ service, package: pkg }: CheckoutProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: user?.user_metadata?.['full_name'] || "",
    email: user?.email || "",
    phone: "",
    address: "",
    country: "Bangladesh",
  });

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
      const order = await createOrder({
        data: {
          userId: user?.id,
          packageId: pkg.id,
          customerDetails: formData,
          amount: pkg.price,
          packageName: pkg.name,
          serviceType: service.title
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-32 pb-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[2.5rem] p-12 text-center shadow-xl border border-slate-100"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-display font-bold mb-4">Order Successful!</h1>
          <p className="text-muted-foreground mb-8">
            Your order <strong>#{orderSuccess.order_number}</strong> has been placed. We'll contact you shortly at <strong>{formData.email}</strong>.
          </p>
          <Button 
            onClick={() => navigate({ to: "/services" })}
            className="w-full h-14 rounded-2xl font-bold"
          >
            Browse More Services
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="container-custom max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Checkout Flow */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
              {/* Stepper */}
              <div className="flex items-center gap-4 mb-12">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= i ? "bg-primary text-white" : "bg-slate-100 text-slate-400"}`}>
                      {i}
                    </div>
                    <span className={`text-sm font-semibold ${step >= i ? "text-slate-900" : "text-slate-400"}`}>
                      {i === 1 ? "Details" : "Confirm"}
                    </span>
                    {i === 1 && <div className="w-12 h-px bg-slate-200 mx-2" />}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input id="name" value={formData.name} onChange={handleInputChange} className="pl-12 h-14 rounded-xl" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" value={formData.email} onChange={handleInputChange} className="h-14 rounded-xl" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" value={formData.phone} onChange={handleInputChange} className="h-14 rounded-xl" placeholder="+880" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="address" value={formData.address} onChange={handleInputChange} className="pl-12 h-14 rounded-xl" />
                        </div>
                      </div>
                      <Button type="button" onClick={nextStep} className="w-full h-14 rounded-2xl font-bold group">
                        Next Step <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
                        <h3 className="font-bold flex items-center gap-2">
                          <Shield className="w-5 h-5 text-primary" />
                          Review Your Details
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Name</p>
                            <p className="font-medium">{formData.name}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Email</p>
                            <p className="font-medium">{formData.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4">
                        <Button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20">
                          {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "Complete Order"}
                        </Button>
                        <Button type="button" variant="ghost" onClick={prevStep} className="h-12 rounded-xl text-muted-foreground">
                          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Details
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 sticky top-32">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="flex gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{pkg.name} Package</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-semibold">৳{pkg.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Transaction Fee</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-slate-100 mb-8">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-display font-bold text-primary">৳{pkg.price.toLocaleString()}</span>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  Your transaction is secure. We use industry-standard encryption to protect your data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
