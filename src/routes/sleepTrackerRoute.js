import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { addSleepTrackerController, getAllSleepTrackerController } from "../controllers/sleepTrackerController.js";

const router = Router();

router.use(verifyToken);
router.get('/user', getAllSleepTrackerController);
router.post('/add', addSleepTrackerController);

export default router;