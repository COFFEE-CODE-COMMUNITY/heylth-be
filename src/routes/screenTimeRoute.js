import { Router } from "express";
import validateMiddleware from "../middleware/validateMiddleware.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAllScreenTimeController, addScreenTimeController} from "../controllers/screenTimeController.js";
import { addScreenTimeSchema } from "../validations/screenTimeValidation.js";

const router = Router();

router.use(verifyToken);
router.get('/', getAllScreenTimeController);
router.post('/', validateMiddleware(addScreenTimeSchema), addScreenTimeController);
export default router;