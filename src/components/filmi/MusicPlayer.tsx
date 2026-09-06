import { useRef } from "react";
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { formatTime, useMusic } from "@/context/MusicContext";
import { NowPlaying } from "./NowPlaying";

export function MusicPlayer() {
  const music = useMusic();
  const barRef = useRef<HTMLDivElement | null>(null);
  const { currentTime, duration, isPlaying, isStarted, currentThumbnail } = music;
  const pct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const seekFromEvent = (clientX: number) => {
    const el = barRef.current;
    if (!el || duration <= 0) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    music.seek(ratio * duration);
  };

  return (
    <section id="player" aria-label="Filmi Raat player" className="container-cinema py-14">
      <div className="panel-vintage relative mx-auto max-w-3xl rounded-xl p-5 sm:p-8">
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* vintage cinema frame thumbnail */}
          <div className="relative mx-auto w-40 shrink-0 sm:mx-0">
            <div className="relative overflow-hidden rounded-md border border-gold/40 bg-burgundy-deep p-1.5">
              <div className="relative aspect-square overflow-hidden rounded">
                {currentThumbnail && isStarted ? (
                  <img
                    src={currentThumbnail}
                    alt="Current track artwork from YouTube"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-secondary/60">
                    <span className="font-display text-sm text-gold/70">फ़िल्मी रात</span>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_40%,transparent_45%,oklch(0.1_0.02_25/0.65)_100%)] mix-blend-multiply" />
                <div className="pointer-events-none absolute inset-0 bg-ember/15" />
              </div>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <NowPlaying compact />

            {/* progress */}
            <div className="mt-5">
              <div
                ref={barRef}
                role="slider"
                tabIndex={0}
                aria-label="Seek"
                aria-valuemin={0}
                aria-valuemax={Math.round(duration)}
                aria-valuenow={Math.round(currentTime)}
                aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
                onClick={(e) => seekFromEvent(e.clientX)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") music.seek(Math.min(duration, currentTime + 5));
                  if (e.key === "ArrowLeft") music.seek(Math.max(0, currentTime - 5));
                }}
                className="group h-6 cursor-pointer touch-manipulation py-2.5"
              >
                <div className="relative h-1 rounded-full bg-secondary">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-ember to-gold"
                    style={{ width: `${pct}%` }}
                  />
                  <span
                    className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ left: `${pct}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>
              <div className="flex justify-between font-serif text-[0.65rem] tracking-[0.2em] text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* controls */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <button
                type="button"
                onClick={music.previous}
                aria-label="Previous song"
                className="grid h-12 w-12 place-items-center rounded-full border border-gold/30 text-cream transition-colors hover:border-gold hover:text-gold"
              >
                <SkipBack className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => (isStarted ? music.toggle() : music.enter())}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-b from-gold to-ember text-primary-foreground shadow-lamp transition-transform hover:scale-105"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>
              <button
                type="button"
                onClick={music.next}
                aria-label="Next song"
                className="grid h-12 w-12 place-items-center rounded-full border border-gold/30 text-cream transition-colors hover:border-gold hover:text-gold"
              >
                <SkipForward className="h-5 w-5" />
              </button>

              <div className="ml-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={music.toggleMute}
                  aria-label={music.isMuted ? "Unmute" : "Mute"}
                  className="grid h-11 w-11 place-items-center rounded-full border border-gold/25 text-cream/90 hover:text-gold"
                >
                  {music.isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={music.isMuted ? 0 : music.volume}
                  onChange={(e) => music.setVolume(Number(e.target.value))}
                  aria-label="Volume"
                  className="h-1 w-24 accent-[var(--gold)]"
                />
              </div>
            </div>
          </div>
        </div>

        {music.error ? (
          <div className="mt-6 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-cream">
            <span>{music.error}</span>
            <button
              type="button"
              onClick={music.dismissError}
              className="ml-3 font-serif text-[0.65rem] tracking-[0.2em] uppercase text-gold underline"
            >
              Dismiss
            </button>
          </div>
        ) : null}

        <p className="mt-6 text-center text-[0.68rem] leading-relaxed text-muted-foreground">
          Music plays through YouTube&apos;s official embedded player. Filmi Raat does not host or
          own any music or artwork.
        </p>
      </div>
    </section>
  );
}
