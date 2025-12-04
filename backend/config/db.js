// backend/config/db.js
import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connecté à mini_youtube");
    } catch (err) {
        console.error("❌ Erreur MongoDB :", err.message);
        process.exit(1);
    }
}
