import { goldenEra } from "@/data/site";

const gradients = [
  "linear-gradient(150deg, oklch(0.34 0.12 22), oklch(0.16 0.04 24))",
  "linear-gradient(150deg, oklch(0.32 0.1 55), oklch(0.15 0.03 30))",
  "linear-gradient(150deg, oklch(0.3 0.11 12), oklch(0.14 0.03 22))",
  "linear-gradient(150deg, oklch(0.33 0.09 70), oklch(0.15 0.03 28))",
  "linear-gradient(150deg, oklch(0.28 0.1 340), oklch(0.14 0.03 25))",
  "linear-gradient(150deg, oklch(0.31 0.1 40), oklch(0.15 0.04 20))",
];

export function GoldenEra() {
  return (
    <section className="container-cinema py-16">
      <header className="text-center">
        <h2 className="font-display text-3xl text-gold-gradient sm:text-4xl">THE GOLDEN ERA</h2>
        <p className="mt-2 font-serif text-sm italic text-muted-foreground">
          Songs that refuse to grow old.
        </p>
      </header>

      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
        {goldenEra.map((card, i) => (
          <li key={card.title}>
            <article className="group relative overflow-hidden rounded-lg border border-gold/25 p-1.5 transition-transform duration-500 hover:-translate-y-1">
              <div
                className="relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded p-3 sm:p-4"
                style={{ backgroundImage: gradients[i % gradients.length] }}
              >
                {/* abstract original poster art */}
                <span
                  className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full border border-gold/30"
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute left-[-15%] top-[18%] h-24 w-40 rotate-12 bg-gold/10 blur-xl"
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute inset-x-0 top-1/3 h-px bg-gold/40"
                  aria-hidden="true"
                />
                <span className="font-serif text-[0.55rem] tracking-[0.3em] text-gold/80">
                  {card.year}
                </span>
                <h3 className="font-display text-base leading-tight text-cream sm:text-lg">
                  {card.title}
                </h3>
                <p className="mt-1 text-[0.68rem] leading-snug text-cream/70">{card.note}</p>
                <span
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_20%,transparent_45%,oklch(0.08_0.02_25/0.7)_100%)]"
                  aria-hidden="true"
                />
              </div>
            </article>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-center text-[0.68rem] text-muted-foreground">
        Original mood artwork. These are fictional titles, not real films.
      </p>
    </section>
  );
}
