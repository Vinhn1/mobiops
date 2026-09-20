import { Request, Response, NextFunction } from 'express';
import { CatalogService } from '../../application/services/catalog.service';

/**
 * Controller serving static/master catalog data for packages, stores, and districts.
 */
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}

    /**
     * GET /api/v1/catalog/packages
     */
    getPackages = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const { category } = req.query;
            const packages = this.catalogService.getPackages(category as string);

            res.status(200).json({
                success: true,
                data: packages,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * GET /api/v1/catalog/packages/:code
     */
    getPackageByCode = (req: Request, res: Response, next: NextFunction): void => {
        try {
            const { code } = req.params;
            const pkg = this.catalogService.getPackageByCode(code);

            if (!pkg) {
                res.status(404).json({
                    success: false,
                    error: {
                        code: 'NOT_FOUND',
                        message: `Không tìm thấy gói cước ${code}.`,
                    },
                    timestamp: new Date().toISOString(),
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: pkg,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * GET /api/v1/catalog/administrative-units
     */
    getAdministrativeUnits = (_req: Request, res: Response, next: NextFunction): void => {
        try {
            const units = this.catalogService.getAdministrativeUnits();
            res.status(200).json({
                success: true,
                data: units,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    };

    /**
     * GET /api/v1/catalog/stores
     */
    getStores = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { districtId } = req.query;
            const stores = await this.catalogService.getStores(districtId as string);

            res.status(200).json({
                success: true,
                data: stores,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            next(error);
        }
    };
}
