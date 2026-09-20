import { Router } from 'express';
import { CreateTicketSchema } from '@mobiops/shared';
import { TicketController } from '../controllers/ticket.controller';
import { TicketService } from '../../application/services/ticket.service';
import { PrismaTicketRepository } from '../../infrastructure/repositories/prisma-ticket.repository';
import { PrismaAuditLogRepository } from '../../infrastructure/repositories/prisma-audit-log.repository';
import { validateBody } from '../middlewares/validation.middleware';

const router = Router();

// Instantiate dependencies
const ticketRepository = new PrismaTicketRepository();
const auditLogRepository = new PrismaAuditLogRepository();
const ticketService = new TicketService(ticketRepository, auditLogRepository);
const ticketController = new TicketController(ticketService);

// Routes
router.post('/', validateBody(CreateTicketSchema), ticketController.create);
router.get('/', ticketController.list);
router.get('/track/:code', ticketController.trackByCode);
router.get('/:id', ticketController.getById);
router.patch('/:id/status', ticketController.transitionStatus);
router.post('/:id/assign', ticketController.assign);

export default router;
