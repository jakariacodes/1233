import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, KeyRound, LoaderCircle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

const passwordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setHasSession(Boolean(data.session));
      setCheckingSession(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setHasSession(Boolean(session));
      setCheckingSession(false);
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = passwordSchema.safeParse({ password, confirmPassword });

    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string") nextErrors[field] = issue.message;
      });
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSubmitting(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Password saved. Your admin account is ready.");
    navigate({ to: "/admin", replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-foreground px-4 py-24 text-background">
      <section className="w-full max-w-md rounded-lg border border-background/15 bg-foreground p-6 shadow-2xl sm:p-8">
        <div className="mb-8 text-center">
          <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <p className="text-xs font-bold uppercase text-primary">InfraTech Administrator</p>
          <h1 className="mt-2 text-3xl font-bold text-background">Set your password</h1>
          <p className="mt-2 text-sm text-background/65">Choose a secure password for your Admin Panel account.</p>
        </div>

        {checkingSession ? (
          <div className="flex min-h-44 items-center justify-center" aria-live="polite">
            <LoaderCircle className="h-7 w-7 animate-spin text-primary" />
          </div>
        ) : hasSession ? (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="new-password" className="mb-2 block text-sm font-semibold text-background/80">New password</label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-12 border-background/20 bg-background/10 pr-11 text-background placeholder:text-background/40"
                  placeholder="At least 8 characters"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-1 top-1 h-10 w-10 text-background/60 hover:bg-background/10 hover:text-background"
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirm-password" className="mb-2 block text-sm font-semibold text-background/80">Confirm password</label>
              <Input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="h-12 border-background/20 bg-background/10 text-background placeholder:text-background/40"
                placeholder="Enter it again"
              />
              {errors.confirmPassword && <p className="mt-1 text-xs text-destructive">{errors.confirmPassword}</p>}
            </div>

            <Button type="submit" className="h-12 w-full" disabled={submitting}>
              {submitting ? <LoaderCircle className="animate-spin" /> : <KeyRound />}
              {submitting ? "Saving…" : "Save password"}
            </Button>
          </form>
        ) : (
          <div className="rounded-lg border border-background/15 bg-background/5 p-5 text-center">
            <p className="text-sm text-background/75">This password link is invalid or has expired.</p>
            <Button asChild variant="secondary" className="mt-5 w-full">
              <Link to="/admin-login">Request a new link</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default SetPassword;