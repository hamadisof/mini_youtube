// backend/routes/comments.routes.js
import express from "express";
import Comment from "../models/Comment.model.js";
import { authRequired } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET /api/comments/:videoId?page=1&limit=10
router.get("/:videoId", async (req, res) => {
    try {
        const videoId = Number(req.params.videoId);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            Comment.find({ videoId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Comment.countDocuments({ videoId }),
        ]);

        res.json({
            comments: items,
            total,
            page,
            pages: Math.ceil(total / limit),
        });
    } catch (err) {
        console.error("COMMENTS GET ERROR:", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// POST /api/comments/:videoId  { text }
router.post("/:videoId", authRequired, async (req, res) => {
    try {
        const videoId = Number(req.params.videoId);
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({ message: "Commentaire vide" });
        }

        const comment = await Comment.create({
            userId: req.userId,
            videoId,
            pseudo: req.user?.pseudo || "Utilisateur",
            text: text.trim(),
        });

        res.json(comment);
    } catch (err) {
        console.error("COMMENTS POST ERROR:", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// DELETE /api/comments/:id  → suppr seulement si auteur
router.delete("/by-id/:id", authRequired, async (req, res) => {
    try {
        const id = req.params.id;
        await Comment.deleteOne({ _id: id, userId: req.userId });
        res.json({ message: "Commentaire supprimé (si tu en étais l'auteur)" });
    } catch (err) {
        console.error("COMMENTS DELETE ERROR:", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

export default router;
