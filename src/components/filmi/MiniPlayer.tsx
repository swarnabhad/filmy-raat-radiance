import { Pause, Play } from "lucide-react";
import { useMusic } from "@/context/MusicContext";

export function MiniPlayer() {
  const { isStarted, isPlaying, currentTitle, currentThumbnail, toggle, currentTime, duration } =
    useMusic();
  if (!isStarted) return null;
  const pct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3">
      <div className="panel-vintage mx-auto flex max-w-3xl items-center gap-3 overflow-hidden rounded-lg p-2 pr-3 backdrop-blur">
        <a
          href="#player"
          aria-label="Open the full Filmi Raat player"
          className="flex min-w-0 flex-1 items-center gap-3"
        >
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded border border-gold/40">
            {currentThumbnail ? (
              <img src={currentThumbnail} alt="" aria-hidden="true" className="h-full w-full object-cover" />
            ) : (
              <span className="grid h-full w-full place-items-center bg-secondary text-[0.6rem] text-gold">
                FR
              </span>
            )}
          </span>
          <span className="min-w-0">
            <span className="block font-serif text-[0.6rem] tracking-[0.25em] text-gold">
              ON AIR
            </span>
            <span className="clamp-1 block text-xs text-cream">{currentTitle || "Tuning in…"}</span>
          </span>
        </a>
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-b from-gold to-ember text-primary-foreground"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-secondary">
          <span className="block h-full bg-gold/80" style={{ width: `${pct}%` }} />
        </span>
      </div>
    </div>
  );
}
