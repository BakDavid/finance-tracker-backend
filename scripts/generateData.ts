import { Category, PrismaClient, User } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const generateDummyData = async () => {
    try {
        console.log("Generating dummy data...");

        // Create 10 dummy users
        const users: User[] = [];
        for (let i = 0; i < 10; i++) {
            const user = await prisma.user.create({
                data: {
                    name: faker.name.fullName(),
                    email: faker.internet.email(),
                    password: faker.internet.password(), // Generate a random password
                },
            });
            users.push(user);
            console.log(`Created user: ${user.name} (${user.email})`);
        }

        // Create 5 dummy categories
        const categories: Category[] = [];
        for (let i = 0; i < 5; i++) {
            const category = await prisma.category.create({
                data: {
                    name: faker.commerce.department(),
                },
            });
            categories.push(category);
            console.log(`Created category: ${category.name}`);
        }

        // Create 100 dummy transactions
        for (let i = 0; i < 100; i++) {
            const type = Math.random() > 0.5 ? "income" : "expense";
            const amount =
                type === "income"
                    ? parseFloat(
                          (Math.random() * (10000 - 100) + 100).toFixed(2)
                      ) // Between 100 and 10,000
                    : parseFloat((Math.random() * (500 - 10) + 10).toFixed(2)); // Between 10 and 500

            const description =
                type === "income"
                    ? faker.company.catchPhrase() // Company-related description
                    : faker.commerce.productName(); // Random product name for expenses

            const transactionDate = faker.date.between({
                from: new Date("2023-01-01"),
                to: new Date("2024-01-01"),
            });

            // Randomly assign a user and category
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomCategory =
                categories[Math.floor(Math.random() * categories.length)];

            await prisma.transaction.create({
                data: {
                    description,
                    amount,
                    type,
                    date: transactionDate,
                    userId: randomUser.id,
                    categoryId: randomCategory.id,
                },
            });

            console.log(
                `Created ${type} transaction for user ${randomUser.name} in category ${randomCategory.name}: ${description} - $${amount}`
            );
        }

        console.log("Dummy data generation complete!");
    } catch (error) {
        console.error("Error generating dummy data:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

generateDummyData();
