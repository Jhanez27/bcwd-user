export interface Ticket {
    id: number;
    subject: string;
    category: string;
    priority: string;
    description: string;
    contact_email: string;
    consumer_id: number;
    ticket_status: string;
    created_at: Date;
}
