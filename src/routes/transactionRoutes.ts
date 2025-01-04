import express from "express";
import * as transactionController from "../controllers/transactionController";

const router = express.Router();

// Route to create a new transaction
router.post("/transactions", transactionController.createTransaction);

// Route to get all transactions
router.get("/transactions", transactionController.getAllTransactions);

export default router;
