import express from 'express';
import validateRequest from '../../middlewares/validateUser';
import { maintenanceController } from './controller';
import { maintenanceValidation } from './validation';
// import { authControllers } from './controller'

const router = express.Router();

router.post(
  '/create',
  validateRequest(maintenanceValidation.create),
  maintenanceController.createController
);
router.get('/allMaintenance', maintenanceController.getAllController);
router.get('/singleMaintenance/:id', maintenanceController.singleController);
router.delete('/delete/:id', maintenanceController.deleteController);
router.patch('/update/:id', maintenanceController.updateController);

export const MaintenanceRouter = router;
