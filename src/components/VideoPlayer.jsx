export default function VideoPlayer({ src }) {
    return (
        <video controls className="w-full rounded-xl bg-black max-h-[70vh]">
            <source src={src} type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo HTML5.
        </video>
    );
}
