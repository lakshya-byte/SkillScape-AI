import mongoose from "mongoose";

const connectDB = async () => {
    const connectionString = process.env.MONGODB_URI;
    console.log("Attempting to connect to MongoDB...");
    try {
        const connection = await mongoose.connect(connectionString);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;