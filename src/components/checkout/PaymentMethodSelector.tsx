import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Wallet, Smartphone, Globe, Info, Copy, CreditCard, Landmark, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onSelect: (method: string) => void;
  amount: number;
}

const paymentMethods = [
  {
    id: "stripe",
    name: "Credit Card (Stripe)",
    icon: CreditCard,
    color: "bg-[#635BFF]",
    instructions: "Pay securely with your credit or debit card via Stripe.",
    type: "instant"
  },
  {
    id: "pay_later",
    name: "Pay Later",
    icon: Clock,
    color: "bg-amber-500",
    instructions: "Place your order now and complete the payment later via Bank or Crypto. Our team will contact you for details.",
    type: "manual"
  },
  {
    id: "paypal",
    name: "PayPal / Pay Later",
    icon: Wallet,
    color: "bg-[#003087]",
    instructions: "Complete your purchase securely using your PayPal account or PayPal Credit.",
    type: "instant"
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: Landmark,
    color: "bg-[#0D47A1]",
    instructions: "Account: InfraTech, A/C: 123456789, International Bank. Please share the receipt after transfer.",
    type: "manual"
  },
  {
    id: "crypto",
    name: "Crypto (USDT)",
    icon: Globe,
    color: "bg-[#26A17B]",
    instructions: "Address: 0x1234567890abcdef1234567890abcdef12345678 (TRC20). Please share the transaction hash after transfer.",
    type: "manual"
  }
];

export default function PaymentMethodSelector({ selectedMethod, onSelect, amount }: PaymentMethodSelectorProps) {
  const copyToClipboard = (text: string) => {
    if (text) {
      navigator.clipboard.writeText(text.split(":")[1]?.trim()?.split(" ")[0] || "");
      toast.success("Copied to clipboard");
    }
  };

  const selected = paymentMethods.find(m => m.id === selectedMethod);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;
          
          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onSelect(method.id)}
              className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                isSelected 
                  ? "border-primary bg-primary/5 shadow-md" 
                  : "border-slate-100 bg-white hover:border-slate-200"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-3 ${method.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className={`text-sm font-bold ${isSelected ? "text-primary" : "text-slate-600"}`}>
                {method.name}
              </span>
              {isSelected && (
                <div className="absolute -top-2 -right-2 bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 relative overflow-hidden"
        >
          {/* Decorative Gradient Shadow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-blue-500/20 to-teal-500/20 blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-white/10 p-2 rounded-lg">
                <Info className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Payment Instructions</h4>
                <p className="text-slate-400 text-sm">Please follow these steps to complete your payment.</p>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-4 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Amount to Pay</span>
                <span className="text-xl font-bold text-primary">${amount}</span>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                {selected.id === "stripe" && (
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5 mb-4 space-y-3">
                    <Input className="bg-white/5 border-white/10 h-11" placeholder="Card number" />
                    <div className="grid grid-cols-2 gap-3">
                      <Input className="bg-white/5 border-white/10 h-11" placeholder="MM / YY" />
                      <Input className="bg-white/5 border-white/10 h-11" placeholder="CVC" />
                    </div>
                    <Input className="bg-white/5 border-white/10 h-11" placeholder="Name on card" />
                  </div>
                )}

                <p className="text-sm text-slate-300 mb-2">{selected.instructions}</p>
                
                {selected.type === "manual" && (
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(selected.instructions)}
                    className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white h-10 rounded-xl"
                  >
                    <Copy className="w-4 h-4 mr-2" /> Copy Details
                  </Button>
                )}

                {selected.id === "pay_later" && (
                  <div className="mt-3 p-3 bg-primary/10 border border-primary/20 rounded-xl">
                    <p className="text-xs text-primary font-medium flex items-center gap-2">
                      <Clock className="w-3 h-3" /> No upfront payment required
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-[10px] text-slate-500 mt-4 text-center leading-relaxed">
              {selected.type === "manual" 
                ? "After completing the transfer, our admin will verify and approve your order within 1-2 hours." 
                : "Your payment will be processed securely. You will receive an instant confirmation email."}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}