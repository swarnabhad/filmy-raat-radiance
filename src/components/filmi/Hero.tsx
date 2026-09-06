import { Play } from "lucide-react";
import { siteConfig } from "@/data/site";
import { useMusic } from "@/context/MusicContext";
import { CinemaBackground } from "./CinemaBackground";
import { VinylRecord } from "./VinylRecord";
import { NowPlaying, OnAir } from "./NowPlaying";

export function Hero() {
  const { isStarted, isPlaying, isBuffering, enter } = useMusic();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pb-16 pt-24"
    >
      <CinemaBackground />

      <div className="relative w-full max-w-3xl text-center">
        <div className="flex justify-center">
          <OnAir live={isPlaying} />
        </div>

        <h1 className="mt-5 font-display text-[3.1rem] leading-[1.05] text-gold-gradient sm:text-7xl">
          {siteConfig.nameHi}
        </h1>
        <p className="mt-3 text-marquee text-[0.62rem] text-cream/80 sm:text-xs">
          {siteConfig.station}
        </p>

        <div className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        <p className="mt-5 font-display text-base leading-relaxed text-cream/90 sm:text-xl">
          {siteConfig.taglineHi}
        </p>
        <p className="mt-2 font-serif text-sm italic text-muted-foreground">
          {siteConfig.taglineEn}
        </p>

        <div className="mt-8">
          <VinylRecord />
        </div>

        {isStarted ? (
          <div className="mt-8">
            <NowPlaying />
          </div>
        ) : (
          <button
            type="button"
            onClick={enter}
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-gold to-ember px-8 py-4 font-serif text-[0.72rem] tracking-[0.32em] uppercase text-primary-foreground shadow-lamp transition-transform hover:scale-[1.04] active:scale-95 sm:px-10"
          >
            <Play className="h-4 w-4" aria-hidden="true" />
            Enter Filmi Raat
          </button>
        )}

        {isStarted ? (
          <a
            href="#player"
            className="mt-6 inline-block font-serif text-[0.62rem] tracking-[0.3em] uppercase text-gold/80 hover:text-gold"
          >
            {isBuffering && !isPlaying ? "Threading the reel…" : "Open the player ↓"}
          </a>
        ) : (
          <p className="mt-5 text-[0.68rem] text-muted-foreground">
            Streamed through YouTube&apos;s official player. Headphones recommended.
          </p>
        )}
      </div>
    </section>
  );
}
