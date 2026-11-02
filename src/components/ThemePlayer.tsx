import { useState, useRef } from "react";
import { Play, Pause, Music } from "lucide-react";
import themeAudio from "@/assets/party-wreckers-theme.mp3";

const ThemePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/70 border border-border backdrop-blur-sm">
      <audio ref={audioRef} src={themeAudio} preload="none" onEnded={handleEnded} onPause={() => setIsPlaying(false)} />
      <Music className="w-4 h-4 text-primary" />
      <span className="text-sm text-muted-foreground font-medium">The Party Wreckers Theme</span>
      <button
        onClick={togglePlay}
        className="w-8 h-8 rounded-full bg-burgundy flex items-center justify-center hover:bg-burgundy/90 transition-colors"
        aria-label={isPlaying ? "Pause theme" : "Play theme"}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 text-white" />
        ) : (
          <Play className="w-4 h-4 text-white ml-0.5" />
        )}
      </button>
    </div>
  );
};

export default ThemePlayer;
