
import bootcampController from '../controllers/bootcampController.js';
import { Router } from 'express';
import { verifyJWT } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';


const router = Router();


router.post("/create-bootcamp",verifyJWT, authorizeRoles("admin"), bootcampController.createBootcampController);
router.get("/get-bootcamps", bootcampController.getBootcampsController);
router.get("/get-bootcamp/:id", bootcampController.getSingleBootcampController);
router.put("/update-bootcamp/:id",verifyJWT,authorizeRoles("admin"), bootcampController.updateBootcampController);
router.delete("/delete-bootcamp/:id",verifyJWT,authorizeRoles("admin"), bootcampController.deleteBootcampController);
export default router;