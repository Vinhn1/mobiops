import { Ticket, TicketStatus } from '@prisma/client';
import { CreateTicketInput, canTransitionTicket } from '@mobiops/shared';
import { ITicketRepository, TicketFilterOptions, PaginatedTickets } from '../../domain/repositories/ticket-repository.interface';
import { IAuditLogRepository } from '../../domain/repositories/audit-log-repository.interface';
import { prisma } from '../../infrastructure/database/prisma';

/**
 * Service orchestrating Customer Support & Network Signal Tickets.
 * Enforces 6-step State Machine, BTS tagging, and SLA resolution tracking.
 */
export class TicketService {
    constructor(
        private readonly ticketRepository: ITicketRepository,
        private readonly auditLogRepository: IAuditLogRepository
    ) {}

    /**
     * Creates a new Support Ticket originating from Mini App.
     */
    async createTicket(
        input: CreateTicketInput,
        meta?: { ipAddress?: string; userAgent?: string; extraDetails?: Record<string, unknown> }
    ): Promise<Ticket> {
        // 1. Generate unique human-readable ticket tracking code
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        const code = `CM-HOTRO-${randomNum}`;

        // 2. Auto-find or create customer profile
        let customer = await prisma.customer.findUnique({
            where: { phone: input.customerPhone },
        });

        if (!customer) {
            customer = await prisma.customer.create({
                data: {
                    phone: input.customerPhone,
                    fullName: input.customerName || 'Khách hàng Mini App',
                    districtId: input.districtId,
                },
            });
        }

        // 3. Resolve nearest or district store
        const store = await prisma.store.findFirst({
            where: { districtId: input.districtId },
        });

        // 4. Create Ticket record
        const ticket = await this.ticketRepository.create({
            code,
            customer: { connect: { id: customer.id } },
            customerName: input.customerName || customer.fullName,
            customerPhone: input.customerPhone,
            districtId: input.districtId,
            category: input.category,
            priority: input.priority || 'MEDIUM',
            title: input.title,
            description: input.description,
            status: 'RECEIVED',
            ...(store ? { store: { connect: { id: store.id } } } : {}),
            metadata: meta?.extraDetails as any,
        });

        // 5. Audit log ticket submission
        await this.auditLogRepository.create({
            action: 'TICKET_CREATED',
            resource: 'TICKET',
            resourceId: ticket.id,
            details: {
                code: ticket.code,
                category: ticket.category,
                priority: ticket.priority,
                districtId: ticket.districtId,
            },
            ipAddress: meta?.ipAddress,
            userAgent: meta?.userAgent,
        });

        return ticket;
    }

    /**
     * Lists tickets with filtering, search, and pagination.
     */
    async getTickets(options: TicketFilterOptions): Promise<PaginatedTickets> {
        return this.ticketRepository.findAll(options);
    }

    /**
     * Retrieves a single ticket by internal ID.
     */
    async getTicketById(id: string): Promise<Ticket | null> {
        return this.ticketRepository.findById(id);
    }

    /**
     * Retrieves a ticket by public tracking code (e.g. CM-HOTRO-93821).
     */
    async getTicketByCode(code: string): Promise<Ticket | null> {
        return this.ticketRepository.findByCode(code);
    }

    /**
     * Transitions ticket status adhering to 6-step state machine.
     */
    async transitionStatus(
        id: string,
        nextStatus: TicketStatus,
        userId: string,
        resolution?: string,
        ipAddress?: string,
        userAgent?: string
    ): Promise<Ticket> {
        const currentTicket = await this.ticketRepository.findById(id);
        if (!currentTicket) {
            throw new Error(`Ticket with ID ${id} not found.`);
        }

        const isValid = canTransitionTicket(currentTicket.status as any, nextStatus as any);
        if (!isValid) {
            throw new Error(
                `Invalid state transition: Cannot move ticket from ${currentTicket.status} to ${nextStatus}.`
            );
        }

        const updatedTicket = await this.ticketRepository.updateStatus(id, nextStatus, resolution);

        await this.auditLogRepository.create({
            user: { connect: { id: userId } },
            action: 'TICKET_STATUS_CHANGED',
            resource: 'TICKET',
            resourceId: id,
            details: {
                previousStatus: currentTicket.status,
                newStatus: nextStatus,
                resolution,
            },
            ipAddress,
            userAgent,
        });

        return updatedTicket;
    }

    /**
     * Assigns ticket to field technician or support staff.
     */
    async assignTicket(
        id: string,
        staffId: string,
        actorUserId: string,
        ipAddress?: string,
        userAgent?: string
    ): Promise<Ticket> {
        const staff = await prisma.user.findUnique({ where: { id: staffId } });
        if (!staff) {
            throw new Error(`Staff member with ID ${staffId} not found.`);
        }

        const updatedTicket = await this.ticketRepository.update(id, {
            assignedTo: { connect: { id: staffId } },
            status: 'CLASSIFIED',
        });

        await this.auditLogRepository.create({
            user: { connect: { id: actorUserId } },
            action: 'TICKET_ASSIGNED',
            resource: 'TICKET',
            resourceId: id,
            details: {
                assignedToId: staffId,
                assignedToName: staff.fullName,
            },
            ipAddress,
            userAgent,
        });

        return updatedTicket;
    }
}
