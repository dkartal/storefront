import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  loginUser
} from "../controllers/userController";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.post("/login", loginUser);

export default router;
