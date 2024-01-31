import express from 'express';
import { DriverController } from './driver.controller';

const router = express.Router();

router.get('/', DriverController.getAllFromDB);

router.get('/:id', DriverController.getByIdFromDB);

router.post('/create-driver', DriverController.insertIntoDB);

router.patch('/:id', DriverController.updateIntoDB);

router.delete('/:id', DriverController.deleteFromDB);

export const DriverRoutes = router;
