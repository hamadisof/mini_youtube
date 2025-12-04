import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "SUPER_SECRET_KEY_CHANGE_ME";

export const register = async (req, res) => {
    try {
        const { pseudo, password } = req.body;

        const exists = await User.findOne({ pseudo });
        if (exists) return res.status(400).json({ message: "Pseudo déjà utilisé" });

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            pseudo,
            password: hash,
        });

        res.json({ message: "Inscription OK", userId: user._id });
    } catch {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

export const login = async (req, res) => {
    try {
        const { pseudo, password } = req.body;

        const user = await User.findOne({ pseudo });
        if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Mot de passe incorrect" });

        const token = jwt.sign(
            { id: user._id, pseudo: user.pseudo },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ message: "Connexion OK", token });
    } catch {
        res.status(500).json({ message: "Erreur serveur" });
    }
};
