import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAllEatTrackerController,  getEatTrackerByIdController, addEatTrackerController, updateEatTrackerController } from "../controllers/eatTrackerController.js";
import { addEatTrackerSchema } from "../validations/eatTrackerValidation.js";
import validateMiddleware from "../middleware/validateMiddleware.js";

const router = Router();

router.use(verifyToken);
router.get('/', getAllEatTrackerController);
router.get('/:eatId', getEatTrackerByIdController);
router.post('/', validateMiddleware(addEatTrackerSchema), addEatTrackerController);
router.patch('/:eatId', updateEatTrackerController);

export default router;