import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAllSleepTrackerController } from "../controllers/sleepTrackerController.js";

const router = Router();

router.use(verifyToken);
router.get('/user', getAllSleepTrackerController);

export default router;