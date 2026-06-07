import { useRef, useState } from "react";
import Image from "next/image";
import ImgCover from "@/public/assets/Coursess.png";
import IconsPlay from "@/public/assets/Icon.svg";
import { Maximize, Pause } from "lucide-react";

interface VideoPlayersProps {
    src: string;
    cover?: string | null;
}

const VideoPlayers: React.FC<VideoPlayersProps> = ({ src, cover }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const handleFullscreen = () => {
        if (!containerRef.current) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            containerRef.current.requestFullscreen();
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[260px] rounded-3xl overflow-hidden bg-black shadow-2xl group"
        >
            {/* COVER */}
            {!isPlaying && (
                <>
                    <Image
                        src={cover || ImgCover}
                        fill
                        alt="Video cover"
                        className="object-cover scale-105"
                    />

                    {/* cinematic overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />

                    {/* play button */}
                    <button
                        onClick={togglePlay}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl transition group-hover:scale-110">
                            <Image src={IconsPlay} alt="Play" width={34} height={34} />
                        </div>
                    </button>
                </>
            )}

            {/* VIDEO */}
            <video
                ref={videoRef}
                src={src}
                className={`w-full h-full ${isPlaying ? "block" : "hidden"
                    } object-contain bg-black`}
                playsInline
                onClick={togglePlay}
                onEnded={() => setIsPlaying(false)}
            />

            {/* CONTROLS */}
            {isPlaying && (
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    {/* pause */}
                    <button
                        onClick={togglePlay}
                        className="bg-black/60 backdrop-blur text-white p-2 rounded-full"
                    >
                        <Pause size={18} />
                    </button>

                    {/* fullscreen */}
                    <button
                        onClick={handleFullscreen}
                        className="bg-black/60 backdrop-blur text-white p-2 rounded-full"
                    >
                        <Maximize size={18} />
                    </button>
                </div>
            )}

            {/* hint */}
            {isPlaying && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition">
                    کلیک برای توقف
                </div>
            )}
        </div>
    );
};

export default VideoPlayers;
