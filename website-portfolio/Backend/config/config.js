import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB ");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
        process.exit(1);   // Əgər bağlantı olmasa server dayansin
    });