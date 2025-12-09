import { useState, useRef } from "react";
import { videos } from "../data/videos.js";
import VideoCard from "../components/VideoCard";
import ShortCard from "../components/ShortCard";
import ShortViewer from "../components/ShortViewer";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [currentCategory, setCurrentCategory] = useState("Tout");
    const [openShort, setOpenShort] = useState(null);
    const sliderRef = useRef(null);
    const navigate = useNavigate();

    const categories = [
        "Tout",
        "Voyage",
        "Nature",
        "Mode",
        "Culture",
        "Sport",
        "Food",
        "Inspiration"
        
    ];

    const categoryMap = {
        1: "Voyage", 2: "Culture", 3: "Mode", 4: "Nature", 5: "Nature",
        6: "Culture", 7: "Inspiration", 8: "Voyage", 9: "Voyage", 10: "Nature",
        21: "Nature", 22: "Inspiration", 23: "Food", 24: "Inspiration",
        25: "Sport", 26: "Food", 27: "Voyage", 28: "Voyage", 29: "Voyage", 30: "Sport"
    };

    const shorts = videos.filter(v => v.isShort);
    const regularVideos = videos.filter(v =>
        currentCategory === "Tout" ? true : categoryMap[v.id] === currentCategory
    );

    // Scroll control
    const scrollShorts = (direction) => {
        if (!sliderRef.current) return;
        const cardWidth = 170; // largeur ShortCard (~150px + gap)
        sliderRef.current.scrollBy({
            left: direction === "right" ? cardWidth : -cardWidth,
            behavior: "smooth",
        });
    };

    return (
        <div className="px-4 sm:px-6 lg:px-10 py-4 text-white">

            {/* ▬▬▬ CATEGORIES ▬▬▬ */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-3">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setCurrentCategory(cat)}
                        className={`
                            px-4 py-2 rounded-full text-sm whitespace-nowrap transition
                            ${currentCategory === cat
                                ? "bg-white text-black font-semibold shadow-lg"
                                : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"}
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* ▬▬▬ SHORTS SECTION ▬▬▬ */}
            <h2 className="text-lg font-semibold mt-4 mb-2">Shoorties</h2>

            {/* 📱 MOBILE : afficher 3 sur 8 */}
            <div className="grid grid-cols-3 gap-4 sm:hidden">
                {shorts.slice(0, 3).map((s, index) => (
                    <ShortCard
                        key={s.id}
                        video={s}
                        onClick={() => setOpenShort(index)}
                    />
                ))}
            </div>

            {/* 🖥️ DESKTOP : slider avec 8 shorts */}
            <div className="relative hidden sm:block mt-2">

                {/* Bouton gauche */}
                <button
                    onClick={() => scrollShorts("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 
        bg-black/40 hover:bg-black/60 p-3 rounded-full z-10"
                >
                    ‹
                </button>

                {/* SLIDER (8 SHORTS MAX) */}
                <div
                    ref={sliderRef}
                    className="
            flex overflow-x-auto no-scrollbar scroll-smooth 
            gap-6 pb-4 px-1
        "
                    style={{ scrollSnapType: "x mandatory" }}
                >
                    {shorts.slice(0, 8).map((s, index) => (
                        <div
                            key={s.id}
                            className="shrink-0"
                            style={{
                                scrollSnapAlign: "start",
                                width: "160px",
                            }}
                        >
                            <ShortCard
                                video={s}
                                onClick={() => setOpenShort(index)}
                            />
                        </div>
                    ))}
                </div>

                {/* Bouton droite */}
                <button
                    onClick={() => scrollShorts("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 
        bg-black/40 hover:bg-black/60 p-3 rounded-full z-10"
                >
                    ›
                </button>
            </div>

            {/* Short Viewer */}
            {openShort !== null && (
                <ShortViewer
                    videos={shorts.slice(0, 8)} // ⭐ IMPORTANT : seulement 8 shorts
                    index={openShort}
                    onClose={() => setOpenShort(null)}
                    onChange={(i) => setOpenShort(i)}
                />
            )}



            {/* SHORT VIEWER FULLSCREEN */}
            {openShort !== null && (
                <ShortViewer
                    videos={shorts}
                    index={openShort}
                    onClose={() => setOpenShort(null)}
                    onChange={(i) => setOpenShort(i)}
                />
            )}

            {/* ▬▬▬ VIDEOS SECTION ▬▬▬ */}
            <h2 className="text-lg font-semibold mt-6 mb-4">Vidéos recommandées</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {regularVideos.map(video => (
                    <VideoCard
                        key={video.id}
                        video={video}
                        onClick={() => navigate(`/video/${video.id}`)}
                    />
                ))}
            </div>

        </div>
    );
}
