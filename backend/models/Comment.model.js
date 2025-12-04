// backend/models/Comment.model.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        videoId: { type: Number, required: true },
        pseudo: { type: String, required: true }, // pour afficher sans re-requêter l’utilisateur
        text: { type: String, required: true },
    },
    { timestamps: true }
);

commentSchema.index({ videoId: 1, createdAt: -1 });

export default mongoose.model("Comment", commentSchema);
