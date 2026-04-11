"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema, LoginFormValues } from "../utils/loginSchema";
import { loginConsumer } from "@/supabase/consumer";

export function useLogin() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await loginConsumer(data.username, data.password);
      toast.success("Login Successful");
      router.push("/dashboard");
    } catch {
      toast.error("Invalid Credentials");
    }
  };

  return { form, onSubmit };
}
