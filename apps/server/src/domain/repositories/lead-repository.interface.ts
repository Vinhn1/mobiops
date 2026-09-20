import { Lead, LeadStatus, Prisma } from '@prisma/client';

/**
 * Filter options for querying leads with pagination.
 */
export interface LeadFilterOptions {
    status?: LeadStatus;
    districtId?: string;
    customerPhone?: string;
    assignedToId?: string;
    storeId?: string;
    page?: number;
    limit?: number;
}

/**
 * Result structure for paginated lead queries.
 */
export interface PaginatedLeads {
    items: Lead[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

/**
 * Contract for Lead persistence operations following Clean Architecture.
 */
export interface ILeadRepository {
    create(data: Prisma.LeadCreateInput): Promise<Lead>;
    findById(id: string): Promise<Lead | null>;
    findByCode(code: string): Promise<Lead | null>;
    findAll(options: LeadFilterOptions): Promise<PaginatedLeads>;
    update(id: string, data: Prisma.LeadUpdateInput): Promise<Lead>;
    updateStatus(id: string, status: LeadStatus, notes?: string): Promise<Lead>;
}
