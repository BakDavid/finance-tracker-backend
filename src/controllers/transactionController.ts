import { Request, Response } from "express";
import * as transactionService from "../services/transactionService";
import { errorResponse } from "../utils/errorResponse";

export const createTransaction = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const transaction = await transactionService.createTransaction(
            req.body
        );
        res.status(201).json({
            status: "success",
            data: transaction,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json(
                errorResponse("Failed to create transaction", error.message)
            );
        } else {
            res.status(500).json(
                errorResponse(
                    "Failed to create transaction",
                    "An unknown error occurred."
                )
            );
        }
    }
};

export const getAllTransactions = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const transactions = await transactionService.getAllTransactions();
        res.status(200).json({
            status: "success",
            data: transactions,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json(
                errorResponse("Failed to fetch transactions", error.message)
            );
        } else {
            res.status(500).json(
                errorResponse(
                    "Failed to fetch transactions",
                    "An unknown error occurred."
                )
            );
        }
    }
};

export const getTransactionById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { id } = req.params;
        const transaction = await transactionService.getTransactionById(
            Number(id)
        );
        if (!transaction) {
            res.status(404).json({
                status: "error",
                message: "Transaction not found",
            });
        } else {
            res.status(200).json(transaction);
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Failed to fetch transaction",
            details: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
