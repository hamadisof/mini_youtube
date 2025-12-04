// backend/routes/reactions.routes.js
import express from "express";
import Reaction from "../models/Reaction.model.js";
import { authRequired } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET /api/reactions/:videoId  → stats + reaction utilisateur
router.get("/:videoId", authRequired, async (req, res) => {
    try {
        const videoId = Number(req.params.videoId);

        const [stats, mine] = await Promise.all([
            Reaction.aggregate([
                { $match: { videoId } },
                {
                    $group: {
                        _id: "$videoId",
                        likes: {
                            $sum: { $cond: [{ $eq: ["$type", "like"] }, 1, 0] },
                        },
                        dislikes: {
                            $sum: { $cond: [{ $eq: ["$type", "dislike"] }, 1, 0] },
                        },
                    },
                },
            ]),
            Reaction.findOne({ userId: req.userId, videoId }).lean(),
        ]);

        const base = stats[0] || { likes: 0, dislikes: 0 };
        res.json({
            likes: base.likes || 0,
            dislikes: base.dislikes || 0,
            myReaction: mine?.type || null,
        });
    } catch (err) {
        console.error("REACTIONS GET ERROR:", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// POST /api/reactions/:videoId  { type: "like" | "dislike" | null }
router.post("/:videoId", authRequired, async (req, res) => {
    try {
        const videoId = Number(req.params.videoId);
        const { type } = req.body; // like / dislike / null (pour retirer)

        if (!["like", "dislike", null].includes(type)) {
            return res.status(400).json({ message: "type invalide" });
        }

        if (type === null) {
            await Reaction.deleteOne({ userId: req.userId, videoId });
        } else {
            await Reaction.findOneAndUpdate(
                { userId: req.userId, videoId },
                { type },
                { upsert: true, new: true }
            );
        }

        res.json({ message: "Réaction enregistrée" });
    } catch (err) {
        console.error("REACTIONS POST ERROR:", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

export default router;
