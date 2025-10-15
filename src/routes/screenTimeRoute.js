import { Router } from "express";
import validateMiddleware from "../middleware/validateMiddleware.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAllScreenTimeController, getScreenTimeByIdController, addScreenTimeController, updateScreenTimeController } from "../controllers/screenTimeController.js";
import { addScreenTimeSchema, updateScreenTimeSchema } from "../validations/screenTimeValidation.js";

const router = Router();

router.use(verifyToken);
router.get('/', getAllScreenTimeController);
router.get('/:screenTimeId', getScreenTimeByIdController);
router.post('/', validateMiddleware(addScreenTimeSchema), addScreenTimeController);
router.patch('/:screenTimeId', validateMiddleware(updateScreenTimeSchema), updateScreenTimeController);
export default router;