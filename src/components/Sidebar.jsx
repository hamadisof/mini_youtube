import { Home, Video, ListVideo, Clock, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const { pathname } = useLocation();

    const linkClass = (route) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-zinc-800 transition ${pathname === route ? "bg-zinc-800" : ""
        }`;

    return (
        <aside className="hidden md:flex flex-col w-56 bg-zinc-900 h-[calc(100vh-4rem)] fixed left-0 top-16 text-sm text-white py-4 border-r border-zinc-800">
            <Link to="/" className={linkClass("/")}>
                <Home size={18} /> Accueil
            </Link>

            <Link to="/shorts" className={linkClass("/shorts")}>
                <Video size={18} /> Shorts
            </Link>

            <Link to="/playlist" className={linkClass("/playlist")}>
                <ListVideo size={18} /> Playlist
            </Link>

            <Link to="/history" className={linkClass("/history")}>
                <Clock size={18} /> Historique
            </Link>

            <Link to="/login" className={linkClass("/login")}>
                <User size={18} /> Compte
            </Link>
        </aside>
    );
}
