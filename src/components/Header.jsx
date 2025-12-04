import { Search, Video, ListVideo, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import Logo from "../assets/youtube-logo.svg";
import SearchResults from "../components/SearchResults.jsx";
import { videos } from "../data/videos";

export default function Header() {
    const { user, logout, searchTerm, setSearchTerm } = useApp();
    const navigate = useNavigate();

    // 🔥 Correction : searchTerm peut être null → on protège avec (searchTerm || "")
    const handleSearchClick = () => {
        const q = (searchTerm || "").trim().toLowerCase();
        if (!q) return;

        const results = videos.filter((v) =>
            v.title.toLowerCase().includes(q)
        );

        if (results.length === 0) return;

        navigate(`/video/${results[0].id}`);
        setSearchTerm("");
    };

    return (
        <header
            className="
                fixed top-0 left-0 w-full z-50
                bg-zinc-900/80 backdrop-blur-xl
                border-b border-white/5
                flex items-center justify-between
                px-4 py-2 shadow-md
            "
        >
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-2 group">
                <img
                    src={Logo}
                    alt="YouTube"
                    className="
                        h-7 select-none 
                        transition-transform duration-200
                        group-hover:scale-105
                    "
                />
            </Link>

            {/* BARRE DE RECHERCHE */}
            <div className="relative hidden sm:flex items-center w-1/2 max-w-xl">
                <div
                    className="
                        flex items-center bg-zinc-800/70 hover:bg-zinc-800
                        rounded-full px-4 py-1.5 
                        w-full
                        border border-white/10
                        transition-all
                        focus-within:ring-2 focus-within:ring-blue-500/50
                    "
                >
                    <input
                        className="
                            bg-transparent outline-none w-full text-sm
                            text-gray-200 placeholder-gray-400
                        "
                        placeholder="Rechercher"
                        value={searchTerm || ""}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Icône Search */}
                    <Search
                        size={18}
                        className="opacity-80 cursor-pointer hover:scale-110 transition"
                        onClick={handleSearchClick}
                    />
                </div>

                {/* Résultats */}
                {(searchTerm || "").trim().length > 0 && (
                    <SearchResults
                        query={searchTerm}
                        onSelect={(id) => {
                            navigate(`/video/${id}`);
                            setSearchTerm("");
                        }}
                    />
                )}
            </div>

            {/* ICÔNES + COMPTE */}
            <div className="flex items-center gap-3">

                <Link
                    to="/shorts"
                    className="p-2 rounded-full hover:bg-white/10 transition flex items-center justify-center"
                >
                    <Video size={22} />
                </Link>

                <Link
                    to="/history"
                    className="p-2 rounded-full hover:bg-white/10 transition flex items-center justify-center"
                >
                    <Clock size={22} />
                </Link>

                <Link
                    to="/playlist"
                    className="p-2 rounded-full hover:bg-white/10 transition flex items-center justify-center"
                >
                    <ListVideo size={22} />
                </Link>

                {/* UTILISATEUR */}
                {user ? (
                    <button
                        onClick={logout}
                        className="
                            bg-red-600/80 hover:bg-red-600
                            px-4 py-1.5 rounded-full
                            text-sm font-semibold transition
                        "
                    >
                        {user.pseudo}
                    </button>
                ) : (
                    <button
                        onClick={() => navigate("/login")}
                        className="
                            bg-blue-600/80 hover:bg-blue-600
                            px-4 py-1.5 rounded-full
                            text-sm font-semibold transition
                        "
                    >
                        Connexion
                    </button>
                )}
            </div>
        </header>
    );
}
