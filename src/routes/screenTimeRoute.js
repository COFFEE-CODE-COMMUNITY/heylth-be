import { Router } from "express";
import validateMiddleware from "../middleware/validateMiddleware.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getAllScreenTimeController,
  getScreenTimeByIdController,
  getAverageScreenTimeController,
  addScreenTimeController,
  updateScreenTimeController,
} from "../controllers/screenTimeController.js";
import {
  addScreenTimeSchema,
  updateScreenTimeSchema,
} from "../validations/screenTimeValidation.js";

const router = Router();

router.use(verifyToken);
router.get("/", getAllScreenTimeController);
router.get("/average", getAverageScreenTimeController);
router.get("/:screenTimeId", getScreenTimeByIdController);
router.post(
  "/",
  validateMiddleware(addScreenTimeSchema),
  addScreenTimeController
);
router.patch(
  "/:screenTimeId",
  validateMiddleware(updateScreenTimeSchema),
  updateScreenTimeController
);
export default router;
