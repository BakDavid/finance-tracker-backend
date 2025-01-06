import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);

export default router;
