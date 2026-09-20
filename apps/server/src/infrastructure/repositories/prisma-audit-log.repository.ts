import { AuditLog, Prisma } from '@prisma/client';
import { prisma } from '../database/prisma';
import { IAuditLogRepository, AuditLogFilterOptions } from '../../domain/repositories/audit-log-repository.interface';

/**
 * Prisma implementation of IAuditLogRepository.
 * Manages immutable audit logs strictly compliant with Decree 13/2023/ND-CP.
 */
export class PrismaAuditLogRepository implements IAuditLogRepository {
    async create(data: Prisma.AuditLogCreateInput): Promise<AuditLog> {
        return prisma.auditLog.create({ data });
    }

    async findAll(options: AuditLogFilterOptions): Promise<{ items: AuditLog[]; total: number }> {
        const { userId, resource, resourceId, page = 1, limit = 50 } = options;

        const where: Prisma.AuditLogWhereInput = {};
        if (userId) where.userId = userId;
        if (resource) where.resource = resource;
        if (resourceId) where.resourceId = resourceId;

        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            prisma.auditLog.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: {
                        select: {
                            id: true,
                            fullName: true,
                            username: true,
                        },
                    },
                },
            }),
            prisma.auditLog.count({ where }),
        ]);

        return { items, total };
    }
}
