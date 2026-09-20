import { Request, Response, NextFunction } from 'express';
import { LeadService } from '../../application/services/lead.service';

/**
 * Controller handling HTTP requests for Lead CRM operations.
 */
export class LeadController {
    constructor(private readonly leadService: LeadService) {}

    /**
     * POST /api/v1/leads
     * Submits a new lead from Mini App consultation form.
     */
    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const ipAddress = req.ip || (req.headers['x-forwarded-for'] as string) || '127.0.0.1';
            const userAgent = req.headers['user-agent'] || 'Unknown';

            const lead = await this.leadService.createLead(req.body, {
                ipAddress,
                userAgent,
                extraDetails: {
                    userAgent,
                    referrer: req.headers.referer,
                },
            });

            res.status(201).json({
                success: true,
                data: lead,
                message: 'Đăng ký tư vấn gói cước thành công. MobiFone sẽ liên hệ sớm nhất.',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * GET /api/v1/leads
     * Lists leads with filters and pagination.
     */
    list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { status, districtId, customerPhone, assignedToId, storeId, page, limit } =
                req.query;

            const result = await this.leadService.getLeads({
                status: status as any,
                districtId: districtId as string,
                customerPhone: customerPhone as string,
                assignedToId: assignedToId as string,
                storeId: storeId as string,
                page: page ? parseInt(page as string, 10) : 1,
                limit: limit ? parseInt(limit as string, 10) : 20,
            });

            res.status(200).json({
                success: true,
                data: result.items,
                pagination: {
                    total: result.total,
                    page: result.page,
                    limit: result.limit,
                    totalPages: result.totalPages,
                },
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * GET /api/v1/leads/:id
     * Retrieves a single lead by ID.
     */
    getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const lead = await this.leadService.getLeadById(id);

            if (!lead) {
                res.status(404).json({
                    success: false,
                    error: {
                        code: 'NOT_FOUND',
                        message: `Không tìm thấy lead với mã ${id}.`,
                    },
                    timestamp: new Date().toISOString(),
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: lead,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * PATCH /api/v1/leads/:id/status
     * Changes lead state according to state machine.
     */
    transitionStatus = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { id } = req.params;
            const { nextStatus, notes, userId = 'system' } = req.body;

            const ipAddress = req.ip || (req.headers['x-forwarded-for'] as string);
            const userAgent = req.headers['user-agent'];

            const updatedLead = await this.leadService.transitionStatus(
                id,
                nextStatus,
                userId,
                notes,
                ipAddress,
                userAgent
            );

            res.status(200).json({
                success: true,
                data: updatedLead,
                message: `Chuyển trạng thái lead sang ${nextStatus} thành công.`,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * POST /api/v1/leads/:id/assign
     * Assigns lead to a staff member.
     */
    assign = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const { staffId, userId = 'system' } = req.body;

            const ipAddress = req.ip || (req.headers['x-forwarded-for'] as string);
            const userAgent = req.headers['user-agent'];

            const updatedLead = await this.leadService.assignLead(
                id,
                staffId,
                userId,
                ipAddress,
                userAgent
            );

            res.status(200).json({
                success: true,
                data: updatedLead,
                message: 'Phân bổ lead thành công.',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    };
}
