import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getLifestyleStatusController } from "../controllers/lifestyleController.js";

const router = Router();

router.use(verifyToken);
router.get('/status', getLifestyleStatusController);

export default router;