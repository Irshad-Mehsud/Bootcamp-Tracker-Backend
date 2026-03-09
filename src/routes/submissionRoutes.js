import submissionController from '../controllers/submissionController.js';
import { verifyJWT } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { Router } from 'express';

const router = Router();

router.post("/", verifyJWT, submissionController.createSubmissionController);
router.get("/", verifyJWT, authorizeRoles("admin", "teacher"), submissionController.getAllSubmissionsController);
router.get("/:id", verifyJWT, submissionController.getSubmissionByIdController);
router.get("/assignment/:assignmentId", verifyJWT, submissionController.getSubmissionsByAssignmentController);
router.get("/user/:userId", verifyJWT, submissionController.getSubmissionsByUserController);
router.put("/:id", verifyJWT, submissionController.updateSubmissionController);
router.put("/grade/:id", verifyJWT, authorizeRoles("admin", "teacher"), submissionController.gradeSubmissionController);
router.delete("/:id", verifyJWT, authorizeRoles("admin", "teacher"), submissionController.deleteSubmissionController);

export default router;

