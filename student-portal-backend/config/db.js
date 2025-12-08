import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        await mongoose.connect(uri);
        console.log("Database connected");
    } catch (err) {
        console.log("Database connection error:", err.message);
    }
};
