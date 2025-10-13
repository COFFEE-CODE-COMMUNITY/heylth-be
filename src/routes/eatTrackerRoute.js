import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAllEatTrackerController,  getEatTrackerByIdController, addEatTrackerController, updateEatTrackerController } from "../controllers/eatTrackerController.js";
const router = Router();

router.use(verifyToken);
router.get('/', getAllEatTrackerController);
router.get('/:eatId', getEatTrackerByIdController);
router.post('/', addEatTrackerController);
router.patch('/:eatId', updateEatTrackerController);

export default router;