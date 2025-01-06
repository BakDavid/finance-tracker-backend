import express from "express";
import * as transactionController from "../controllers/transactionController";

const router = express.Router();

router.get("/", transactionController.getAllTransactions);
router.post("/", transactionController.createTransaction);
router.get("/:id", transactionController.getTransactionById);

export default router;
