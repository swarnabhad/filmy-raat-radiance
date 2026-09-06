import { useEffect, useState } from "react";
import { useMusic } from "@/context/MusicContext";

export function OnAir({ live }: { live: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-burgundy-deep/70 px-3 py-1">
      <span
        className={`h-2 w-2 rounded-full ${live ? "bg-destructive [animation:onair-pulse_1.8s_ease-in-out_infinite]" : "bg-muted-foreground/60"}`}
        aria-hidden="true"
      />
      <span className="font-serif text-[0.65rem] tracking-[0.3em] text-gold">ON AIR</span>
    </span>
  );
}

export function NowPlaying({ compact = false }: { compact?: boolean }) {
  const { currentTitle, currentChannel, isStarted, isPlaying, isBuffering } = useMusic();
  const [shown, setShown] = useState(currentTitle);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (currentTitle === shown) return;
    setVisible(false);
    const id = window.setTimeout(() => {
      setShown(currentTitle);
      setVisible(true);
    }, 260);
    return () => window.clearTimeout(id);
  }, [currentTitle, shown]);

  const status = !isStarted
    ? "Waiting for you to press play"
    : isBuffering && !shown
      ? "Tuning in…"
      : "Retro Bollywood Radio";

  return (
    <div
      className={`mx-auto w-full ${compact ? "" : "max-w-xl"} text-center`}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-center justify-center gap-3">
        <OnAir live={isPlaying} />
        <span className="font-serif text-[0.65rem] tracking-[0.3em] text-muted-foreground">
          NOW PLAYING
        </span>
      </div>
      <div className={`${compact ? "min-h-[3rem]" : "min-h-[4.5rem]"} mt-3 flex items-center justify-center`}>
        <p
          className={`clamp-2 font-serif ${compact ? "text-base" : "text-xl sm:text-2xl"} leading-snug text-cream transition-all duration-300 ${
            visible ? "translate-y-0 opacity-100 blur-0" : "translate-y-1 opacity-0 blur-sm"
          }`}
        >
          {shown ? `“${shown}”` : "—"}
        </p>
      </div>
      <p className="mt-1 text-xs tracking-wide text-muted-foreground">
        {currentChannel && isStarted ? currentChannel : status}
      </p>
    </div>
  );
}
