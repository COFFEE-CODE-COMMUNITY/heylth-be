import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAllEatTrackerController, addEatTrackerController, getEatTrackerByIdController } from "../controllers/eatTrackerController.js";
const router = Router();

router.use(verifyToken);
router.get('/user', getAllEatTrackerController);
router.get('/:eatId', getEatTrackerByIdController);
router.post('/', addEatTrackerController);

export default router;