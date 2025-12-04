import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { videos } from "../data/videos";
import VideoCard from "../components/VideoCard";
import { useApp } from "../context/AppContext.jsx";
import { Heart, HeartOff } from "lucide-react";

export default function VideoPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const video = videos.find((v) => v.id == id);

    const {
        user,
        getPlaylist,
        addToPlaylist,
        removeFromPlaylist,
        pushHistory,
    } = useApp();

    const [inPlaylist, setInPlaylist] = useState(false);
    const [loadingPlaylist, setLoadingPlaylist] = useState(true);

    // 🔹 Quand on arrive sur la page : 
    // - Ajout à l'historique
    // - Vérif si la vidéo est dans la playlist
    useEffect(() => {
        if (!video) return;

        // on pousse dans l'historique (si connecté)
        if (user) {
            pushHistory(video.id).catch((err) =>
                console.error("PUSH HISTORY ERROR:", err)
            );
        }

        // on check la playlist
        async function checkPlaylist() {
            try {
                if (!user) {
                    setInPlaylist(false);
                    return;
                }

                const list = await getPlaylist();
                const found = list.some((item) => item.videoId === video.id);
                setInPlaylist(found);
            } catch (err) {
                console.error("LOAD PLAYLIST ERROR:", err);
            } finally {
                setLoadingPlaylist(false);
            }
        }

        checkPlaylist();
    }, [id, user]);

    if (!video) {
        return (
            <div className="text-white p-10">
                Vidéo introuvable.
            </div>
        );
    }

    const handlePlaylistClick = async () => {
        // 🔐 si pas connecté → on redirige
        if (!user) {
            alert("Vous devez être connecté pour gérer la playlist.");
            navigate("/login");
            return;
        }

        try {
            if (inPlaylist) {
                await removeFromPlaylist(video.id);
                setInPlaylist(false);
            } else {
                await addToPlaylist(video.id);
                setInPlaylist(true);
            }
        } catch (err) {
            console.error("PLAYLIST BUTTON ERROR:", err);
            alert("Une erreur est survenue avec la playlist.");
        }
    };

    return (
        <div className="p-6 text-white max-w-6xl mx-auto">

            {/* LECTEUR VIDEO */}
            <video
                src={video.src}
                controls
                autoPlay
                className="w-full rounded-xl mb-4"
            />

            {/* INFOS + AVATAR + BOUTON PLAYLIST */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <img
                        src={video.avatar}
                        alt="avatar"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <h1 className="text-xl font-bold">{video.title}</h1>
                        <p className="text-gray-300">{video.channel}</p>
                    </div>
                </div>

                {/* ⭐ BOUTON PLAYLIST ⭐ */}
                <button
                    onClick={handlePlaylistClick}
                    disabled={loadingPlaylist}
                    className={`
                        px-4 py-2 rounded-full flex items-center gap-2 transition
                        ${inPlaylist
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-blue-600 hover:bg-blue-700"}
                        ${loadingPlaylist ? "opacity-60 cursor-not-allowed" : ""}
                    `}
                >
                    {inPlaylist ? (
                        <>
                            <HeartOff size={18} /> Retirer de la playlist
                        </>
                    ) : (
                        <>
                            <Heart size={18} /> Ajouter à la playlist
                        </>
                    )}
                </button>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-400 whitespace-pre-line mb-6">
                {video.description}
            </p>

            {/* AUTRES VIDÉOS */}
            <h2 className="text-lg font-semibold mb-3">Plus de vidéos</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos
                    .filter((v) => v.id != video.id)
                    .slice(0, 6)
                    .map((v) => (
                        <VideoCard key={v.id} video={v} />
                    ))}
            </div>
        </div>
    );
}
