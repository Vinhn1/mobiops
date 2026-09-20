import { Router } from 'express';
import { CatalogController } from '../controllers/catalog.controller';
import { CatalogService } from '../../application/services/catalog.service';
import { PrismaStoreRepository } from '../../infrastructure/repositories/prisma-store.repository';

const router = Router();

const storeRepository = new PrismaStoreRepository();
const catalogService = new CatalogService(storeRepository);
const catalogController = new CatalogController(catalogService);

router.get('/packages', catalogController.getPackages);
router.get('/packages/:code', catalogController.getPackageByCode);
router.get('/administrative-units', catalogController.getAdministrativeUnits);
router.get('/stores', catalogController.getStores);

export default router;
