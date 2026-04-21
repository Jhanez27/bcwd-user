"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { Loader2, KeyRound, ShieldCheck, AlertTriangle } from "lucide-react";
import { useResetPassword } from "../hooks/useResetPassword";

export function ResetPassword() {
  const { form, onSubmit, status } = useResetPassword();

  return (
    <div className="grid lg:grid-cols-2 min-h-screen relative">
      {/* Left panel — same as Login */}
      <div
        className="hidden lg:flex overflow-hidden items-center justify-center"
        style={{
          backgroundImage: "url('/droplet-bg-compressed.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hidden lg:flex absolute left-0 top-0 m-4 z-20">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="relative z-10 text-center text-white animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl font-bold mb-4">Water</h1>
          <p className="text-xl opacity-80">Your essential resource</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="bg-background p-8 flex flex-col justify-center">
        <div className="max-w-sm mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

          {/* ── Verifying state ─────────────────────────────────────── */}
          {status === "verifying" && (
            <div className="flex flex-col items-center gap-4 py-12">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Verifying your reset link…
              </p>
            </div>
          )}

          {/* ── Invalid / expired link ───────────────────────────────── */}
          {status === "invalid" && (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <div className="rounded-full bg-destructive/10 p-4">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Link Expired
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  This password reset link is invalid or has expired.
                  <br />
                  Please request a new one from the login page.
                </p>
              </div>
              <Link href="/login">
                <Button className="mt-2 w-full">Back to Login</Button>
              </Link>
            </div>
          )}

          {/* ── Ready — show the form ────────────────────────────────── */}
          {status === "ready" && (
            <>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-2">
                    <KeyRound className="h-5 w-5 text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold text-foreground">
                    New Password
                  </h1>
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter a strong new password for your account.
                </p>
              </div>

              <form
                className="space-y-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {/* New password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    New Password
                  </label>
                  <Input
                    id="reset-password"
                    type="password"
                    placeholder="At least 8 characters"
                    className="h-10"
                    {...form.register("password")}
                  />
                  {form.formState.errors.password && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Confirm Password
                  </label>
                  <Input
                    id="reset-confirm-password"
                    type="password"
                    placeholder="Repeat your new password"
                    className="h-10"
                    {...form.register("confirmPassword")}
                  />
                  {form.formState.errors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Password rules hint */}
                <ul className="text-xs text-muted-foreground space-y-1 pl-1">
                  <li className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                    Minimum 8 characters
                  </li>
                  <li className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                    At least one uppercase letter
                  </li>
                  <li className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                    At least one number
                  </li>
                </ul>

                <Button
                  id="reset-password-submit"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full h-10"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating…
                    </>
                  ) : (
                    "Set New Password"
                  )}
                </Button>
              </form>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
