import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAllEatTrackerController } from "../controllers/eatTrackerController.js";
const router = Router();

router.use(verifyToken);
router.get('/user', getAllEatTrackerController);

export default router;