import History from "../models/History.model.js";

export const getHistory = async (req, res) => {
    const userId = req.params.userId;

    let history = await History.findOne({ userId });

    if (!history) {
        history = await History.create({ userId, history: [] });
    }

    res.json(history.history);
};

export const addToHistory = async (req, res) => {
    const { userId, videoId } = req.body;

    let history = await History.findOne({ userId });

    if (!history) {
        history = await History.create({
            userId,
            history: [{ videoId }]
        });
        return res.json(history);
    }

    history.history.unshift({ videoId });
    history.history = history.history.slice(0, 100);

    await history.save();

    res.json(history);
};
