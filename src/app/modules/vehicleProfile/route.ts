import { RoleEnumType } from '@prisma/client'
import express from 'express'
import { vehicleController } from './controller'
import validateRequest from '../../middlewares/validateUser';
import { vehicleProfileValidation } from './validation';
import Auth from '../../middlewares/Auth';
// import { authControllers } from './controller'

const router = express.Router()

router.post('/',validateRequest(vehicleProfileValidation.createVehicleProfile),vehicleController.createVehicleController )
router.get('/',vehicleController.getAllVehicleController)
router.get('/:id',vehicleController.getSingleVehicleController)
router.delete('/:id',vehicleController.deleteVehicleController)
router.patch('/:id',vehicleController.updateVehicleController)

export const vehicleProfileRouter = router
