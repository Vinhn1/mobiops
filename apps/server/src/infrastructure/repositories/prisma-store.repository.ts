import { Store } from '@prisma/client';
import { prisma } from '../database/prisma';
import { IStoreRepository } from '../../domain/repositories/store-repository.interface';

/**
 * Prisma implementation of IStoreRepository.
 * Fetches store branches across 9 districts of Ca Mau province.
 */
export class PrismaStoreRepository implements IStoreRepository {
    async findAll(): Promise<Store[]> {
        return prisma.store.findMany({
            orderBy: [{ isMain: 'desc' }, { name: 'asc' }],
        });
    }

    async findById(id: string): Promise<Store | null> {
        return prisma.store.findUnique({
            where: { id },
        });
    }

    async findByDistrict(districtId: string): Promise<Store[]> {
        return prisma.store.findMany({
            where: { districtId },
            orderBy: { name: 'asc' },
        });
    }
}
