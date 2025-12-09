// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// --- MIDDLEWARE ---
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.options("*", cors());


// --- MONGO ---
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ ERREUR : MONGO_URI manquant dans .env");
    process.exit(1);
}

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("🟢 MongoDB connecté nikel"))
    .catch((err) => console.error("❌ Erreur MongoDB :", err));

// --- ROUTES ---
import authRoutes from "./routes/auth.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";
import historyRoutes from "./routes/history.routes.js";
import reactionsRoutes from "./routes/reactions.routes.js";
import commentsRoutes from "./routes/comments.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/playlist", playlistRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/reactions", reactionsRoutes);
app.use("/api/comments", commentsRoutes);

// --- TEST ROOT ---
app.get("/", (req, res) => {
    res.send("🔥 Backend Mini-YouTube opérationnel Youpi!");
});

// --- START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur backend sur http://localhost:${PORT}`);
});
