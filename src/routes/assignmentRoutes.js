import assignmentController from '../controllers/assignmentController.js';
import { verifyJWT } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { Router } from 'express';

const router = Router();

router.post("/", verifyJWT, authorizeRoles("admin", "teacher"), assignmentController.createAssignmentController);
router.get("/", verifyJWT, assignmentController.getAllAssignmentsController);
router.get("/:id", verifyJWT, assignmentController.getAssignmentByIdController);
router.get("/bootcamp/:bootcampId", verifyJWT, assignmentController.getAssignmentsByBootcampController);
router.get("/domain/:domainId", verifyJWT, assignmentController.getAssignmentsByDomainController);
router.put("/:id", verifyJWT, authorizeRoles("admin", "teacher"), assignmentController.updateAssignmentController);
router.delete("/:id", verifyJWT, authorizeRoles("admin", "teacher"), assignmentController.deleteAssignmentController);

export default router;

