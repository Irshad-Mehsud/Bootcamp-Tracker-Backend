
import { Router } from "express";
import userRoutes from "./routes/userRoutes.js";
import bootcampRoutes from "../src/routes/bootcampRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import domainRoutes from "./routes/domainRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";


const router = Router();
router.use("/users", userRoutes);
router.use("/bootcamps", bootcampRoutes);
router.use("/announcements", announcementRoutes);
router.use("/domains", domainRoutes);
router.use("/progress", progressRoutes);
router.use("/assignments", assignmentRoutes);
router.use("/submissions", submissionRoutes);



export default router;