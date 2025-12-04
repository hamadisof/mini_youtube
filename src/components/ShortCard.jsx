export default function ShortCard({ video, onClick }) {
    return (
        <div
            onClick={onClick}
            className="
                w-[120px] sm:w-[140px] md:w-[150px]
                flex-shrink-0 
                cursor-pointer 
                rounded-xl 
                overflow-hidden 
                bg-zinc-900 
                hover:bg-zinc-800 
                transition-all
            "
        >
            <div className="w-full h-[230px] sm:h-[250px] md:h-[260px] rounded-xl overflow-hidden">
                <img
                    src={video.thumbnail}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="mt-2 px-1 pb-3">
                <h3 className="text-sm font-semibold line-clamp-1">{video.title}</h3>
                <p className="text-xs text-gray-400">{video.channel}</p>
            </div>
        </div>
    );
}
