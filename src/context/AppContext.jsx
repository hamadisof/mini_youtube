// src/context/AppContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

const API = "http://localhost:5000/api";

export function AppProvider({ children }) {
    // -----------------------------
    // USER + TOKEN
    // -----------------------------
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    const [token, setToken] = useState(() => localStorage.getItem("token") || null);

    // Sauvegarde locale
    useEffect(() => {
        if (user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");

        if (token) localStorage.setItem("token", token);
        else localStorage.removeItem("token");
    }, [user, token]);

    // -----------------------------
    // AUTH HEADER CORRIGÉ
    // -----------------------------
    const authHeader = () => {
        const headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        return headers;
    };

    // -----------------------------
    // REGISTER
    // -----------------------------
    const register = async (pseudo, email, password) => {
        const res = await fetch(`${API}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pseudo, email, password }),
        });

        if (!res.ok) {
            const error = await res.json().catch(() => null);
            throw new Error(error?.message || "Erreur lors de l'inscription");
        }

        return res.json();
    };

    // -----------------------------
    // LOGIN
    // -----------------------------
    const login = async (email, password) => {
        const res = await fetch(`${API}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const error = await res.json().catch(() => null);
            throw new Error(error?.message || "Identifiants incorrects");
        }

        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
    };

    // -----------------------------
    // LOGOUT
    // -----------------------------
    const logout = () => {
        setUser(null);
        setToken(null);
    };

    // -----------------------------
    // PLAYLIST
    // -----------------------------
    const getPlaylist = async () => {
        const res = await fetch(`${API}/playlist`, {
            headers: authHeader(),
        });
        return res.json();
    };

    const addToPlaylist = async (videoId) => {
        await fetch(`${API}/playlist`, {
            method: "POST",
            headers: authHeader(),
            body: JSON.stringify({ videoId }),
        });
    };

    const removeFromPlaylist = async (videoId) => {
        await fetch(`${API}/playlist/${videoId}`, {
            method: "DELETE",
            headers: authHeader(),
        });
    };

    // -----------------------------
    // HISTORY
    // -----------------------------
    const getHistory = async () => {
        const res = await fetch(`${API}/history`, {
            headers: authHeader(),
        });
        return res.json();
    };

    const pushHistory = async (videoId) => {
        await fetch(`${API}/history`, {
            method: "POST",
            headers: authHeader(),
            body: JSON.stringify({ videoId }),
        });
    };

    // -----------------------------
    // REACTIONS
    // -----------------------------
    const getReactions = async (videoId) => {
        const res = await fetch(`${API}/reactions/${videoId}`, {
            headers: authHeader(),
        });
        return res.json();
    };

    const react = async (videoId, type) => {
        await fetch(`${API}/reactions/${videoId}`, {
            method: "POST",
            headers: authHeader(),
            body: JSON.stringify({ type }),
        });
    };

    // -----------------------------
    // COMMENTS
    // -----------------------------
    const getComments = async (videoId, page = 1) => {
        const res = await fetch(`${API}/comments/${videoId}?page=${page}`);
        return res.json();
    };

    const addComment = async (videoId, text) => {
        const res = await fetch(`${API}/comments/${videoId}`, {
            method: "POST",
            headers: authHeader(),
            body: JSON.stringify({ text }),
        });
        return res.json();
    };

    return (
        <AppContext.Provider
            value={{
                user,
                token,
                login,
                register,
                logout,
                getPlaylist,
                addToPlaylist,
                removeFromPlaylist,
                getHistory,
                pushHistory,
                getReactions,
                react,
                getComments,
                addComment,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
