import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const generateDummyData = async () => {
    // Create 100 dummy transactions
    for (let i = 0; i < 100; i++) {
        const type = Math.random() > 0.5 ? "income" : "expense";
        const amount =
            type === "income"
                ? parseFloat((Math.random() * (10000 - 100) + 100).toFixed(2)) // Between 100 and 10,000
                : parseFloat((Math.random() * (500 - 10) + 10).toFixed(2)); // Between 10 and 500

        // Updated: Replacing bs() with catchPhrase() for company-related description
        const description =
            type === "income"
                ? faker.company.catchPhrase() // Company-related description
                : faker.commerce.productName(); // Random product name for expenses

        // Updated: Using the correct format for date range
        const transactionDate = faker.date.between({
            from: new Date("2023-01-01"),
            to: new Date("2024-01-01"),
        });

        // Insert the transaction into the database
        await prisma.transaction.create({
            data: {
                description,
                amount,
                type,
                date: transactionDate,
            },
        });

        console.log(`Created ${type} transaction: ${description} - $${amount}`);
    }

    console.log("Dummy data generation complete!");
};

generateDummyData()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
