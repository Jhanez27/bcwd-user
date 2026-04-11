import { z } from "zod";

export const profileSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    phone: z.string().min(1, "Phone number is required"),
    username: z.string().min(1, "Username is required"),
    address: z.string().min(1, "Address is required"),
    municipal_zone: z.string().min(1, "Municipal Zone is required"),
    zone_number: z.string().min(1, "Zone Number is required"),
});