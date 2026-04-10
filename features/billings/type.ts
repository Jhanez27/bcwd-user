export type MeterReading = {
    id: number;
    meter_id: number;
    billing_period: string;
    reading_from: Date;
    reading_to: Date;
    previous_reading: number;
    current_reading: number;
    usage: number;
    added_at: Date;
    added_by: number;
}

export type Billing = {
    id: number;
    reading_id: number;
    charges: number;
    due_date: Date;
    disconnection_date: Date;
    status: string;
    penalty: number;
}