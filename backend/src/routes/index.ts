import { Router } from "express";
import productRoutes from "./productRoutes";
import userRoutes from "./userRoutes";
import orderRoutes from "./orderRoutes";
import { authenticateToken } from "../middlewares/authenticateToken";
import authenticateRoutes from "./authenticateRoutes";

const router = Router();
router.use("/users", userRoutes);
router.use("/auth", authenticateRoutes);
router.use("/products", productRoutes);
router.use("/orders", authenticateToken, orderRoutes);

export default router;
