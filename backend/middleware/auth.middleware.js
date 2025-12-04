// backend/middleware/auth.middleware.js
import jwt from "jsonwebtoken";

export function authRequired(req, res, next) {
    try {
        const header = req.headers.authorization || "";
        const [, token] = header.split(" ");

        if (!token) {
            return res.status(401).json({ message: "Token manquant" });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.id;
        next();
    } catch (err) {
        console.error("AUTH ERROR:", err);
        return res.status(401).json({ message: "Token invalide ou expiré" });
    }
}
