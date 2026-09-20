import { Router } from 'express';
import { CreateLeadSchema } from '@mobiops/shared';
import { LeadController } from '../controllers/lead.controller';
import { LeadService } from '../../application/services/lead.service';
import { PrismaLeadRepository } from '../../infrastructure/repositories/prisma-lead.repository';
import { PrismaAuditLogRepository } from '../../infrastructure/repositories/prisma-audit-log.repository';
import { validateBody } from '../middlewares/validation.middleware';

const router = Router();

// Instantiate dependencies
const leadRepository = new PrismaLeadRepository();
const auditLogRepository = new PrismaAuditLogRepository();
const leadService = new LeadService(leadRepository, auditLogRepository);
const leadController = new LeadController(leadService);

// Routes
router.post('/', validateBody(CreateLeadSchema), leadController.create);
router.get('/', leadController.list);
router.get('/:id', leadController.getById);
router.patch('/:id/status', leadController.transitionStatus);
router.post('/:id/assign', leadController.assign);

export default router;
