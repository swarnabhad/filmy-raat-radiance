export function FilmGrain() {
  return (
    <>
      <div className="film-grain" aria-hidden="true" />
      <div className="vignette-screen" aria-hidden="true" />
    </>
  );
}

export function FilmStrip({ className = "" }: { className?: string }) {
  return <div className={`film-strip w-full ${className}`} aria-hidden="true" />;
}

export function CinemaBackground() {
  const dust = Array.from({ length: 14 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* projector beam */}
      <div
        className="absolute -top-24 left-1/2 h-[70vh] w-[75vw] -translate-x-1/2 opacity-45"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 0%, transparent 42%, oklch(0.86 0.09 82 / 0.32) 50%, transparent 58%)",
          filter: "blur(14px)",
        }}
      />
      {/* curtains */}
      <div className="curtain-left absolute inset-y-0 left-0 w-[18vw] max-w-40 opacity-80 [mask-image:linear-gradient(to_right,black,transparent)]" />
      <div className="curtain-left absolute inset-y-0 right-0 w-[18vw] max-w-40 opacity-80 [mask-image:linear-gradient(to_left,black,transparent)]" />
      {/* scalloped curtain top */}
      <div
        className="absolute inset-x-0 top-0 h-16 opacity-70"
        style={{
          background:
            "repeating-radial-gradient(circle at 40px 0, oklch(0.28 0.1 19) 0 34px, transparent 34px 40px)",
        }}
      />
      {/* light leaks */}
      <div className="light-leak left-[-10%] top-[10%] h-72 w-72 rounded-full bg-ember/25" />
      <div
        className="light-leak right-[-8%] top-[35%] h-80 w-80 rounded-full bg-gold/20"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="light-leak bottom-[-10%] left-[30%] h-72 w-96 rounded-full bg-accent/20"
        style={{ animationDelay: "-11s" }}
      />
      {/* dust particles */}
      {dust.map((i) => (
        <span
          key={i}
          className="absolute bottom-0 h-1 w-1 rounded-full bg-cream/50"
          style={{
            left: `${(i * 7 + 6) % 96}%`,
            animation: `dust-rise ${16 + (i % 5) * 4}s linear ${i * 1.4}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
