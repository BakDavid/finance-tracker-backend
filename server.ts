// src/server.ts
import express from "express";
import cors from "cors";
import transactionRoutes from "./src/routes/transactionRoutes"; // Import routes

const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON request bodies

// Use the transaction routes
app.use("/api", transactionRoutes); // Prefix the routes with /api

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
