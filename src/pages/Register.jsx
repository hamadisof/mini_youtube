// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Register() {
    const { register } = useApp();
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await register(pseudo, email, password);
            navigate("/login");
        } catch (err) {
            setError(err.message || "Erreur inattendue");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-900 text-white">
            <form
                onSubmit={handleSubmit}
                className="bg-zinc-800 p-10 rounded-xl w-full max-w-md space-y-5 shadow-xl"
            >
                <h1 className="text-2xl font-bold text-center">Créer un compte</h1>

                {error && (
                    <div className="bg-red-600 text-white p-3 rounded-lg text-center">
                        {error}
                    </div>
                )}

                <div>
                    <label>Pseudo</label>
                    <input
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                        className="mt-1 w-full p-2 rounded bg-zinc-700"
                        required
                    />
                </div>

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
                    Créer mon compte
                </button>

                <p className="text-center text-sm">
                    Vous avez déjà un compte ?{" "}
                    <Link to="/login" className="text-blue-400 underline">
                        Se connecter
                    </Link>
                </p>
            </form>
        </div>
    );
}
