import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const router = express.Router();

// --- REGISTER ---
router.post("/register", async (req, res) => {
    try {
        const { pseudo, email, password } = req.body;

        if (!pseudo || !email || !password)
            return res.status(400).json({ message: "Champs manquants" });

        const exists = await User.findOne({ email });
        if (exists)
            return res.status(400).json({ message: "Email déjà utilisé." });

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            pseudo,
            email,
            password: hashed,
        });

        res.json({ message: "Compte créé", userId: user._id });
    } catch (err) {
        console.error("REGISTER ERROR:", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// --- LOGIN ---
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Utilisateur introuvable" });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok)
            return res.status(400).json({ message: "Mot de passe incorrect" });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            user: {
                id: user._id,
                pseudo: user.pseudo,
                email: user.email,
            },
        });
    } catch (err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

export default router;
