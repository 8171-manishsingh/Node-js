import express from "express";
import connectDB from "./config/db.js";
import bookRoutes from "./routes/routes.js";
import logger from "./middleware/logger.js";
import "dotenv/config";

const PORT = process.env.PORT;

const app = express();

// Middlewares
app.use(express.json());
app.use(logger);

// Connect MongoDB
await connectDB();

// Routes
app.use(bookRoutes);

// Start Server
app.listen(PORT, () => console.log("Server running on port 3000"));
