import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { videos } from "../data/videos";
import { Trash2 } from "lucide-react";

export default function History() {
    const { getHistory } = useApp();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Charger l'historique
    useEffect(() => {
        async function load() {
            try {
                const data = await getHistory();
                setItems(data);
            } catch (err) {
                console.error("HISTORY LOAD ERROR:", err);
            }
            setLoading(false);
        }
        load();
    }, []);

    if (loading)
        return <div className="text-white p-6 text-center">Chargemmmeent…</div>;

    if (items.length === 0)
        return (
            <div className="text-white p-6 text-center">
                📺 Aucun historique pour le momentos.
            </div>
        );

    return (
        <div className="p-6 text-white">
            <h1 className="text-2xl font-bold mb-4">Historique</h1>

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
                                className="w-full h-35 object-cover"
                            />

                            <div className="p-3">
                                <h3 className="font-semibold">{video.title}</h3>
                                <p className="text-sm text-gray-400">
                                    Vu le {new Date(entry.watchedAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
