import { Store } from '@prisma/client';

/**
 * Contract for Store network queries.
 */
export interface IStoreRepository {
    findAll(): Promise<Store[]>;
    findById(id: string): Promise<Store | null>;
    findByDistrict(districtId: string): Promise<Store[]>;
}
