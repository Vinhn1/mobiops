import { Request, Response, NextFunction } from 'express';

/**
 * Global error handling middleware.
 * Returns consistent enterprise ApiResponse envelope and shields internal stack traces.
 */
export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    _next: NextFunction
): void {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Đã xảy ra lỗi nội bộ hệ thống.';

    console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);

    res.status(statusCode).json({
        success: false,
        error: {
            code: err.code || 'INTERNAL_SERVER_ERROR',
            message,
            ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
        },
        timestamp: new Date().toISOString(),
    });
}
