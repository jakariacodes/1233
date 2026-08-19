import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Wallet, Smartphone, Globe, Info, Copy, CreditCard, Landmark } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

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
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: Wallet,
    color: "bg-[#003087]",
    instructions: "Complete your purchase securely using your PayPal account.",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: Landmark,
    color: "bg-[#0D47A1]",
    instructions: "Account: NextOnline Technology, A/C: 123456789, International Bank",
  },
  {
    id: "crypto",
    name: "Crypto (USDT)",
    icon: Globe,
    color: "bg-[#26A17B]",
    instructions: "Address: 0x1234567890abcdef1234567890abcdef12345678 (TRC20)",
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
          className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-white/10 p-2 rounded-lg">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">Payment Instructions</h4>
              <p className="text-slate-400 text-sm">Please follow these steps to complete your payment.</p>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-sm">Amount to Pay</span>
              <span className="text-xl font-bold text-primary">${amount}</span>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-slate-300 mb-2">{selected.instructions}</p>
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                onClick={() => copyToClipboard(selected.instructions)}
                className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white h-10"
              >
                <Copy className="w-4 h-4 mr-2" /> Copy Payment Info
              </Button>
            </div>
          </div>
          
          <p className="text-[10px] text-slate-500 mt-4 text-center leading-relaxed">
            After payment, our team will verify the transaction within 1-2 hours. 
            You will receive a confirmation email once verified.
          </p>
        </motion.div>
      )}
    </div>
  );
}