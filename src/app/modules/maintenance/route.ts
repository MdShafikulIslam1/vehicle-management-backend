import { RoleEnumType } from '@prisma/client'
import express from 'express'
import { maintenanceController } from './controller'
// import { authControllers } from './controller'

const router = express.Router()

router.post('/create',maintenanceController.createController)
router.get('/allMaintenance',maintenanceController.getAllController)
router.get('/singleMaintenance/:id',maintenanceController.singleController)
router.delete('/delete/:id',maintenanceController.deleteController)
router.patch('/update',maintenanceController.updateController)




export const MaintenanceRouter = router