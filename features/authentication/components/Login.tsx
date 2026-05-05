"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "../hooks/useLogin";
import { Logo } from "@/components/logo";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function Login() {
  const { form, onSubmit, onResetPass, resetCooldown } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleResetPassword = () => {
    if (!form.getValues("email")) {
      toast.error("Please enter your email address");
      return;
    }
    onResetPass(form.getValues("email"));
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-screen">
      {/* LEFT SIDE */}
      <div
        className="hidden lg:flex relative overflow-hidden items-center justify-center"
        style={{
          backgroundImage: "url('/droplet-bg-compressed.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Logo */}
        <div className="absolute left-0 top-0 m-6 z-20">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            Water Services
          </h1>
          <p className="text-lg opacity-90 max-w-md mx-auto">
            Manage your water billing, consumption, and services all in one
            place.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* CARD */}
          <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl border p-8 space-y-6 transition-all duration-300 hover:shadow-2xl">
            {/* Header */}
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-sm text-muted-foreground">
                Login to your account to continue
              </p>
            </div>

            {/* FORM */}
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="text"
                  placeholder="Enter your email"
                  className="h-11 rounded-lg focus:ring-2 focus:ring-primary/40"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-11 rounded-lg pr-10 focus:ring-2 focus:ring-primary/40"
                    {...form.register("password")}
                  />

                  {/* Toggle Password */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {form.formState.errors.password && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Button
                  onClick={handleResetPassword}
                  variant="link"
                  type="button"
                  disabled={resetCooldown > 0}
                  className="text-xs text-muted-foreground px-0">
                  {resetCooldown > 0
                    ? `Resend in ${resetCooldown}s`
                    : "Forgot Password?"}
                </Button>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full h-11 text-base font-semibold rounded-lg shadow-md transition-all duration-200 hover:scale-[1.02]">
                {form.formState.isSubmitting
                  ? "Logging in..."
                  : "Login as Customer"}
              </Button>
            </form>

            {/* Footer */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Don’t have an account?{" "}
              </span>
              <Link
                href="/signup"
                className="text-primary font-medium hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
