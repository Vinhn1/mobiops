import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import apiRouter from './presentation/routes';
import { errorHandler } from './presentation/middlewares/error.middleware';
import { prisma } from './infrastructure/database/prisma';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

// Security Middlewares
app.use(helmet());

// CORS configuration
const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim())
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (such as mobile apps or curl)
            if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
                callback(null, true);
            } else {
                callback(new Error(`CORS policy does not allow access from ${origin}`));
            }
        },
        credentials: true,
    })
);

// Body Parsers & Logging
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Mount Version 1 RESTful API
app.use('/api/v1', apiRouter);

// Root welcome & status
app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
        service: 'MobiOps Ca Mau Backend API',
        version: '1.0.0',
        status: 'RUNNING',
        endpoints: {
            health: '/api/v1/health',
            leads: '/api/v1/leads',
            tickets: '/api/v1/tickets',
            catalog: '/api/v1/catalog',
        },
        timestamp: new Date().toISOString(),
    });
});

// 404 Fallback
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        error: {
            code: 'NOT_FOUND',
            message: `Tài nguyên ${req.method} ${req.originalUrl} không tồn tại trên hệ thống.`,
        },
        timestamp: new Date().toISOString(),
    });
});

// Global Error Handler
app.use(errorHandler);

// Start HTTP Server
const server = app.listen(PORT, () => {
    console.log(`[MobiOps Server] Listening on http://localhost:${PORT}`);
    console.log(`[MobiOps Server] Health check available at http://localhost:${PORT}/api/v1/health`);
});

// Graceful Shutdown
const shutdown = async (signal: string) => {
    console.log(`[MobiOps Server] Received ${signal}. Gracefully shutting down...`);
    server.close(async () => {
        await prisma.$disconnect();
        console.log('[MobiOps Server] Closed HTTP server and database connections.');
        process.exit(0);
    });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

export default app;
