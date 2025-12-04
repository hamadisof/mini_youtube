// backend/models/Reaction.model.js
import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        videoId: { type: Number, required: true },
        type: { type: String, enum: ["like", "dislike"], required: true },
    },
    { timestamps: true }
);

// un seul reaction par user / video
reactionSchema.index({ userId: 1, videoId: 1 }, { unique: true });

export default mongoose.model("Reaction", reactionSchema);
