import { Router } from "express";
import {
  addProduct,
  createOrder,
  getCompletedOrdersByUserId,
  getCurrentOrderByUserId
} from "../controllers/orderController";

const router = Router();

router.get("/active", getCurrentOrderByUserId);
router.get("/completed", getCompletedOrdersByUserId);
router.post("/", createOrder);
router.post("/:id/products", addProduct);

export default router;
