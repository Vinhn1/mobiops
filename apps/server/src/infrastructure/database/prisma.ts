import { PrismaClient } from '@prisma/client';

/**
 * Singleton instance of PrismaClient for database connection management.
 * In development, attaches client to global object to prevent connection leaks during hot reloads.
 */
declare global {
    // eslint-disable-next-line no-var
    var prismaGlobal: PrismaClient | undefined;
}

export const prisma =
    globalThis.prismaGlobal ??
    new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    });

if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = prisma;
}
