export type TicketStatus =
    | 'RECEIVED'
    | 'CLASSIFIED'
    | 'PROCESSING'
    | 'RESPONDED'
    | 'CONFIRMED'
    | 'RESOLVED'
    | 'REJECTED';

export type TicketCategory =
    | 'NETWORK_SIGNAL'
    | 'BILLING'
    | 'SIM_ESIM'
    | 'VAS_SERVICE'
    | 'OTHER';

export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface Ticket {
    id: string;
    ticketCode: string;
    customerPhone: string;
    customerName?: string;
    districtId: string;
    districtName: string;
    wardName?: string;
    category: TicketCategory;
    priority: TicketPriority;
    status: TicketStatus;
    title: string;
    description: string;
    resolutionNote?: string;
    assignedStaffId?: string;
    assignedStaffName?: string;
    createdAt: string;
    updatedAt: string;
    resolvedAt?: string;
}

export interface TicketFilterOptions {
    status?: TicketStatus;
    category?: TicketCategory;
    priority?: TicketPriority;
    districtId?: string;
    assignedStaffId?: string;
    startDate?: string;
    endDate?: string;
}
