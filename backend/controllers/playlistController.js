import Playlist from "../models/Playlist.model.js";

export const getPlaylist = async (req, res) => {
    const userId = req.params.userId;

    let playlist = await Playlist.findOne({ userId });

    if (!playlist) {
        playlist = await Playlist.create({ userId, videos: [] });
    }

    res.json(playlist.videos);
};

export const addToPlaylist = async (req, res) => {
    const { userId, videoId } = req.body;

    let playlist = await Playlist.findOne({ userId });

    if (!playlist) {
        playlist = await Playlist.create({ userId, videos: [videoId] });
        return res.json(playlist);
    }

    if (!playlist.videos.includes(videoId)) {
        playlist.videos.push(videoId);
        await playlist.save();
    }

    res.json(playlist);
};
