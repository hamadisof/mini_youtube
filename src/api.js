const API_URL = "http://localhost:5000/api";

// Génère automatiquement les headers avec token
const authHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// ---------- AUTH ----------
export async function apiLogin(pseudo, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo, password })
    });
    return res.json();
}

export async function apiRegister(pseudo, password) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo, password })
    });
    return res.json();
}

// ---------- PLAYLIST ----------
export async function apiGetPlaylist(userId) {
    const res = await fetch(`${API_URL}/playlist/${userId}`, {
        headers: authHeaders()
    });
    return res.json();
}

export async function apiAddToPlaylist(userId, videoId) {
    const res = await fetch(`${API_URL}/playlist`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeaders()
        },
        body: JSON.stringify({ userId, videoId })
    });
    return res.json();
}

// ---------- HISTORY ----------
export async function apiGetHistory(userId) {
    const res = await fetch(`${API_URL}/history/${userId}`, {
        headers: authHeaders()
    });
    return res.json();
}

export async function apiAddToHistory(userId, videoId) {
    const res = await fetch(`${API_URL}/history`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeaders()
        },
        body: JSON.stringify({ userId, videoId })
    });
    return res.json();
}
