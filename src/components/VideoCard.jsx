import { useRef, useState } from "react";

export default function VideoCard({ video, onClick }) {
    const videoRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
        const v = videoRef.current;
        if (v) {
            v.currentTime = 0;
            v.play();
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        const v = videoRef.current;
        if (v) v.pause();
    };

    return (
        <div
            onClick={onClick}
            className="
    group cursor-pointer rounded-xl overflow-hidden
    bg-zinc-900/40 backdrop-blur-sm
    hover:bg-zinc-800/50 transition
    border border-transparent hover:border-white/10
    hover:shadow-[0_0_20px_rgba(255,255,255,0.07)]
    w-full
  "
        >

            {/* VIDEO / THUMBNAIL */}
            <div
                className="relative w-full aspect-video overflow-hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className={`
            w-full h-full object-cover transition-opacity duration-300
            ${isHovering ? "opacity-0" : "opacity-100"}
          `}
                />

                <video
                    ref={videoRef}
                    muted
                    className={`
            absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300
            ${isHovering ? "opacity-100" : "opacity-0"}
          `}
                >
                    <source src={video.src} type="video/mp4" />
                </video>
            </div>

            {/* INFOS VIDEO */}
            <div className="flex items-start gap-3 p-3">
                <img
                    src={video.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                />

                <div className="flex flex-col text-left">
                    <h3 className="font-semibold text-[15px] leading-tight group-hover:text-white">
                        {video.title}
                    </h3>
                    <p className="text-sm text-gray-400">{video.channel}</p>
                    <p className="text-xs text-gray-500">{video.views}</p>
                </div>
            </div>
        </div>
    );
}
