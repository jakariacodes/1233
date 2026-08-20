import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, LogIn, UserPlus, ArrowRight, Sparkles, ShieldCheck, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link, useSearch } from "@tanstack/react-router";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Auth = () => {
  const search = useSearch({ from: '/auth' }) as any;
  const isRecovery = search.type === 'recovery';
  
  const [isLogin, setIsLogin] = useState(!isRecovery);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { user, signIn, signUp, isAdmin, resetPassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (isAdmin) {
        navigate({ to: '/admin' });
      } else {
        navigate({ to: '/dashboard' });
      }
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      if (isLogin) {
        const result = loginSchema.safeParse(formData);
        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.issues.forEach((issue: any) => {
            if (issue.path[0]) fieldErrors[issue.path[0] as string] = issue.message;
          });
          setErrors(fieldErrors);
          setIsLoading(false);
          return;
        }

        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Welcome back!");
        }
      } else {
        const result = signupSchema.safeParse(formData);
        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.issues.forEach((issue: any) => {
            if (issue.path[0]) fieldErrors[issue.path[0] as string] = issue.message;
          });
          setErrors(fieldErrors);
          setIsLoading(false);
          return;
        }

        const { error } = await signUp(formData.email, formData.password, formData.fullName);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Account created! Please check your email to verify.");
          setIsLogin(true);
        }
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
    <>

      <div className="min-h-screen bg-background">

        <main className="pt-24 pb-20">
          <section className="py-20 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-8 animate-slide-up">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-sm font-medium">{isLogin ? "Secure Access Portal" : "Join NextOnline LLC"}</span>
                  </div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                    {isLogin ? "Welcome Back" : "Create Account"}
                  </h1>
                  <p className="text-slate-600">
                    {isLogin ? "Please sign in to access your account" : "Sign up to start your journey with us"}
                  </p>
                </div>

                {/* Form Card */}
                <div className="glass-card rounded-3xl p-8 animate-slide-up animation-delay-200 border border-white/20 shadow-xl bg-white/40 backdrop-blur-xl">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" /> Full Name
                        </label>
                        <Input
                          type="text"
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={`bg-white/60 border-slate-200 h-12 focus:ring-primary focus:border-primary ${errors['fullName'] ? 'border-red-500' : ''}`}
                        />
                        {errors['fullName'] && <p className="text-xs text-red-500 mt-1">{errors['fullName']}</p>}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" /> Email Address
                      </label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`bg-white/60 border-slate-200 h-12 focus:ring-primary focus:border-primary ${errors['email'] ? 'border-red-500' : ''}`}
                      />
                      {errors['email'] && <p className="text-xs text-red-500 mt-1">{errors['email']}</p>}
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                          <Lock className="w-4 h-4 text-primary" /> Password
                        </label>
                        {isLogin && (
                          <button 
                            type="button" 
                            onClick={handleForgotPassword}
                            className="text-xs text-primary hover:underline font-medium"
                            disabled={isResetting}
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className={`bg-white/60 border-slate-200 h-12 pr-10 focus:ring-primary focus:border-primary ${errors['password'] ? 'border-red-500' : ''}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors['password'] && <p className="text-xs text-red-500 mt-1">{errors['password']}</p>}
                    </div>

                    {!isLogin && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-primary" /> Confirm Password
                        </label>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className={`bg-white/60 border-slate-200 h-12 focus:ring-primary focus:border-primary ${errors['confirmPassword'] ? 'border-red-500' : ''}`}
                        />
                        {errors['confirmPassword'] && <p className="text-xs text-red-500 mt-1">{errors['confirmPassword']}</p>}
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full gap-2 h-12 font-bold shadow-lg shadow-primary/20 mt-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                          {isLogin ? "Secure Login" : "Create Account"}
                        </>
                      )}
                    </Button>
                    
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200"></span></div>
                      <div className="relative flex justify-center text-xs uppercase"><span className="bg-white/40 px-2 text-slate-500">or</span></div>
                    </div>

                    <p className="text-center text-sm text-slate-600">
                      {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setIsLogin(!isLogin);
                          setErrors({});
                        }}
                        className="text-primary font-bold hover:underline"
                      >
                        {isLogin ? "Register Now" : "Login instead"}
                      </button>
                    </p>
                  </form>
                </div>

                {/* Terms */}
                <p className="text-center text-xs text-slate-500 mt-8 animate-slide-up animation-delay-300">
                  By continuing, you agree to our{" "}
                  <Link to="/terms" className="text-primary font-medium hover:underline">Terms & Conditions</Link>
                  {" "}and{" "}
                  <Link to="/privacy" className="text-primary font-medium hover:underline">Privacy Policy</Link>
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Auth;