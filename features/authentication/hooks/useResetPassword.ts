"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { updatePassword } from "@/supabase/user";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function useResetPassword() {
  const router = useRouter();
  const supabase = createClient();

  // "verifying" = exchanging the token from the URL
  // "ready"     = session confirmed, show the form
  // "invalid"   = token missing or expired
  const [status, setStatus] = useState<"verifying" | "ready" | "invalid">(
    "verifying"
  );

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  // Supabase sends the recovery token via URL hash fragment.
  // onAuthStateChange fires with event "PASSWORD_RECOVERY" once the
  // PKCE code exchange completes (handled automatically by the JS client).
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setStatus("ready");
      }
    });

    // Fallback: if the user already has an active session from the link
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setStatus("ready");
    });

    // If nothing fires within 4 s the link is likely expired / invalid
    const timer = setTimeout(() => {
      setStatus((prev) => (prev === "verifying" ? "invalid" : prev));
    }, 4000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [supabase]);

  const onSubmit = async (values: ResetPasswordFormValues) => {
    try {
      await updatePassword(values.password);
      toast.success("Password updated successfully! Please log in.");
      router.push("/login");
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to update password. Please try again.");
    }
  };

  return { form, onSubmit, status };
}
