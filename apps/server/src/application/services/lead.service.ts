import { Lead, LeadStatus } from '@prisma/client';
import { CreateLeadInput, canTransitionLead } from '@mobiops/shared';
import { ILeadRepository, LeadFilterOptions, PaginatedLeads } from '../../domain/repositories/lead-repository.interface';
import { IAuditLogRepository } from '../../domain/repositories/audit-log-repository.interface';
import { prisma } from '../../infrastructure/database/prisma';

/**
 * Service orchestrating Telecom Lead business logic.
 * Enforces State Machine rules, Customer linking, and PII Audit compliance.
 */
export class LeadService {
    constructor(
        private readonly leadRepository: ILeadRepository,
        private readonly auditLogRepository: IAuditLogRepository
    ) {}

    /**
     * Creates a new Lead originating from Mini App or Web Channels.
     */
    async createLead(
        input: CreateLeadInput,
        meta?: { ipAddress?: string; userAgent?: string; extraDetails?: Record<string, unknown> }
    ): Promise<Lead> {
        // 1. Generate unique human-readable lead code
        const datePrefix = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        const code = `LEAD-CM-${datePrefix}-${randomSuffix}`;

        // 2. Auto-find or create customer profile by phone
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

        // 3. Resolve nearest or district store if available
        const store = await prisma.store.findFirst({
            where: { districtId: input.districtId },
        });

        // 4. Create Lead record
        const lead = await this.leadRepository.create({
            code,
            customer: { connect: { id: customer.id } },
            customerName: input.customerName || customer.fullName,
            customerPhone: input.customerPhone,
            districtId: input.districtId,
            packageCode: input.packageCode,
            channel: 'MINI_APP',
            status: 'NEW',
            notes: input.notes,
            ...(store ? { store: { connect: { id: store.id } } } : {}),
            metadata: meta?.extraDetails as any,
        });

        // 5. Write Immutable Audit Log
        await this.auditLogRepository.create({
            action: 'LEAD_CREATED',
            resource: 'LEAD',
            resourceId: lead.id,
            details: {
                code: lead.code,
                packageCode: lead.packageCode,
                districtId: lead.districtId,
                channel: lead.channel,
            },
            ipAddress: meta?.ipAddress,
            userAgent: meta?.userAgent,
        });

        return lead;
    }

    /**
     * Lists leads with filtering, search, and pagination.
     */
    async getLeads(options: LeadFilterOptions): Promise<PaginatedLeads> {
        return this.leadRepository.findAll(options);
    }

    /**
     * Retrieves a single lead by ID with details.
     */
    async getLeadById(id: string): Promise<Lead | null> {
        return this.leadRepository.findById(id);
    }

    /**
     * Transitions lead to a new state enforcing the 5-step State Machine.
     */
    async transitionStatus(
        id: string,
        nextStatus: LeadStatus,
        userId: string,
        notes?: string,
        ipAddress?: string,
        userAgent?: string
    ): Promise<Lead> {
        const currentLead = await this.leadRepository.findById(id);
        if (!currentLead) {
            throw new Error(`Lead with ID ${id} not found.`);
        }

        // Enforce state transition machine
        const isValid = canTransitionLead(currentLead.status as any, nextStatus as any);
        if (!isValid) {
            throw new Error(
                `Invalid state transition: Cannot move lead from ${currentLead.status} to ${nextStatus}.`
            );
        }

        const updatedLead = await this.leadRepository.updateStatus(id, nextStatus, notes);

        // Audit log the transition
        await this.auditLogRepository.create({
            user: { connect: { id: userId } },
            action: 'LEAD_STATUS_CHANGED',
            resource: 'LEAD',
            resourceId: id,
            details: {
                previousStatus: currentLead.status,
                newStatus: nextStatus,
                notes,
            },
            ipAddress,
            userAgent,
        });

        return updatedLead;
    }

    /**
     * Assigns lead to a telesales representative.
     */
    async assignLead(
        id: string,
        staffId: string,
        actorUserId: string,
        ipAddress?: string,
        userAgent?: string
    ): Promise<Lead> {
        const staff = await prisma.user.findUnique({ where: { id: staffId } });
        if (!staff) {
            throw new Error(`Staff member with ID ${staffId} not found.`);
        }

        const updatedLead = await this.leadRepository.update(id, {
            assignedTo: { connect: { id: staffId } },
            status: 'ASSIGNED',
        });

        await this.auditLogRepository.create({
            user: { connect: { id: actorUserId } },
            action: 'LEAD_ASSIGNED',
            resource: 'LEAD',
            resourceId: id,
            details: {
                assignedToId: staffId,
                assignedToName: staff.fullName,
            },
            ipAddress,
            userAgent,
        });

        return updatedLead;
    }
}
