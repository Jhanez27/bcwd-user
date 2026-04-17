"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "../hooks/useLogin";
import { Logo } from "@/components/logo";

export function Login() {
  const { form, onSubmit } = useLogin();

  return (
    <div className="grid lg:grid-cols-2 min-h-screen relative">
      {/* Left side */}

      <div
        className="hidden lg:flex  overflow-hidden items-center justify-center"
        style={{
          backgroundImage: "url('/droplet-bg-compressed.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Logo */}
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

      {/* Right side - Login form */}
      <div className="bg-background p-8 flex flex-col justify-center">
        <div className="max-w-sm mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Login Account
            </h1>
          </div>

          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email
              </label>
              <Input
                type="text"
                placeholder="Enter your Email"
                className="h-10"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your Password"
                className="h-10"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-10"
            >
              {form.formState.isSubmitting
                ? "Logging in..."
                : "Login as Customer"}
            </Button>
          </form>

          <div className="text-center">
            <span className="text-sm text-muted-foreground">No Account? </span>
            <Link
              href="/signup"
              className="text-sm text-primary hover:underline font-medium"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
