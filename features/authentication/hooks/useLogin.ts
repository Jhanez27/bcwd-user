"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema, LoginFormValues } from "../utils/loginSchema";
import { loginConsumer } from "@/supabase/consumer";
import { resetPassword } from "@/supabase/user";

const COOLDOWN_SECONDS = 60;

export function useLogin() {
  const router = useRouter();
  const [resetCooldown, setResetCooldown] = useState(0);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await loginConsumer(data.email, data.password);
      toast.success("Login Successful");
      router.push("/dashboard");
    } catch {
      toast.error("Invalid Credentials");
    }
  };

  const startCooldown = () => {
    setResetCooldown(COOLDOWN_SECONDS);
    cooldownRef.current = setInterval(() => {
      setResetCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const onResetPass = async (email: string) => {
    try {
      await resetPassword(email);
      toast.success("Password reset email sent. Check your inbox.");
      startCooldown();
    } catch (err: any) {
      // Supabase returns status 429 for rate-limited reset requests
      if (err?.status === 429 || err?.message?.toLowerCase().includes("rate")) {
        toast.error("Too many requests. Please wait a minute before trying again.");
      } else {
        toast.error("Failed to send password reset email. Please try again.");
      }
    }
  };

  return { form, onSubmit, onResetPass, resetCooldown };
}
