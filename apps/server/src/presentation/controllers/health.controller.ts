import { Request, Response } from 'express';
import { prisma } from '../../infrastructure/database/prisma';

/**
 * Health check controller for container readiness and liveness probes.
 */
export class HealthController {
    static async check(_req: Request, res: Response): Promise<void> {
        try {
            // Verify PostgreSQL connection via raw query
            await prisma.$queryRaw`SELECT 1`;

            res.status(200).json({
                success: true,
                data: {
                    status: 'UP',
                    service: 'mobiops-server',
                    database: 'PostgreSQL 16 (Connected)',
                    timestamp: new Date().toISOString(),
                    uptime: process.uptime(),
                },
            });
        } catch (error: any) {
            res.status(503).json({
                success: false,
                data: {
                    status: 'DOWN',
                    service: 'mobiops-server',
                    database: 'PostgreSQL Disconnected',
                    error: error.message,
                    timestamp: new Date().toISOString(),
                },
            });
        }
    }
}
