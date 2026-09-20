import { Router } from 'express';
import leadRoutes from './lead.routes';
import ticketRoutes from './ticket.routes';
import catalogRoutes from './catalog.routes';
import { HealthController } from '../controllers/health.controller';

const router = Router();

// Liveness & Readiness probe
router.get('/health', HealthController.check);

// Business API modules
router.use('/leads', leadRoutes);
router.use('/tickets', ticketRoutes);
router.use('/catalog', catalogRoutes);

export default router;
