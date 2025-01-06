import request from "supertest";
import app from "../server"; // Adjust path if needed
import prisma from "../src/config/prismaClient";

describe("Transaction API Tests", () => {
    beforeAll(async () => {
        await prisma.transaction.deleteMany(); // Clear test data
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    test("Should create a transaction", async () => {
        const response = await request(app).post("/api/transactions").send({
            description: "Test transaction",
            amount: 100.0,
            type: "income",
            userId: 1,
            categoryId: 1,
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.description).toBe("Test transaction");
    });

    test("Should fetch a transaction by ID", async () => {
        // Create a transaction
        const transaction = await prisma.transaction.create({
            data: {
                description: "Fetch test",
                amount: 200.0,
                type: "expense",
                userId: 1,
                categoryId: 1,
            },
        });

        const response = await request(app).get(
            `/api/transactions/${transaction.id}`
        );

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", transaction.id);
        expect(response.body.description).toBe("Fetch test");
    });

    test("Should return 404 for non-existent transaction", async () => {
        const response = await request(app).get("/api/transactions/99999");

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("status", "error");
        expect(response.body.message).toBe("Transaction not found");
    });
});
