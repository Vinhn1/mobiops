import { Store } from '@prisma/client';
import {
    TELECOM_PACKAGES,
    CAMAU_ADMINISTRATIVE_UNITS,
    TelecomPackage,
    DistrictUnit,
} from '@mobiops/shared';
import { IStoreRepository } from '../../domain/repositories/store-repository.interface';

/**
 * Service providing master catalog data: packages, stores, and Ca Mau administrative units.
 */
export class CatalogService {
    constructor(private readonly storeRepository: IStoreRepository) {}

    /**
     * Retrieves telecom packages with optional category filter.
     */
    getPackages(category?: string): TelecomPackage[] {
        if (!category || category === 'ALL') {
            return TELECOM_PACKAGES;
        }
        return TELECOM_PACKAGES.filter((pkg: TelecomPackage) => pkg.category === category);
    }

    /**
     * Retrieves specific telecom package by code (e.g. KC135).
     */
    getPackageByCode(code: string): TelecomPackage | undefined {
        return TELECOM_PACKAGES.find(
            (pkg: TelecomPackage) => pkg.code.toUpperCase() === code.trim().toUpperCase()
        );
    }

    /**
     * Retrieves official 9 districts and wards of Ca Mau province.
     */
    getAdministrativeUnits(): DistrictUnit[] {
        return CAMAU_ADMINISTRATIVE_UNITS;
    }

    /**
     * Retrieves official store network across Ca Mau.
     */
    async getStores(districtId?: string): Promise<Store[]> {
        if (districtId) {
            return this.storeRepository.findByDistrict(districtId);
        }
        return this.storeRepository.findAll();
    }
}
