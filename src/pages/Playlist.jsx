import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { videos } from "../data/videos";
import { Trash2 } from "lucide-react";

export default function Playlist() {
    const { getPlaylist, removeFromPlaylist } = useApp();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Charger la playlist utilisateur
    useEffect(() => {
        async function load() {
            try {
                const data = await getPlaylist();
                setItems(data);
            } catch (err) {
                console.error("PLAYLIST LOAD ERROR:", err);
            }
            setLoading(false);
        }
        load();
    }, []);

    if (loading)
        return <div className="text-white p-6 text-center">Chargement…</div>;

    if (items.length === 0)
        return (
            <div className="text-white p-6 text-center">
                🎵 Aucun élément dans votre playlist.
            </div>
        );

    return (
        <div className="p-6 text-white">
            <h1 className="text-2xl font-bold mb-4">Ma Playlist</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((entry) => {
                    const video = videos.find((v) => v.id === entry.videoId);
                    if (!video) return null;

                    return (
                        <div
                            key={entry._id}
                            className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg"
                        >
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-40 object-cover"
                            />

                            <div className="p-3">
                                <h3 className="font-semibold">{video.title}</h3>
                                <p className="text-sm text-gray-400">
                                    {video.channel}
                                </p>

                                <button
                                    onClick={async () => {
                                        await removeFromPlaylist(video.id);
                                        setItems(items.filter(i => i.videoId !== video.id));
                                    }}
                                    className="mt-3 flex items-center gap-2 text-red-400 hover:text-red-300"
                                >
                                    <Trash2 size={18} />
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
