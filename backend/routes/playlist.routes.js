// backend/routes/playlist.routes.js
import express from "express";
import PlaylistItem from "../models/Playlist.model.js";
import { authRequired } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET /api/playlist  → liste de la playlist de l'utilisateur
router.get("/", authRequired, async (req, res) => {
    try {
        const items = await PlaylistItem.find({ userId: req.userId })
            .sort({ createdAt: -1 })
            .lean();

        res.json(items);
    } catch (err) {
        console.error("PLAYLIST GET ERROR:", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// POST /api/playlist  { videoId } → ajouter
router.post("/", authRequired, async (req, res) => {
    try {
        const { videoId } = req.body;
        if (!videoId) return res.status(400).json({ message: "videoId manquant" });

        await PlaylistItem.updateOne(
            { userId: req.userId, videoId },
            { $setOnInsert: { userId: req.userId, videoId } },
            { upsert: true }
        );

        res.json({ message: "Ajouté à la playlist" });
    } catch (err) {
        console.error("PLAYLIST POST ERROR:", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// DELETE /api/playlist/:videoId → retirer
router.delete("/:videoId", authRequired, async (req, res) => {
    try {
        const videoId = Number(req.params.videoId);
        await PlaylistItem.deleteOne({ userId: req.userId, videoId });
        res.json({ message: "Supprimé de la playlist" });
    } catch (err) {
        console.error("PLAYLIST DELETE ERROR:", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

export default router;
