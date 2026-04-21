import type { Metadata } from "next";
import { ResetPassword } from "@/features/authentication/components/ResetPassword";

export const metadata: Metadata = {
  title: "Reset Password — BCWD Billing System",
  description: "Set a new password for your BCWD account.",
};

export default function ResetPasswordPage() {
  return <ResetPassword />;
}
