import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON request bodies

// API Route to get all transactions
app.get("/api/transactions", async (req, res) => {
    const transactions = await prisma.transaction.findMany();
    res.json(transactions);
});

// API Route to create a new transaction
app.post("/api/transactions", async (req, res) => {
    const { description, amount, type } = req.body;
    const transaction = await prisma.transaction.create({
        data: {
            description,
            amount,
            type,
        },
    });
    res.json(transaction);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
