import assert from 'assert';
import { prisma } from '../infrastructure/database/prisma';
import { PrismaLeadRepository } from '../infrastructure/repositories/prisma-lead.repository';
import { PrismaTicketRepository } from '../infrastructure/repositories/prisma-ticket.repository';
import { PrismaAuditLogRepository } from '../infrastructure/repositories/prisma-audit-log.repository';
import { LeadService } from '../application/services/lead.service';
import { TicketService } from '../application/services/ticket.service';

/**
 * Automated Integration Test Suite for MobiOps Core Backend.
 * Verifies PostgreSQL 16 persistence, State Machine transitions, and Audit Logging.
 */
async function runIntegrationTests(): Promise<void> {
    console.log('[Test] Starting MobiOps Backend Integration Tests...');

    const leadRepo = new PrismaLeadRepository();
    const ticketRepo = new PrismaTicketRepository();
    const auditRepo = new PrismaAuditLogRepository();

    const leadService = new LeadService(leadRepo, auditRepo);
    const ticketService = new TicketService(ticketRepo, auditRepo);

    // 1. Test Database Connectivity
    console.log('[Test 1] Testing PostgreSQL database connectivity...');
    const dbResult = await prisma.$queryRaw`SELECT 1 as connected`;
    assert(Array.isArray(dbResult) && dbResult.length > 0, 'Database should return connected rows');
    console.log(' -> PostgreSQL 16 connection verified.');

    // 2. Test Lead Lifecycle & State Machine
    console.log('[Test 2] Testing Lead creation and State Machine flow...');
    const testPhone = '0909998877';
    const newLead = await leadService.createLead(
        {
            customerPhone: testPhone,
            customerName: 'Nguyễn Kiểm Thử',
            packageCode: 'PT120',
            districtId: 'HUYEN_THOI_BINH',
            source: 'PACKAGE_DETAIL',
            notes: 'Integration test lead',
        },
        { ipAddress: '127.0.0.1', userAgent: 'IntegrationTestSuite' }
    );

    assert(newLead.id, 'Lead ID must be generated');
    assert(newLead.code.startsWith('LEAD-CM-'), 'Lead code must follow standard format');
    assert.strictEqual(newLead.status, 'NEW', 'Initial lead status must be NEW');
    console.log(` -> Created Lead: ${newLead.code}`);

    // Retrieve staff for assignment
    const adminUser = await prisma.user.findFirst({ where: { role: 'SUPER_ADMIN' } });
    assert(adminUser, 'Admin user must exist from seeder');

    // Transition NEW -> ASSIGNED
    const assignedLead = await leadService.transitionStatus(
        newLead.id,
        'ASSIGNED',
        adminUser.id,
        'Assigned to Thới Bình district rep'
    );
    assert.strictEqual(assignedLead.status, 'ASSIGNED', 'Status must transition to ASSIGNED');

    // Transition ASSIGNED -> CONTACTED
    const contactedLead = await leadService.transitionStatus(
        newLead.id,
        'CONTACTED',
        adminUser.id,
        'Customer answered phone call'
    );
    assert.strictEqual(contactedLead.status, 'CONTACTED', 'Status must transition to CONTACTED');

    // Test Invalid Transition: CONTACTED cannot jump directly to CONVERTED without QUALIFIED
    let threwError = false;
    try {
        await leadService.transitionStatus(newLead.id, 'CONVERTED', adminUser.id);
    } catch {
        threwError = true;
    }
    assert(threwError, 'Illegal state transition from CONTACTED to CONVERTED must be rejected');
    console.log(' -> State Machine illegal transition prevented correctly.');

    // 3. Test Ticket Lifecycle & Tracking
    console.log('[Test 3] Testing Support Ticket creation and tracking...');
    const newTicket = await ticketService.createTicket(
        {
            customerPhone: testPhone,
            customerName: 'Nguyễn Kiểm Thử',
            districtId: 'HUYEN_U_MINH',
            category: 'NETWORK_SIGNAL',
            priority: 'HIGH',
            title: 'Mất sóng tại rừng U Minh Hạ',
            description: 'Vùng đệm U Minh Hạ bị mất tín hiệu thoại từ sáng nay.',
        },
        { ipAddress: '127.0.0.1', userAgent: 'IntegrationTestSuite' }
    );

    assert(newTicket.code.startsWith('CM-HOTRO-'), 'Ticket code must have CM-HOTRO prefix');
    assert.strictEqual(newTicket.status, 'RECEIVED', 'Initial ticket status must be RECEIVED');

    // Track ticket by code
    const trackedTicket = await ticketService.getTicketByCode(newTicket.code);
    assert(trackedTicket, 'Ticket must be retrievable by tracking code');
    assert.strictEqual(trackedTicket.id, newTicket.id, 'Tracked ticket ID must match');
    console.log(` -> Ticket ${newTicket.code} tracked and verified.`);

    // 4. Test Audit Log Persistence
    console.log('[Test 4] Verifying AuditLog records...');
    const auditLogs = await auditRepo.findAll({ resource: 'LEAD', resourceId: newLead.id });
    assert(auditLogs.items.length >= 2, 'Must have at least 2 audit logs for lead creation & transition');
    console.log(` -> Verified ${auditLogs.items.length} immutable audit logs for test lead.`);

    console.log('[Test] All Integration Tests PASSED successfully.');
}

runIntegrationTests()
    .catch((err) => {
        console.error('[Test] Integration Tests FAILED:', err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
