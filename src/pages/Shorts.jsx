// src/pages/Shorts.jsx
import { useEffect, useRef, useState } from "react";
import { videos } from "../data/videos.js";
import {
    ThumbsUp,
    ThumbsDown,
    MessageCircle,
    Share2,
    MoreVertical,
} from "lucide-react";

const STORAGE_KEY = "shorts_reactions";

export default function Shorts() {
    const shorts = videos.filter((v) => v.isShort);
    const videoRefs = useRef([]);

    // likes/dislikes + réaction utilisateur : { [id]: { likes, dislikes, reaction } }
    const [reactions, setReactions] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);

        // init à 0 pour chaque short
        const base = {};
        shorts.forEach((s) => {
            base[s.id] = { likes: 0, dislikes: 0, reaction: null };
        });
        return base;
    });

    // Sauvegarde dans localStorage à chaque changement
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reactions));
    }, [reactions]);

    // Auto-play de la short visible, pause des autres
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target;
                    if (entry.isIntersecting) {
                        video
                            .play()
                            .catch(() => {
                                /* certains navigateurs bloquent parfois */
                            });
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.7 }
        );

        videoRefs.current.forEach((video) => {
            if (video) observer.observe(video);
        });

        return () => observer.disconnect();
    }, []);

    const handleLike = (id) => {
        setReactions((prev) => {
            const current = prev[id] || { likes: 0, dislikes: 0, reaction: null };
            let { likes, dislikes, reaction } = current;

            if (reaction === "like") {
                // on retire le like
                likes = Math.max(0, likes - 1);
                reaction = null;
            } else if (reaction === "dislike") {
                // on enlève le dislike et on ajoute un like
                dislikes = Math.max(0, dislikes - 1);
                likes += 1;
                reaction = "like";
            } else {
                // aucune réaction -> +1 like
                likes += 1;
                reaction = "like";
            }

            return {
                ...prev,
                [id]: { likes, dislikes, reaction },
            };
        });
    };

    const handleDislike = (id) => {
        setReactions((prev) => {
            const current = prev[id] || { likes: 0, dislikes: 0, reaction: null };
            let { likes, dislikes, reaction } = current;

            if (reaction === "dislike") {
                // on retire le dislike
                dislikes = Math.max(0, dislikes - 1);
                reaction = null;
            } else if (reaction === "like") {
                // on enlève le like et on ajoute un dislike
                likes = Math.max(0, likes - 1);
                dislikes += 1;
                reaction = "dislike";
            } else {
                // aucune réaction -> +1 dislike
                dislikes += 1;
                reaction = "dislike";
            }

            return {
                ...prev,
                [id]: { likes, dislikes, reaction },
            };
        });
    };

    return (
        <div className="h-[calc(100vh-4rem)] overflow-y-auto snap-y snap-mandatory bg-black">
            {shorts.map((s, index) => {
                const stats = reactions[s.id] || {
                    likes: 0,
                    dislikes: 0,
                    reaction: null,
                };

                return (
                    <section
                        key={s.id}
                        className="snap-start h-[calc(100vh-4rem)] flex items-center justify-center"
                    >
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            {/* VIDEO 9:16 plein cadre */}
                            <video
                                ref={(el) => (videoRefs.current[index] = el)}
                                src={s.src}
                                muted
                                loop
                                playsInline
                                className="w-[260px] sm:w-[320px] md:w-[360px] aspect-[9/16] rounded-2xl object-cover bg-black shadow-2xl"
                            />

                            {/* Infos + actions */}
                            <div className="flex flex-row sm:flex-col items-center sm:items-center gap-4 text-white text-xs">
                                {/* Titre + chaîne */}
                                <div className="text-left sm:text-center sm:mb-4">
                                    <p className="text-sm font-semibold mb-1">{s.title}</p>
                                    <p className="text-xs text-gray-400">{s.channel}</p>
                                </div>

                                {/* Boutons d'actions */}
                                <div className="flex sm:flex-col gap-4 sm:gap-3 items-center">
                                    <button
                                        className="flex flex-col items-center"
                                        onClick={() => handleLike(s.id)}
                                    >
                                        <ThumbsUp
                                            className={
                                                stats.reaction === "like" ? "text-blue-400" : ""
                                            }
                                        />
                                        <span className="mt-1">{stats.likes}</span>
                                    </button>

                                    <button
                                        className="flex flex-col items-center"
                                        onClick={() => handleDislike(s.id)}
                                    >
                                        <ThumbsDown
                                            className={
                                                stats.reaction === "dislike" ? "text-red-400" : ""
                                            }
                                        />
                                        <span className="mt-1">{stats.dislikes}</span>
                                    </button>

                                    <button className="flex flex-col items-center">
                                        <MessageCircle />
                                        <span className="mt-1">Commentaires</span>
                                    </button>

                                    <button className="flex flex-col items-center">
                                        <Share2 />
                                        <span className="mt-1">Partager</span>
                                    </button>

                                    <button className="flex flex-col items-center">
                                        <MoreVertical />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
