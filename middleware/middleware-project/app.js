const express = require("express");
const app = express();

app.use(express.json());

// Import Middlewares
const logger = require("./middleware/logger");
const timeCheck = require("./middleware/timeCheck");
const auth = require("./middleware/auth");
const validateUser = require("./middleware/validateUser");

// Use Global Middlewares
app.use(logger);
app.use(timeCheck);

// Routes
app.get("/admin", auth, (req, res) => {
  res.send("Admin Panel Access Granted");
});

app.post("/register", validateUser, (req, res) => {
  res.send("User registered");
});

app.listen(3000, () => console.log("Server running on port 3000"));
