import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { 
    getAllSleepTrackerController, 
    getSleepTrackerByIdController, 
    getAverageSleepController,
    addSleepTrackerController,
    updateSleepTrackerByIdController,
} from "../controllers/sleepTrackerController.js";
import { addSleepTrackerSchema, updateSleepTrackerSchema } from "../validations/sleepTrackerValidation.js";
import validateMiddleware from "../middleware/validateMiddleware.js";

const router = Router();

router.use(verifyToken);
router.get('/user', getAllSleepTrackerController);
router.get('/:sleepId/user', getSleepTrackerByIdController);
router.get('/average', getAverageSleepController);
router.post('/', validateMiddleware(addSleepTrackerSchema), addSleepTrackerController);
router.patch('/:sleepId', validateMiddleware(updateSleepTrackerSchema), updateSleepTrackerByIdController);

export default router;