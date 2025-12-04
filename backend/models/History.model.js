// backend/models/History.model.js
import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        videoId: { type: Number, required: true },
        watchedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

historySchema.index({ userId: 1, videoId: 1 });

export default mongoose.model("HistoryItem", historySchema);
