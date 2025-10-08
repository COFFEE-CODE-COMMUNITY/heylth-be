import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAllSleepTrackerController, getSleepTrackerByIdController, addSleepTrackerController } from "../controllers/sleepTrackerController.js";

const router = Router();

router.use(verifyToken);
router.get('/user', getAllSleepTrackerController);
router.get('/:sleepId/user', getSleepTrackerByIdController);
router.post('/', addSleepTrackerController);

export default router;