import { connectDB } from "./config/db.js";
import { app } from "./index.js";
import "dotenv/config";

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server running successfully");
});

await connectDB();
