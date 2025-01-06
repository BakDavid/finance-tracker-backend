import prisma from "../config/prismaClient";
import { Transaction } from "@prisma/client";

export const createTransaction = async (data: Transaction) => {
    try {
        return await prisma.transaction.create({
            data,
        });
    } catch (error: unknown) {
        // Specify that error is of type 'unknown'
        if (error instanceof Error) {
            // Narrow the type to 'Error'
            throw new Error("Failed to create transaction: " + error.message);
        } else {
            throw new Error(
                "Failed to create transaction: An unknown error occurred."
            );
        }
    }
};

export const getAllTransactions = async () => {
    try {
        return await prisma.transaction.findMany();
    } catch (error: unknown) {
        // Specify that error is of type 'unknown'
        if (error instanceof Error) {
            // Narrow the type to 'Error'
            throw new Error("Failed to fetch transactions: " + error.message);
        } else {
            throw new Error(
                "Failed to fetch transactions: An unknown error occurred."
            );
        }
    }
};

export const getTransactionById = async (
    id: number
): Promise<Transaction | null> => {
    try {
        return await prisma.transaction.findUnique({
            where: { id },
        });
    } catch (error) {
        throw new Error(
            "Failed to fetch transaction: " + (error as Error).message
        );
    }
};
