import z from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  accountNumber: z.string().min(5, 'Account number is required'),
  meterBrand: z.string().min(1, 'Meter brand is required'),
  meterSize: z.string().min(1, 'Meter size is required'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});