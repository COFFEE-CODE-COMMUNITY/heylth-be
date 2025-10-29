import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAllJournalController, addJournalController } from "../controllers/journalController.js";
import validateMiddleware from "../middleware/validateMiddleware.js";
import { addJournalSchema } from "../validations/journalTrackerValidation.js";

const router = Router();

router.use(verifyToken);
router.get('/', getAllJournalController);
router.post('/',validateMiddleware(addJournalSchema), addJournalController);
export default router;