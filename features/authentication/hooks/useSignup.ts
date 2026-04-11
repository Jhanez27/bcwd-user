"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";
import { signupSchema } from "../utils/signupSchema";
import { createConsumerAccount, verifyAccountDetails } from "@/supabase/consumer";
import { getMeterSizes } from "@/supabase/meter";
import { Consumer, MeterSize } from "../types";

export type SignupFormValues = z.infer<typeof signupSchema>;

export function useSignup() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [consumer, setConsumer] = useState<Consumer | null>(null);
  const [meterSizes, setMeterSizes] = useState<MeterSize[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMeterSizes = async () => {
      try {
        const sizes = await getMeterSizes();
        setMeterSizes(sizes);
      } catch {
        toast.error("Failed to fetch meter sizes");
      }
    };
    fetchMeterSizes();
  }, []);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      accountNumber: "",
      meterBrand: "",
      meterSize: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      await createConsumerAccount(data.username, data.password, consumer!.id);
      setIsSuccess(true);
    } catch {
      toast.error("Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = async () => {
    try {
      const verified = await verifyAccountDetails(form.getValues());
      setConsumer(verified);
      setStep(2);
      toast.success("Account details verified");
    } catch {
      toast.error("Invalid account details");
    }
  };

  const prevStep = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(form.getValues());
  };

  return {
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
  };
}
