const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/Book.routes");
const logger = require("./middleware/logger");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);

// Connect MongoDB
connectDB();

// Routes
app.use("/api/books", bookRoutes);

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
