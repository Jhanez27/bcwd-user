"use client";
import Link from "next/link";
import { Check, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useSignup } from "../hooks/useSignup";
import { Logo } from "@/components/logo";

export function Signup() {
  const {
    form,
    step,
    isLoading,
    isSuccess,
    consumer,
    meterSizes,
    nextStep,
    prevStep,
    handleSubmit,
    router,
  } = useSignup();

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full border-none shadow-2xl bg-card/50 backdrop-blur-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 animate-in zoom-in duration-500">
              <Check className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Account Created!
            </CardTitle>
            <CardDescription>
              Your account for the BCWD Billing System has been successfully set
              up.
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-6">
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12"
              onClick={() => router.push("/login")}
            >
              Back to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

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
        <div className="hidden lg:flex absolute left-0 top-0 m-4">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Hero Text Slideshow */}
        <div className="relative z-10 text-center text-white max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <style>{`
            /* Text Sliding Animation (Stays 8 seconds resting, 2 seconds sliding) */
            @keyframes slide-hero {
              0%, 20% { transform: translateX(0%); }
              25%, 45% { transform: translateX(-20%); }
              50%, 70% { transform: translateX(-40%); }
              75%, 95% { transform: translateX(-60%); }
              100% { transform: translateX(-80%); }
            }

            /* Indicator 1: Snaps off halfway through the slide (22.5%) */
            @keyframes dot-1 {
              0%, 22.4% { background-color: #ffffff; }
              22.5%, 97.4% { background-color: rgba(255, 255, 255, 0.2); }
              97.5%, 100% { background-color: #ffffff; }
            }

            /* Indicator 2: Snaps on at 22.5%, off at 47.5% */
            @keyframes dot-2 {
              0%, 22.4% { background-color: rgba(255, 255, 255, 0.2); }
              22.5%, 47.4% { background-color: #ffffff; }
              47.5%, 100% { background-color: rgba(255, 255, 255, 0.2); }
            }

            /* Indicator 3: Snaps on at 47.5%, off at 72.5% */
            @keyframes dot-3 {
              0%, 47.4% { background-color: rgba(255, 255, 255, 0.2); }
              47.5%, 72.4% { background-color: #ffffff; }
              72.5%, 100% { background-color: rgba(255, 255, 255, 0.2); }
            }

            /* Indicator 4: Snaps on at 72.5%, off at 97.5% */
            @keyframes dot-4 {
              0%, 72.4% { background-color: rgba(255, 255, 255, 0.2); }
              72.5%, 97.4% { background-color: #ffffff; }
              97.5%, 100% { background-color: rgba(255, 255, 255, 0.2); }
            }
          `}</style>

          {/* Outer Mask */}
          <div className="w-full overflow-hidden">
            {/* Sliding Track - 40s total */}
            <div className="flex w-[500%] animate-[slide-hero_40s_cubic-bezier(0.83,0,0.17,1)_infinite]">
              <div className="w-1/5 shrink-0 px-2">
                <h1 className="text-6xl font-black mb-6 tracking-tight">
                  Pure &amp; Simple
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  Join thousands of residents in Baybay City managing their
                  water bills with ease and transparency.
                </p>
              </div>

              <div className="w-1/5 shrink-0 px-2">
                <h1 className="text-6xl font-black mb-6 tracking-tight">
                  Smart Tracking
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  Monitor your daily water consumption and get real-time alerts
                  to prevent unexpected leaks.
                </p>
              </div>

              <div className="w-1/5 shrink-0 px-2">
                <h1 className="text-6xl font-black mb-6 tracking-tight">
                  Instant Payments
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  Settle your monthly dues securely from your device without
                  ever waiting in long lines again.
                </p>
              </div>

              <div className="w-1/5 shrink-0 px-2">
                <h1 className="text-6xl font-black mb-6 tracking-tight">
                  Eco-Friendly
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  Switch to paperless billing and join our green initiative to
                  help conserve our local resources.
                </p>
              </div>

              {/* Clone */}
              <div className="w-1/5 shrink-0 px-2" aria-hidden="true">
                <h1 className="text-6xl font-black mb-6 tracking-tight">
                  Pure &amp; Simple
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  Join thousands of residents in Baybay City managing their
                  water bills with ease and transparency.
                </p>
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="mt-12 flex justify-center gap-4">
            <div className="h-1 w-12 rounded-full bg-white/20 animate-[dot-1_40s_linear_infinite]" />
            <div className="h-1 w-12 rounded-full bg-white/20 animate-[dot-2_40s_linear_infinite]" />
            <div className="h-1 w-12 rounded-full bg-white/20 animate-[dot-3_40s_linear_infinite]" />
            <div className="h-1 w-12 rounded-full bg-white/20 animate-[dot-4_40s_linear_infinite]" />
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="bg-background p-6 lg:p-12 flex flex-col justify-center overflow-auto">
        <div className="max-w-md mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-foreground tracking-tight">
              {step === 1 ? "Create Account" : "Confirm Details"}
            </h1>
            <p className="text-muted-foreground">
              {step === 1
                ? "Fill in your details to get started with the billing system."
                : "Please verify that your information is correct."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      {...form.register("firstName")}
                      className="h-11 bg-muted/50 border-none px-4"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      {...form.register("lastName")}
                      className="h-11 bg-muted/50 border-none px-4"
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Enter Account Number"
                    {...form.register("accountNumber")}
                    className="h-11 bg-muted/50 border-none px-4"
                  />
                  {form.formState.errors.accountNumber && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.accountNumber.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="meterBrand">Meter Brand</Label>
                    <Input
                      id="meterBrand"
                      placeholder="Enter Meter Brand"
                      {...form.register("meterBrand")}
                      className="h-11 bg-muted/50 border-none px-4"
                    />
                    {form.formState.errors.meterBrand && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.meterBrand.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meterSize">Meter Size</Label>
                    <Select
                      onValueChange={(v) => form.setValue("meterSize", v)}
                    >
                      <SelectTrigger className="h-11 bg-muted/50 border-none px-4">
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                      <SelectContent>
                        {meterSizes.map((ms) => (
                          <SelectItem key={ms.id} value={ms.size_inch}>
                            {ms.size_inch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.meterSize && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.meterSize.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-border mt-4">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Choose a username"
                    {...form.register("username")}
                    className="h-11 bg-muted/50 border-none px-4"
                  />
                  {form.formState.errors.username && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.username.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    {...form.register("email")}
                    className="h-11 bg-muted/50 border-none px-4"
                  />
                  {form.formState.errors.email && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    {...form.register("password")}
                    className="h-11 bg-muted/50 border-none px-4"
                  />
                  {form.formState.errors.password && (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl mt-6"
                >
                  Continue to Confirmation
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-muted/30 rounded-2xl p-6 space-y-4 border border-border/50 backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Full Name</p>
                      <p className="font-bold">
                        {consumer?.first_name} {consumer?.last_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Account Number</p>
                      <p className="font-bold">{consumer?.account_number}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Meter Details</p>
                      <p className="font-bold capitalize">
                        {form.getValues("meterBrand")} -{" "}
                        {form.getValues("meterSize")}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Username</p>
                      <p className="font-bold">{form.getValues("username")}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1 h-12 rounded-xl"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-[2] bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Confirm & Sign Up"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </form>

          <div className="text-center pt-4">
            <span className="text-sm text-muted-foreground">
              Already have an account?{" "}
            </span>
            <Link
              href="/login"
              className="text-sm text-primary hover:underline font-bold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
