import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site";

const links = [
  { label: "About", href: "#about" },
  { label: "Playlist", href: "#playlist" },
  { label: "Support", href: "#support" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-cinema flex items-center justify-between py-4">
        <a href="#top" className="font-display text-lg text-gold-gradient sm:text-xl">
          {siteConfig.name}
        </a>

        <span className="hidden font-serif text-[0.6rem] tracking-[0.35em] text-muted-foreground md:inline">
          {siteConfig.station}
        </span>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-serif text-[0.7rem] tracking-[0.22em] uppercase text-cream/80 transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 bg-burgundy-deep/70 text-gold md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <nav
          aria-label="Mobile"
          className="container-cinema md:hidden"
        >
          <div className="panel-vintage rounded-lg p-2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-4 py-3 font-serif text-sm tracking-[0.18em] uppercase text-cream/90 hover:bg-secondary/60 hover:text-gold"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
