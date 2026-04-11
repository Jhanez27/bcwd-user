export const TicketCategory = {
    METER_ISSUE: 'Meter Issue',
    BILLING_ISSUE: 'Billing Issue',
    LEAKAGE: 'Leakage',
    WATER_QUALITY: 'Water Quality',
    OTHER: 'Other',
} as const;

export const TicketStatus = {
    OPEN: 'Open',
    IN_PROGRESS: 'In Progress',
    RESOLVED: 'Resolved',
    CLOSED: 'Closed',
} as const;

export const TicketPriority = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    URGENT: 'Urgent',
} as const;
    