import { Play } from "lucide-react";
import { formatTime, useMusic } from "@/context/MusicContext";

export function Playlist() {
  const { playlist, currentPlaylistIndex, isStarted, isPlaying, playIndex, currentVideoId } =
    useMusic();

  return (
    <section id="playlist" className="container-cinema py-16">
      <header className="text-center">
        <h2 className="font-display text-3xl text-gold-gradient sm:text-4xl">
          FILMI RAAT PLAYLIST
        </h2>
        <p className="mt-2 font-serif text-sm italic text-muted-foreground">Tonight&apos;s reel.</p>
      </header>

      <div className="panel-vintage mt-8 rounded-xl p-2 sm:p-3">
        {playlist.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-muted-foreground">
            {isStarted
              ? "Loading tonight's reel from YouTube…"
              : "Press ENTER FILMI RAAT to load tonight's reel from YouTube."}
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {playlist.map((video, i) => {
              const active =
                isStarted &&
                (currentVideoId ? video.videoId === currentVideoId : i === currentPlaylistIndex);
              return (
                <li key={`${video.videoId}-${i}`}>
                  <button
                    type="button"
                    onClick={() => playIndex(video.playlistIndex ?? i)}
                    aria-current={active ? "true" : undefined}
                    className={`group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors sm:gap-4 sm:px-4 ${
                      active ? "bg-secondary/70 shadow-marquee" : "hover:bg-secondary/40"
                    }`}
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-serif text-[0.7rem] ${
                        active
                          ? "bg-gold/20 text-gold [animation:onair-pulse_2.2s_ease-in-out_infinite]"
                          : "text-muted-foreground"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`clamp-2 block text-sm leading-snug ${active ? "text-gold" : "text-cream"}`}
                      >
                        {video.title}
                      </span>
                      <span className="mt-0.5 block truncate text-[0.7rem] text-muted-foreground">
                        {active ? (
                          <span className="font-serif tracking-[0.25em] text-gold/90">
                            {isPlaying ? "NOW PLAYING" : "PAUSED"}
                          </span>
                        ) : (
                          [video.channelTitle, video.duration ? formatTime(video.duration) : null]
                            .filter(Boolean)
                            .join(" · ")
                        )}
                      </span>
                    </span>
                    <Play
                      className={`h-4 w-4 shrink-0 ${active ? "text-gold" : "text-muted-foreground group-hover:text-gold"}`}
                      aria-hidden="true"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <p className="mt-4 text-center text-[0.68rem] text-muted-foreground">
        The reel syncs automatically with the source YouTube Music playlist.
      </p>
    </section>
  );
}
