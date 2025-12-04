import { useEffect } from "react";
import {
    X,
    ChevronLeft,
    ChevronRight,
    ThumbsUp,
    ThumbsDown,
    MessageCircle,
    Share2,
    MoreVertical,
} from "lucide-react";

export default function ShortViewer({ videos, index, onClose, onChange }) {
    const video = videos[index];

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    if (!video) return null;

    return (
        <div
            className="
        fixed inset-0 z-50 
        bg-black/70 backdrop-blur-xl
        flex items-center justify-center
        px-3
      "
        >
            <button
                onClick={onClose}
                className="
          absolute top-6 right-8 
          text-white hover:scale-110 
          transition-transform
        "
            >
                <X size={34} />
            </button>

            {index > 0 && (
                <button
                    onClick={() => onChange(index - 1)}
                    className="
            absolute left-3 sm:left-8 
            text-white opacity-70 
            hover:opacity-100 transition
          "
                >
                    <ChevronLeft size={48} />
                </button>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                {/* VIDEO */}
                <div className="w-[260px] sm:w-[330px] md:w-[380px] lg:w-[420px]">
                    <div className="aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-black">
                        <video
                            src={video.src}
                            autoPlay
                            loop
                            playsInline
                            controls
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="mt-3 text-center">
                        <h1 className="text-sm font-semibold">{video.title}</h1>

                        <div className="flex justify-center items-center gap-2 mt-1">
                            <img
                                src={video.avatar}
                                alt="avatar"
                                className="w-7 h-7 rounded-full"
                            />
                            <p className="text-xs text-gray-300">{video.channel}</p>
                        </div>
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-row sm:flex-col items-center gap-4 sm:gap-6 text-white w-auto sm:w-20">

                    <div className="flex flex-col items-center">
                        <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                            <ThumbsUp size={26} />
                        </button>
                        <span className="text-xs opacity-70">{video.likes}</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                            <ThumbsDown size={26} />
                        </button>
                        <span className="text-xs opacity-70">{video.dislikes}</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                            <MessageCircle size={26} />
                        </button>
                        <span className="text-xs opacity-70">Commentaires</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                            <Share2 size={26} />
                        </button>
                        <span className="text-xs opacity-70">Partager</span>
                    </div>

                    <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                        <MoreVertical size={26} />
                    </button>
                </div>
            </div>

            {index < videos.length - 1 && (
                <button
                    onClick={() => onChange(index + 1)}
                    className="
            absolute right-3 sm:right-8 text-white 
            opacity-70 hover:opacity-100 transition
          "
                >
                    <ChevronRight size={48} />
                </button>
            )}
        </div>
    );
}
