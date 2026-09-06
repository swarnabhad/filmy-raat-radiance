import { useMusic } from "@/context/MusicContext";

export function VinylRecord() {
  const { isPlaying, isBuffering, currentThumbnail, isStarted } = useMusic();

  const spinClass = isPlaying
    ? "animate-vinyl"
    : isBuffering
      ? "animate-vinyl-slow"
      : "[animation-play-state:paused]";

  return (
    <div className="relative mx-auto aspect-square w-[68vw] max-w-[340px] sm:max-w-[380px]">
      {/* warm halo */}
      <div className="absolute inset-0 -z-10 rounded-full bg-ember/20 blur-3xl" />

      <div
        className={`relative h-full w-full rounded-full ${spinClass}`}
        style={{
          background:
            "repeating-radial-gradient(circle at 50% 50%, oklch(0.14 0.012 25) 0 3px, oklch(0.19 0.016 25) 3px 5px)",
          boxShadow:
            "0 0 0 1px oklch(0.78 0.13 78 / 0.25), inset 0 0 60px oklch(0 0 0 / 0.6), 0 30px 80px -40px oklch(0.05 0 0 / 0.9)",
        }}
      >
        {/* light sweep */}
        <div
          className="absolute inset-0 rounded-full opacity-60"
          style={{
            background:
              "conic-gradient(from 210deg, transparent 0deg, oklch(0.9 0.06 84 / 0.16) 34deg, transparent 78deg, transparent 200deg, oklch(0.9 0.06 84 / 0.1) 236deg, transparent 280deg)",
          }}
        />
        {/* label */}
        <div className="absolute inset-[32%] overflow-hidden rounded-full border border-gold/40 bg-burgundy shadow-[inset_0_0_24px_oklch(0_0_0/0.45)]">
          {currentThumbnail && isStarted ? (
            <img
              src={currentThumbnail}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-35 saturate-50"
            />
          ) : null}
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-0.5 text-center">
            <span className="font-serif text-[0.55rem] tracking-[0.3em] text-gold/80">
              LONG PLAY
            </span>
            <span className="font-display text-sm leading-none text-cream sm:text-base">
              FILMI RAAT
            </span>
            <span className="font-serif text-[0.5rem] tracking-[0.25em] text-gold/70">
              33⅓ RPM
            </span>
          </div>
        </div>
        {/* spindle */}
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-[0_0_0_2px_oklch(0.78_0.13_78/0.4)]" />
      </div>

      {/* tonearm */}
      <div
        className="absolute -right-2 top-6 h-40 w-1.5 origin-top rounded-full bg-gradient-to-b from-gold/70 to-muted-foreground/40 transition-transform duration-700"
        style={{ transform: `rotate(${isPlaying ? 22 : 6}deg)` }}
        aria-hidden="true"
      >
        <span className="absolute -bottom-1.5 -left-1 h-3 w-3.5 rounded-sm bg-cream/70" />
      </div>
    </div>
  );
}
