import { Router } from "express";
import { lineChartController } from "../controllers/dashboardController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.use(verifyToken);
router.get('/lineChart', lineChartController);

export default router;
