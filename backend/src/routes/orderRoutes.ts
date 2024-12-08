import { Router } from "express";
import {
  createOrder,
  getCompletedOrdersByUserId,
  getCurrentOrderByUserId
} from "../controllers/orderController";

const router = Router();

router.get("/:id", getCurrentOrderByUserId);
router.get("/completed/:id", getCompletedOrdersByUserId);
router.post("/", createOrder);

export default router;
