import { Router } from "express";
import {
  createOrder,
  getCurrentOrderByUserId
} from "../controllers/orderController";

const router = Router();

router.get("/:id", getCurrentOrderByUserId);
router.post("/", createOrder);

export default router;
