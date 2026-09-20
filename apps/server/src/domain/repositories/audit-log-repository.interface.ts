import { AuditLog, Prisma } from '@prisma/client';

/**
 * Filter options for audit log queries.
 */
export interface AuditLogFilterOptions {
    userId?: string;
    resource?: string;
    resourceId?: string;
    page?: number;
    limit?: number;
}

/**
 * Contract for immutable audit log persistence.
 */
export interface IAuditLogRepository {
    create(data: Prisma.AuditLogCreateInput): Promise<AuditLog>;
    findAll(options: AuditLogFilterOptions): Promise<{ items: AuditLog[]; total: number }>;
}
