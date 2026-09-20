import { Request, Response, NextFunction } from 'express';
import { TicketService } from '../../application/services/ticket.service';

/**
 * Controller handling HTTP requests for Customer Support Tickets.
 */
export class TicketController {
    constructor(private readonly ticketService: TicketService) {}

    /**
     * POST /api/v1/tickets
     * Submits a new support/complaint ticket from Mini App.
     */
    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const ipAddress = req.ip || (req.headers['x-forwarded-for'] as string) || '127.0.0.1';
            const userAgent = req.headers['user-agent'] || 'Unknown';

            const ticket = await this.ticketService.createTicket(req.body, {
                ipAddress,
                userAgent,
                extraDetails: {
                    userAgent,
                    referrer: req.headers.referer,
                },
            });

            res.status(201).json({
                success: true,
                data: ticket,
                message: 'Gửi yêu cầu hỗ trợ thành công. Mã theo dõi: ' + ticket.code,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * GET /api/v1/tickets
     * Lists tickets with filters and pagination.
     */
    list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {
                status,
                category,
                priority,
                districtId,
                customerPhone,
                assignedToId,
                storeId,
                page,
                limit,
            } = req.query;

            const result = await this.ticketService.getTickets({
                status: status as any,
                category: category as any,
                priority: priority as any,
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
     * GET /api/v1/tickets/:id
     * Retrieves a single ticket by internal ID.
     */
    getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const ticket = await this.ticketService.getTicketById(id);

            if (!ticket) {
                res.status(404).json({
                    success: false,
                    error: {
                        code: 'NOT_FOUND',
                        message: `Không tìm thấy phiếu hỗ trợ với mã ${id}.`,
                    },
                    timestamp: new Date().toISOString(),
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: ticket,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * GET /api/v1/tickets/track/:code
     * Public ticket tracking endpoint by code (e.g. CM-HOTRO-93821).
     */
    trackByCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { code } = req.params;
            const ticket = await this.ticketService.getTicketByCode(code);

            if (!ticket) {
                res.status(404).json({
                    success: false,
                    error: {
                        code: 'NOT_FOUND',
                        message: `Không tìm thấy phiếu hỗ trợ với mã ${code}.`,
                    },
                    timestamp: new Date().toISOString(),
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: ticket,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * PATCH /api/v1/tickets/:id/status
     * Transitions ticket state according to state machine.
     */
    transitionStatus = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { id } = req.params;
            const { nextStatus, resolution, userId = 'system' } = req.body;

            const ipAddress = req.ip || (req.headers['x-forwarded-for'] as string);
            const userAgent = req.headers['user-agent'];

            const updatedTicket = await this.ticketService.transitionStatus(
                id,
                nextStatus,
                userId,
                resolution,
                ipAddress,
                userAgent
            );

            res.status(200).json({
                success: true,
                data: updatedTicket,
                message: `Chuyển trạng thái phiếu sang ${nextStatus} thành công.`,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * POST /api/v1/tickets/:id/assign
     * Assigns ticket to a field technician or support staff.
     */
    assign = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const { staffId, userId = 'system' } = req.body;

            const ipAddress = req.ip || (req.headers['x-forwarded-for'] as string);
            const userAgent = req.headers['user-agent'];

            const updatedTicket = await this.ticketService.assignTicket(
                id,
                staffId,
                userId,
                ipAddress,
                userAgent
            );

            res.status(200).json({
                success: true,
                data: updatedTicket,
                message: 'Phân bổ phiếu hỗ trợ thành công.',
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    };
}
