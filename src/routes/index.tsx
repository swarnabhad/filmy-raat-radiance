import { createFileRoute } from "@tanstack/react-router";
import { MusicProvider } from "@/context/MusicContext";
import { Header } from "@/components/filmi/Header";
import { Hero } from "@/components/filmi/Hero";
import { MusicPlayer } from "@/components/filmi/MusicPlayer";
import { MiniPlayer } from "@/components/filmi/MiniPlayer";
import { Playlist } from "@/components/filmi/Playlist";
import { FilmiSoch } from "@/components/filmi/FilmiSoch";
import { GoldenEra } from "@/components/filmi/GoldenEra";
import { FilmGrain, FilmStrip } from "@/components/filmi/CinemaBackground";
import { About, Dedication, Faq, Footer, Support } from "@/components/filmi/Sections";

const title = "Filmi Raat — Retro Bollywood Radio";
const description =
  "Filmi Raat is a nostalgic Bollywood retro radio experience featuring timeless Hindi music, vintage cinema vibes and late-night listening.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: "Press play. Close your eyes. Go back in time." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <MusicProvider>
      <FilmGrain />
      <Header />
      <main>
        <Hero />
        <MusicPlayer />
        <FilmStrip className="opacity-40" />
        <Playlist />
        <FilmiSoch />
        <GoldenEra />
        <Dedication />
        <About />
        <Faq />
        <Support />
      </main>
      <Footer />
      <MiniPlayer />
    </MusicProvider>
  );
}
