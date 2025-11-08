import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getReminderController } from '../controllers/reminderController.js';

const router = Router();

router.use(verifyToken);
router.get('/', getReminderController);

export default router;