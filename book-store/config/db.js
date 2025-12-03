import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URI;
    await mongoose.connect(url)
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;