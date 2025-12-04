// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login() {
    const { login } = useApp();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            setError(err.message || "Erreur de connexion");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-white">
            <form
                onSubmit={handleSubmit}
                className="bg-zinc-800 p-10 rounded-xl w-full max-w-md space-y-5 shadow-xl"
            >
                <h1 className="text-2xl font-bold text-center">Connexion</h1>

                {error && (
                    <div className="bg-red-600 text-white p-3 rounded-lg text-center">
                        {error}
                    </div>
                )}

                <div>
                    <label>Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full p-2 rounded bg-zinc-700"
                        required
                    />
                </div>

                <div>
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 w-full p-2 rounded bg-zinc-700"
                        required
                    />
                </div>

                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold transition"
                >
                    Se connecter
                </button>

                <p className="text-center text-sm">
                    Pas encore de compte ?{" "}
                    <Link to="/register" className="text-blue-400 underline">
                        Créer un compte
                    </Link>
                </p>
            </form>
        </div>
    );
}
