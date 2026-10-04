import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, LogIn, ShieldCheck, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "@tanstack/react-router";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string(),
});

const AdminAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: "info@InfraGlobalTech.com",
    password: "",
  });

  const { user, signIn, isAdmin, resetPassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAdmin) {
      navigate({ to: '/admin' });
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const result = loginSchema.safeParse(formData);
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((issue: any) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as string] = issue.message;
          }
        });
        setErrors(fieldErrors);
        setIsLoading(false);
        return;
      }

      // Trim stray spaces from copy-paste, which otherwise cause "Invalid login credentials"
      const { error } = await signIn(formData.email.trim().toLowerCase(), formData.password.trim());
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Welcome, Admin");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setErrors({ email: "Please enter your email address first" });
      return;
    }
    
    setIsResetting(true);
    try {
      const { error } = await resetPassword(formData.email);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Password reset email sent!");
      }
    } catch (error) {
      toast.error("Failed to send reset email.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10 animate-slide-up">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to website
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6 border border-primary/20">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Administrator Portal</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">InfraTech</h1>
          <p className="text-slate-400">Restricted Access Area</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Admin Email
              </label>
              <Input
                type="email"
                placeholder="info@InfraGlobalTech.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-slate-950 border-slate-800 text-white h-12 focus:ring-primary focus:border-primary"
              />
              {errors['email'] && <p className="text-xs text-red-400 mt-1">{errors['email']}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Password
                </label>
                <button 
                  type="button" 
                  onClick={handleForgotPassword}
                  className="text-xs text-primary hover:underline font-medium"
                  disabled={isResetting}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-slate-950 border-slate-800 text-white h-12 pr-10 focus:ring-primary focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors['password'] && <p className="text-xs text-red-400 mt-1">{errors['password']}</p>}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl gap-2 transition-all shadow-lg shadow-primary/20"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Authenticate
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;