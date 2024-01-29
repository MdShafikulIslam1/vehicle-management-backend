import { RoleEnumType } from '@prisma/client'
import express from 'express'
import { vehicleController } from './controller'
// import { authControllers } from './controller'

const router = express.Router()

router.post('/vehicle-profile',vehicleController.createVehicleController)
router.get('/vehicle-profile',vehicleController.getAllVehicleController)
router.delete('/vehicle-profile',vehicleController.deleteVehicleController)
router.patch('/vehicle-profile',vehicleController.updateVehicleController)




export const AuthRouter = router