import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Globe, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CheckoutFormProps {
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  step: number;
  nextStep: () => void;
  prevStep: () => void;
}

export default function CheckoutForm({ 
  formData, 
  onChange, 
  onSubmit, 
  isSubmitting, 
  step,
  nextStep,
  prevStep 
}: CheckoutFormProps) {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
      {/* Stepper */}
      <div className="flex items-center gap-4 mb-12">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${step >= i ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-100 text-slate-400"}`}>
              {i}
            </div>
            <span className={`text-sm font-bold ${step >= i ? "text-slate-900" : "text-slate-400"}`}>
              {i === 1 ? "Details" : "Review"}
            </span>
            {i === 1 && <div className="w-12 h-px bg-slate-200 mx-2" />}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit}>
        {step === 1 ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700 font-bold ml-1">Full Name</Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={onChange} 
                    className="pl-12 h-14 rounded-2xl border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50" 
                    placeholder="Enter your full name"
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-bold ml-1">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={onChange} 
                    className="pl-12 h-14 rounded-2xl border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50" 
                    placeholder="name@example.com"
                    required 
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-700 font-bold ml-1">Phone Number</Label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="phone" 
                    value={formData.phone} 
                    onChange={onChange} 
                    className="pl-12 h-14 rounded-2xl border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50" 
                    placeholder="+880" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country" className="text-slate-700 font-bold ml-1">Country</Label>
                <div className="relative group">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="country" 
                    value={formData.country} 
                    onChange={onChange} 
                    className="pl-12 h-14 rounded-2xl border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50" 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-slate-700 font-bold ml-1">Delivery Address</Label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input 
                  id="address" 
                  value={formData.address} 
                  onChange={onChange} 
                  className="pl-12 h-14 rounded-2xl border-slate-200 focus:border-primary focus:ring-primary/20 bg-slate-50/50" 
                  placeholder="Street, City, Postcode"
                />
              </div>
            </div>

            <Button type="button" onClick={nextStep} className="w-full h-16 rounded-[1.25rem] font-bold text-lg group bg-slate-900 hover:bg-slate-800 text-white mt-4">
              Review Order <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-slate-50 rounded-3xl p-8 space-y-6 border border-slate-100">
              <h3 className="font-bold text-lg flex items-center gap-3 text-slate-900">
                <ShieldCheck className="w-6 h-6 text-primary" />
                Review Your Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
                <div>
                  <p className="text-slate-500 font-medium mb-1 uppercase tracking-wider text-[10px]">Full Name</p>
                  <p className="font-bold text-slate-900 text-base">{formData.name}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium mb-1 uppercase tracking-wider text-[10px]">Email Address</p>
                  <p className="font-bold text-slate-900 text-base">{formData.email}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium mb-1 uppercase tracking-wider text-[10px]">Phone Number</p>
                  <p className="font-bold text-slate-900 text-base">{formData.phone || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium mb-1 uppercase tracking-wider text-[10px]">Country</p>
                  <p className="font-bold text-slate-900 text-base">{formData.country}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-slate-500 font-medium mb-1 uppercase tracking-wider text-[10px]">Delivery Address</p>
                  <p className="font-bold text-slate-900 text-base">{formData.address || 'Not provided'}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full h-16 rounded-[1.25rem] font-bold text-lg shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-6 h-6 animate-spin" /> Processing...
                  </span>
                ) : (
                  "Place Secure Order"
                )}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                onClick={prevStep} 
                className="h-12 rounded-xl text-slate-500 font-semibold hover:bg-slate-50"
              >
                Edit My Details
              </Button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
}