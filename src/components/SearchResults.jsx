import { videos } from "../data/videos";

export default function SearchResults({ query, onSelect }) {
    // Filtrage instantané
    const results = videos.filter((v) =>
        v.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div
            className="
                absolute top-12 left-0 w-full 
                bg-zinc-900/95 border border-white/10 
                rounded-xl shadow-xl z-50
                max-h-80 overflow-y-auto
            "
        >
            {results.length === 0 && (
                <p className="p-3 text-gray-400 text-sm">Aucun résultat</p>
            )}

            {results.map((video) => (
                <div
                    key={video.id}
                    onClick={() => onSelect(video.id)}
                    className="
                        flex items-center gap-3 p-3 cursor-pointer
                        hover:bg-white/10 transition
                    "
                >
                    {/* Miniature */}
                    <img
                        src={video.thumbnail}
                        className="w-20 h-12 rounded object-cover"
                    />

                    {/* Infos */}
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{video.title}</span>
                        <span className="text-xs text-gray-400">{video.channel}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
