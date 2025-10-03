import { Router } from 'express';
import { userLogin, userRegister } from '../controllers/userController.js';
import validateMiddleware from '../middleware/validateMiddleware.js';
import { loginSchema, registerSchema } from '../validations/userValidation.js';

const router = Router();

router.post('/register', validateMiddleware(registerSchema), userRegister);
router.post('/login', validateMiddleware(loginSchema), userLogin);

export default router;
