import express from 'express';
import validateRequest from '../../middlewares/validateUser';
import { authControllers } from './controller';
import { userValidation } from './validation';

const router = express.Router();

router.post('/signIn', authControllers.loginController);
router.post(
  '/register',
  validateRequest(userValidation.register),
  authControllers.registerController
);
router.get('/allUser',authControllers.allUserControler)

export const AuthRouter = router;
