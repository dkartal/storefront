import { Router } from "express";
import {
  createProduct,
  getAllProducts
} from "../controllers/productController";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getAllProducts);
router.post("/", createProduct);

export default router;
