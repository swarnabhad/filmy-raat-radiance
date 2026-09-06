import { useState } from "react";
import { Check, Copy, Heart, Minus, Plus, QrCode, X } from "lucide-react";
import { faqs, siteConfig } from "@/data/site";
import { FilmStrip } from "./CinemaBackground";

export function Dedication() {
  return (
    <section className="relative py-20">
      <FilmStrip className="opacity-40" />
      <div className="container-cinema mt-14 text-center">
        <h2 className="font-serif text-[0.7rem] tracking-[0.4em] text-gold">
          {siteConfig.dedication.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-serif text-lg leading-relaxed text-cream/90 sm:text-xl">
          {siteConfig.dedication.body}
        </p>
        <p className="mt-6 font-display text-xl text-gold-gradient sm:text-2xl">
          {siteConfig.dedication.closing}
        </p>
      </div>
      <FilmStrip className="mt-14 opacity-40" />
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="container-cinema py-16">
      <div className="panel-vintage mx-auto max-w-2xl rounded-xl p-7 text-center sm:p-10">
        <h2 className="font-display text-2xl text-gold-gradient sm:text-3xl">ABOUT FILMI RAAT</h2>
        {siteConfig.about.map((line) => (
          <p key={line} className="mt-4 text-sm leading-relaxed text-cream/85 sm:text-base">
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}

export function Support() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.support.upiId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="support" className="container-cinema py-16 text-center">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-3 rounded-full bg-gradient-to-b from-gold to-ember px-7 py-4 font-serif text-[0.72rem] tracking-[0.3em] uppercase text-primary-foreground shadow-lamp transition-transform hover:scale-[1.03]"
      >
        <Heart className="h-4 w-4" aria-hidden="true" />
        {siteConfig.support.heading}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={siteConfig.support.modalTitle}
          className="fixed inset-0 z-[70] grid place-items-center bg-ink/80 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="panel-vintage relative w-full max-w-md rounded-xl p-6 text-left sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-muted-foreground hover:text-gold"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="font-display text-xl text-gold-gradient">
              {siteConfig.support.modalTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/85">{siteConfig.support.body}</p>

            <div className="mt-6 grid place-items-center rounded-lg border border-gold/30 bg-burgundy-deep/60 p-5">
              <div className="grid h-28 w-28 place-items-center rounded-md border border-dashed border-gold/40 text-gold/70">
                <QrCode className="h-10 w-10" aria-hidden="true" />
              </div>
              <span className="mt-2 font-serif text-[0.6rem] tracking-[0.25em] text-muted-foreground">
                QR PLACEHOLDER
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/50 px-4 py-3">
              <span className="truncate text-sm text-cream">{siteConfig.support.upiId}</span>
              <button
                type="button"
                onClick={copy}
                className="inline-flex shrink-0 items-center gap-2 rounded-md bg-gold/20 px-3 py-2 font-serif text-[0.6rem] tracking-[0.2em] uppercase text-gold"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy UPI"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-5 w-full rounded-md border border-gold/30 py-3 font-serif text-[0.65rem] tracking-[0.25em] uppercase text-cream/80 hover:text-gold"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="container-cinema py-16">
      <h2 className="text-center font-display text-3xl text-gold-gradient sm:text-4xl">FAQ</h2>
      <dl className="mx-auto mt-8 max-w-2xl divide-y divide-border">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="py-2">
              <dt>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-3 text-left"
                >
                  <span className="font-serif text-sm text-cream sm:text-base">{item.q}</span>
                  {isOpen ? (
                    <Minus className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  ) : (
                    <Plus className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  )}
                </button>
              </dt>
              {isOpen ? (
                <dd className="pb-4 pr-8 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </dd>
              ) : null}
            </div>
          );
        })}
      </dl>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border py-16 pb-32">
      <div className="container-cinema text-center">
        <p className="font-display text-2xl text-gold-gradient sm:text-3xl">{siteConfig.name}</p>
        <p className="mt-3 font-display text-base text-cream/85">{siteConfig.taglineHi}</p>
        <p className="mt-2 font-serif text-sm italic text-muted-foreground">
          Made with ❤️ for Bollywood nostalgia.
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {siteConfig.social.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="font-serif text-[0.65rem] tracking-[0.25em] uppercase text-cream/70 hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[0.68rem] text-muted-foreground">
          Music streamed via YouTube&apos;s official embedded player. All songs and artwork belong to
          their respective owners.
        </p>
        <p className="mt-2 font-serif text-[0.65rem] tracking-[0.3em] text-muted-foreground">
          © 2026 FILMI RAAT
        </p>
      </div>
    </footer>
  );
}
