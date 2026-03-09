
import userController from '../controllers/userController.js';
import { verifyJWT } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { Router } from 'express';


const router = Router();

router.post("/register", userController.registerUserController);
router.post("/login", userController.loginUserController);
router.put("/update/:id", userController.updateUserController);
router.get("/profile", userController.getUserProfileController);
router.get("/all-users", userController.getAllUsersController);

export default router;