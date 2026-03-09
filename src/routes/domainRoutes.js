import domainController from '../controllers/domainController.js';
import { verifyJWT } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { Router } from 'express';

const router = Router();

router.post("/", verifyJWT, authorizeRoles("admin"), domainController.createDomainController);
router.get("/", verifyJWT, domainController.getAllDomainsController);
router.get("/:id", verifyJWT, domainController.getDomainByIdController);
router.get("/bootcamp/:bootcampId", verifyJWT, domainController.getDomainsByBootcampController);
router.put("/:id", verifyJWT, authorizeRoles("admin"), domainController.updateDomainController);
router.delete("/:id", verifyJWT, authorizeRoles("admin"), domainController.deleteDomainController);

export default router;

