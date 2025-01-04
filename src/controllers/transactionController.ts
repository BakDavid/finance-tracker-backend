import { Request, Response } from "express";
import * as transactionService from "../services/transactionService";

export const createTransaction = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const transaction = await transactionService.createTransaction(
            req.body
        );
        res.status(201).json(transaction);
    } catch (error: unknown) {
        if (error instanceof Error) {
            // Error is of type Error, so we can access error.message
            res.status(500).json({
                error: "Failed to create transaction: " + error.message,
            });
        } else {
            // Handle unexpected errors, that don't inherit from the Error class
            res.status(500).json({
                error: "Failed to create transaction: An unknown error occurred.",
            });
        }
    }
};

export const getAllTransactions = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const transactions = await transactionService.getAllTransactions();
        res.status(200).json(transactions);
    } catch (error: unknown) {
        if (error instanceof Error) {
            // Error is of type Error, so we can access error.message
            res.status(500).json({
                error: "Failed to fetch transactions: " + error.message,
            });
        } else {
            // Handle unexpected errors, that don't inherit from the Error class
            res.status(500).json({
                error: "Failed to fetch transactions: An unknown error occurred.",
            });
        }
    }
};
