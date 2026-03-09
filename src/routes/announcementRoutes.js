import announcementController from '../controllers/announcementController.js';
import { verifyJWT } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { Router } from 'express';

const router = Router();

router.post("/", verifyJWT, authorizeRoles("admin", "teacher"), announcementController.createAnnouncementController);
router.get("/", verifyJWT, announcementController.getAllAnnouncementsController);
router.get("/:id", verifyJWT, announcementController.getAnnouncementByIdController);
router.get("/bootcamp/:bootcampId", verifyJWT, announcementController.getAnnouncementsByBootcampController);
router.get("/domain/:domainId", verifyJWT, announcementController.getAnnouncementsByDomainController);
router.put("/:id", verifyJWT, authorizeRoles("admin", "teacher"), announcementController.updateAnnouncementController);
router.delete("/:id", verifyJWT, authorizeRoles("admin", "teacher"), announcementController.deleteAnnouncementController);

export default router;

