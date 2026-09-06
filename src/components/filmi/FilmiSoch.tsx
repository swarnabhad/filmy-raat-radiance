import { useEffect, useState } from "react";
import { Film } from "lucide-react";
import { quotes, reelMessages } from "@/data/site";

function playReelSound() {
  try {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    // original generic projector-click blip
    for (let i = 0; i < 3; i += 1) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = 220 - i * 40;
      gain.gain.setValueAtTime(0.0001, now + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.06, now + i * 0.09 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.09 + 0.08);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + i * 0.09);
      osc.stop(now + i * 0.09 + 0.1);
    }
    window.setTimeout(() => void ctx.close(), 800);
  } catch {
    /* audio unavailable */
  }
}

export function FilmiSoch() {
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % quotes.length), 6500);
    return () => window.clearInterval(id);
  }, []);

  const onReel = () => {
    playReelSound();
    setSpin(true);
    window.setTimeout(() => setSpin(false), 900);
    let next = message;
    while (next === message) next = reelMessages[Math.floor(Math.random() * reelMessages.length)]!;
    setMessage(next);
  };

  return (
    <section className="container-cinema py-16 text-center">
      <h2 className="font-serif text-[0.7rem] tracking-[0.4em] text-muted-foreground">
        FILMI SOCH
      </h2>

      <div className="mx-auto mt-6 flex min-h-[6rem] max-w-2xl items-center justify-center">
        <p
          key={index}
          className="animate-title-in font-display text-xl leading-relaxed text-cream sm:text-2xl"
        >
          {quotes[index]}
        </p>
      </div>

      <button
        type="button"
        onClick={onReel}
        className="mt-6 inline-flex items-center gap-3 rounded-full border border-gold/40 bg-burgundy-deep/60 px-6 py-3 font-serif text-[0.7rem] tracking-[0.3em] uppercase text-gold transition-transform hover:scale-[1.03] active:scale-95"
      >
        <Film className={`h-4 w-4 ${spin ? "animate-vinyl" : ""}`} aria-hidden="true" />
        REEL CHALAO
      </button>

      <div className="mt-4 min-h-[1.5rem]" aria-live="polite">
        {message ? (
          <p key={message} className="animate-title-in font-serif text-sm italic text-ember">
            {message}
          </p>
        ) : null}
      </div>
    </section>
  );
}
