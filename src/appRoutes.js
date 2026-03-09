
import { Router } from "express";
import userRoutes from "./routes/userRoutes.js";
import bootcampRoutes from "../src/routes/bootcampRoutes.js";  
// import domainRoutes from "./routes/domains.routes.js"; 
// import dailyUpdateRoutes from "./routes/dailystandups.routes.js";  
// import assignmentRoutes from "./routes/assignment.routes.js"; 


const router = Router();
router.use("/users", userRoutes);
router.use("/bootcamps", bootcampRoutes);
// router.use("/domains", domainRoutes);
// router.use("/daily-updates", dailyUpdateRoutes);
// router.use("/assignments", assignmentRoutes);



export default router;