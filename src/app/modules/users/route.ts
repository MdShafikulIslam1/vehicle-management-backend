import { RoleEnumType } from '@prisma/client'
import express from 'express'
import { authControllers } from './controller'

const router = express.Router()


router.post('/signIn', authControllers.loginController)
router.post('/register',authControllers.registerController)



export const AuthRouter = router