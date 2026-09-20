import { Lead, LeadStatus, Prisma } from '@prisma/client';
import { prisma } from '../database/prisma';
import { ILeadRepository, LeadFilterOptions, PaginatedLeads } from '../../domain/repositories/lead-repository.interface';

/**
 * Prisma implementation of ILeadRepository.
 * Manages database persistence for Telecom Leads with pagination and status transitions.
 */
export class PrismaLeadRepository implements ILeadRepository {
    async create(data: Prisma.LeadCreateInput): Promise<Lead> {
        return prisma.lead.create({ data });
    }

    async findById(id: string): Promise<Lead | null> {
        return prisma.lead.findUnique({
            where: { id },
            include: {
                customer: true,
                assignedTo: {
                    select: {
                        id: true,
                        fullName: true,
                        role: true,
                    },
                },
                store: true,
            },
        });
    }

    async findByCode(code: string): Promise<Lead | null> {
        return prisma.lead.findUnique({
            where: { code },
            include: {
                customer: true,
                store: true,
            },
        });
    }

    async findAll(options: LeadFilterOptions): Promise<PaginatedLeads> {
        const {
            status,
            districtId,
            customerPhone,
            assignedToId,
            storeId,
            page = 1,
            limit = 20,
        } = options;

        const where: Prisma.LeadWhereInput = {};

        if (status) where.status = status;
        if (districtId) where.districtId = districtId;
        if (customerPhone) where.customerPhone = { contains: customerPhone };
        if (assignedToId) where.assignedToId = assignedToId;
        if (storeId) where.storeId = storeId;

        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            prisma.lead.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    assignedTo: {
                        select: {
                            id: true,
                            fullName: true,
                            role: true,
                        },
                    },
                    store: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            }),
            prisma.lead.count({ where }),
        ]);

        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async update(id: string, data: Prisma.LeadUpdateInput): Promise<Lead> {
        return prisma.lead.update({
            where: { id },
            data,
        });
    }

    async updateStatus(id: string, status: LeadStatus, notes?: string): Promise<Lead> {
        return prisma.lead.update({
            where: { id },
            data: {
                status,
                ...(notes ? { notes } : {}),
            },
        });
    }
}
