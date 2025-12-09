// backend/routes/history.routes.js
import express from "express";
import HistoryItem from "../models/History.model.js";
import { authRequired } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET /api/history
router.get("/", authRequired, async (req, res) => {
    try {
        const items = await HistoryItem.find({ userId: req.userId })
            .sort({ watchedAt: -1 })
            .limit(100)
            .lean();

        res.json(items);
    } catch (err) {
        console.error("HISTORY GET ERROR:", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// POST /api/history  { videoId }
router.post("/", authRequired, async (req, res) => {
    try {
        const { videoId } = req.body;
        if (!videoId) return res.status(400).json({ message: "videoId manquant" });

        // on met à jour la date si déjà présent
        await HistoryItem.findOneAndUpdate(
            { userId: req.userId, videoId },
            { watchedAt: new Date() },
            { upsert: true, new: true }
        );

        res.json({ message: "Ajouté à l'historiques" });
    } catch (err) {
        console.error("HISTORY POST ERROR:", err);
        res.status(500).json({ message: "Err serveur" });
    }
});

// DELETE /api/history  → tout effacer
router.delete("/", authRequired, async (req, res) => {
    try {
        await HistoryItem.deleteMany({ userId: req.userId });
        res.json({ message: "Historique effacée" });
    } catch (err) {
        console.error("HISTORY DELETE ERROR:", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

export default router;
