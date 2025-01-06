// server.ts
import express from "express";
import cors from "cors";
import transactionRoutes from "./src/routes/transactionRoutes";
import userRoutes from "./src/routes/userRoutes";
import categoryRoutes from "./src/routes/categoryRoutes";

const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON request bodies

// Use the transaction routes
app.use("/api/transactions", transactionRoutes);

// Use the user routes
app.use("/api/users", userRoutes);

// Use the category routes
app.use("/api/categories", categoryRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
