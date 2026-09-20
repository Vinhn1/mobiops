import { Ticket, TicketCategory, TicketPriority, TicketStatus, Prisma } from '@prisma/client';

/**
 * Filter options for querying tickets with pagination.
 */
export interface TicketFilterOptions {
    status?: TicketStatus;
    category?: TicketCategory;
    priority?: TicketPriority;
    districtId?: string;
    customerPhone?: string;
    assignedToId?: string;
    storeId?: string;
    page?: number;
    limit?: number;
}

/**
 * Result structure for paginated ticket queries.
 */
export interface PaginatedTickets {
    items: Ticket[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

/**
 * Contract for Ticket persistence operations following Clean Architecture.
 */
export interface ITicketRepository {
    create(data: Prisma.TicketCreateInput): Promise<Ticket>;
    findById(id: string): Promise<Ticket | null>;
    findByCode(code: string): Promise<Ticket | null>;
    findAll(options: TicketFilterOptions): Promise<PaginatedTickets>;
    update(id: string, data: Prisma.TicketUpdateInput): Promise<Ticket>;
    updateStatus(id: string, status: TicketStatus, resolution?: string): Promise<Ticket>;
}
