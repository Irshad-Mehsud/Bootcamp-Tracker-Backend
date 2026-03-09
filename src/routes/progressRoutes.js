import progressController from '../controllers/progressController.js';
import { verifyJWT } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { Router } from 'express';

const router = Router();

router.post("/", verifyJWT, progressController.createProgressController);
router.get("/", verifyJWT, authorizeRoles("admin", "teacher"), progressController.getAllProgressController);
router.get("/:id", verifyJWT, progressController.getProgressByIdController);
router.get("/user/:userId", verifyJWT, progressController.getProgressByUserController);
router.get("/bootcamp/:bootcampId", verifyJWT, authorizeRoles("admin", "teacher"), progressController.getProgressByBootcampController);
router.get("/date/:date", verifyJWT, authorizeRoles("admin", "teacher"), progressController.getProgressByDateController);
router.put("/:id", verifyJWT, progressController.updateProgressController);
router.delete("/:id", verifyJWT, authorizeRoles("admin", "teacher"), progressController.deleteProgressController);

export default router;

