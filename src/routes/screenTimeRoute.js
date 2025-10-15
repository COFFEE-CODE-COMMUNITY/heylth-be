import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAllScreenTimeController } from "../controllers/screenTimeController.js";

const router = Router();

router.use(verifyToken);
router.get('/', getAllScreenTimeController);

export default router;