// backend/models/Playlist.model.js
import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        videoId: { type: Number, required: true },
    },
    { timestamps: true }
);

// un seul enregistrement par (user, video)
playlistSchema.index({ userId: 1, videoId: 1 }, { unique: true });

export default mongoose.model("PlaylistItem", playlistSchema);
