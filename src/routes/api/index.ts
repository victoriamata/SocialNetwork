import { Router } from "express";
const router = Router();
import videoRoutes from "./thoughtRoutes.js";
import userRoutes from "./userRoutes.js";

router.use("/thoughts", videoRoutes);
router.use("/users", userRoutes);

export default router; // Export thoughtRoutes and userRoutes to main app
