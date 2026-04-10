import z from "zod";
import { signupSchema } from "./utils/signupSchema";

export type SignUpFormValues = z.infer<typeof signupSchema>;

export type Consumer = {
    id: number;
    account_number: string;
    first_name: string;
    middle_initial: string;
    last_name: string;
    address: string;
    municipal_zone: string;
    zone_number: string;
    classification_id: number;
    book_number: string;
    status: string;
    created_at: Date;
    code: string;
    consumer_uid: string;
}

export type ConsumerClassification = {
    id: number;
    name: string;
    description: string;
    created_at: Date;
}

export type Contact = {
    id: number;
    consumer_id: number;
    phone_number: string;
    type: string;
    added_at: Date;
}

export type Meter = {
    id: number;
    consumer_id: number;
    serial_number: string;
    brand: string;
    size: string;
    date_installed: Date;
    status: string;
}

export type MeterSize = {
    id: number;
    size_inch: string;
    created_at: Date;
}

