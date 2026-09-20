import { Ticket, TicketStatus, Prisma } from '@prisma/client';
import { prisma } from '../database/prisma';
import { ITicketRepository, TicketFilterOptions, PaginatedTickets } from '../../domain/repositories/ticket-repository.interface';

/**
 * Prisma implementation of ITicketRepository.
 * Manages database persistence for Customer Support Tickets with pagination and status transitions.
 */
export class PrismaTicketRepository implements ITicketRepository {
    async create(data: Prisma.TicketCreateInput): Promise<Ticket> {
        return prisma.ticket.create({ data });
    }

    async findById(id: string): Promise<Ticket | null> {
        return prisma.ticket.findUnique({
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

    async findByCode(code: string): Promise<Ticket | null> {
        return prisma.ticket.findUnique({
            where: { code },
            include: {
                customer: true,
                store: true,
            },
        });
    }

    async findAll(options: TicketFilterOptions): Promise<PaginatedTickets> {
        const {
            status,
            category,
            priority,
            districtId,
            customerPhone,
            assignedToId,
            storeId,
            page = 1,
            limit = 20,
        } = options;

        const where: Prisma.TicketWhereInput = {};

        if (status) where.status = status;
        if (category) where.category = category;
        if (priority) where.priority = priority;
        if (districtId) where.districtId = districtId;
        if (customerPhone) where.customerPhone = { contains: customerPhone };
        if (assignedToId) where.assignedToId = assignedToId;
        if (storeId) where.storeId = storeId;

        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            prisma.ticket.findMany({
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
            prisma.ticket.count({ where }),
        ]);

        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async update(id: string, data: Prisma.TicketUpdateInput): Promise<Ticket> {
        return prisma.ticket.update({
            where: { id },
            data,
        });
    }

    async updateStatus(id: string, status: TicketStatus, resolution?: string): Promise<Ticket> {
        return prisma.ticket.update({
            where: { id },
            data: {
                status,
                ...(resolution ? { resolution } : {}),
            },
        });
    }
}
