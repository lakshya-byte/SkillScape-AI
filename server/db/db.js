import mongoose from "mongoose";
import dns from "node:dns";

// Force Google public DNS so SRV lookups work on restricted networks
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  const connectionString = process.env.MONGODB_URI;
  console.log(connectionString);
  try {
    const connection = await mongoose.connect(connectionString);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
