import { Billing } from "../billings/type";

export interface Payment {
    id: number;
    bill_id: number;
    or_number: string;
    reference_number: string;
    paid_at: Date;
    payment_origin: string;
}

export type BillPayment = Payment & {
    billing: Billing;
}