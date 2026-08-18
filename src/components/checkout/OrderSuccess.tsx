import { CheckCircle2, Package, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

interface OrderSuccessProps {
  orderNumber: string;
  email: string;
}

export default function OrderSuccess({ orderNumber, email }: OrderSuccessProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-slate-100"
      >
        <div className="w-24 h-24 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-10 transform -rotate-6">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        
        <h1 className="text-4xl font-display font-bold mb-4 text-slate-900">Order Successful!</h1>
        <p className="text-slate-500 mb-8 text-lg leading-relaxed">
          Your order <strong className="text-slate-900">#{orderNumber}</strong> has been received. 
          A confirmation email has been sent to <strong className="text-slate-900">{email}</strong>.
        </p>

        <div className="space-y-4">
          <Button 
            asChild
            className="w-full h-16 rounded-[1.25rem] font-bold text-lg shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90"
          >
            <Link to="/dashboard">
              Go to Dashboard <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          
          <div className="flex gap-4">
            <Button 
              variant="outline"
              asChild
              className="flex-1 h-14 rounded-2xl font-bold border-slate-200 text-slate-600"
            >
              <Link to="/services">
                <Package className="w-5 h-5 mr-2" /> More Services
              </Link>
            </Button>
            <Button 
              variant="ghost"
              asChild
              className="flex-1 h-14 rounded-2xl font-bold text-slate-500"
            >
              <Link to="/">
                <Home className="w-5 h-5 mr-2" /> Back Home
              </Link>
            </Button>
          </div>
        </div>

        <p className="mt-12 text-xs text-slate-400 font-medium uppercase tracking-widest">
          Thank you for choosing TechCrafter IT
        </p>
      </motion.div>
    </div>
  );
}