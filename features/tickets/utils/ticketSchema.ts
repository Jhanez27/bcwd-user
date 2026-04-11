import { z } from "zod";
import { TicketCategory, TicketPriority } from "../const";

export const ticketSchema = z.object({
    subject: z.string().min(1, "Subject is required"),
    category: z.nativeEnum(TicketCategory),
    priority: z.nativeEnum(TicketPriority),
    description: z.string().min(1, "Description is required"),
    contact_email: z.string().email("Invalid email address"),
});

export type TicketFormValues = z.infer<typeof ticketSchema>;