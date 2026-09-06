import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  FILMI_RAAT_PLAYLIST_ID,
  getPlaylistMeta,
  getVideoMeta,
  type VideoMeta,
} from "@/lib/youtube.functions";

/* ---------- Minimal typing for the official YouTube IFrame API ---------- */
type YTPlayer = {
  playVideo(): void;
  pauseVideo(): void;
  nextVideo(): void;
  previousVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  setVolume(v: number): void;
  getVolume(): number;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  getCurrentTime(): number;
  getDuration(): number;
  getPlaylist(): string[] | null;
  getPlaylistIndex(): number;
  playVideoAt(index: number): void;
  getVideoData(): { video_id?: string; title?: string; author?: string };
  destroy(): void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement | string, opts: unknown) => YTPlayer;
      PlayerState: Record<string, number>;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export type MusicState = {
  isReady: boolean;
  isStarted: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  isBuffering: boolean;
  currentVideoId: string | null;
  currentPlaylistIndex: number;
  currentTitle: string;
  currentChannel: string;
  currentThumbnail: string | null;
  duration: number;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  playlist: VideoMeta[];
  error: string | null;
};

type MusicApi = MusicState & {
  enter: () => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  seek: (seconds: number) => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  playIndex: (index: number) => void;
  dismissError: () => void;
};

const MusicContext = createContext<MusicApi | null>(null);
const FRIENDLY_ERROR =
  "Filmi Raat is having a little projector trouble. Try again in a moment.";

function loadIframeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.getElementById("yt-iframe-api");
    const done = () => resolve();
    if (!existing) {
      const script = document.createElement("script");
      script.id = "yt-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => reject(new Error("iframe api failed"));
      document.head.appendChild(script);
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      done();
    };
    const poll = window.setInterval(() => {
      if (window.YT?.Player) {
        window.clearInterval(poll);
        done();
      }
    }, 200);
    window.setTimeout(() => {
      window.clearInterval(poll);
      if (!window.YT?.Player) reject(new Error("iframe api timeout"));
    }, 12000);
  });
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const playerRef = useRef<YTPlayer | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const fetchPlaylistMeta = useServerFn(getPlaylistMeta);
  const fetchVideoMeta = useServerFn(getVideoMeta);

  const [state, setState] = useState<MusicState>({
    isReady: false,
    isStarted: false,
    isPlaying: false,
    isPaused: false,
    isBuffering: false,
    currentVideoId: null,
    currentPlaylistIndex: 0,
    currentTitle: "",
    currentChannel: "",
    currentThumbnail: null,
    duration: 0,
    currentTime: 0,
    volume: 80,
    isMuted: false,
    playlist: [],
    error: null,
  });

  const patch = useCallback(
    (next: Partial<MusicState>) => setState((prev) => ({ ...prev, ...next })),
    [],
  );

  /** Read the exact metadata the YouTube player reports for the current video. */
  const syncCurrent = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    try {
      const data = player.getVideoData();
      const videoId = data.video_id ?? null;
      const index = player.getPlaylistIndex();
      patch({
        currentVideoId: videoId,
        currentPlaylistIndex: index < 0 ? 0 : index,
        currentTitle: data.title ?? "",
        currentChannel: data.author ?? "",
        currentThumbnail: videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null,
        duration: player.getDuration() || 0,
      });
    } catch {
      /* player not ready yet */
    }
  }, [patch]);

  /** Build playlist metadata: Data API (via server) when available, else official oEmbed. */
  const syncPlaylist = useCallback(async () => {
    const player = playerRef.current;
    try {
      const fromApi = await fetchPlaylistMeta({});
      if (fromApi.videos.length > 0) {
        patch({ playlist: fromApi.videos });
        return;
      }
      const ids = player?.getPlaylist() ?? [];
      if (ids.length === 0) return;
      const res = await fetchVideoMeta({ data: { ids } });
      patch({ playlist: res.videos });
    } catch {
      /* metadata unavailable — UI falls back to player-reported title */
    }
  }, [fetchPlaylistMeta, fetchVideoMeta, patch]);

  const enter = useCallback(async () => {
    if (state.isStarted) {
      playerRef.current?.playVideo();
      return;
    }
    patch({ isStarted: true, isBuffering: true, error: null });
    try {
      await loadIframeApi();
      const YT = window.YT;
      const mount = mountRef.current;
      if (!YT || !mount) throw new Error("player unavailable");

      playerRef.current = new YT.Player(mount, {
        height: "180",
        width: "320",
        playerVars: {
          listType: "playlist",
          list: FILMI_RAAT_PLAYLIST_ID,
          playsinline: 1,
          autoplay: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: { target: YTPlayer }) => {
            const player = event.target;
            playerRef.current = player;
            try {
              player.setVolume(state.volume);
              player.playVideo();
            } catch {
              /* ignore */
            }
            patch({ isReady: true });
            syncCurrent();
            void syncPlaylist();
          },
          onStateChange: (event: { data: number }) => {
            const s = event.data;
            if (s === 1) {
              skipCountRef.current = 0;
              patch({ error: null });
            }
            patch({
              isPlaying: s === 1,
              isPaused: s === 2,
              isBuffering: s === 3,
            });
            if (s === 1 || s === 3 || s === 5 || s === 0) syncCurrent();
            if (s === 5) void syncPlaylist();
          },
          onError: () => {
            skipToNextPlayable();
          },
        },

      });
    } catch {
      patch({ isBuffering: false, error: FRIENDLY_ERROR });
    }
  }, [patch, state.isStarted, state.volume, syncCurrent, syncPlaylist]);

  /* progress ticker */
  useEffect(() => {
    if (!state.isReady) return;
    const id = window.setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      try {
        setState((prev) => ({
          ...prev,
          currentTime: player.getCurrentTime() || 0,
          duration: player.getDuration() || prev.duration,
          isMuted: player.isMuted(),
        }));
      } catch {
        /* ignore */
      }
    }, 400);
    return () => window.clearInterval(id);
  }, [state.isReady]);

  useEffect(
    () => () => {
      try {
        playerRef.current?.destroy();
      } catch {
        /* ignore */
      }
    },
    [],
  );

  const guard = useCallback((fn: (p: YTPlayer) => void) => {
    const player = playerRef.current;
    if (!player) return;
    try {
      fn(player);
    } catch {
      /* ignore */
    }
  }, []);

  const api = useMemo<MusicApi>(
    () => ({
      ...state,
      enter: () => void enter(),
      play: () => guard((p) => p.playVideo()),
      pause: () => guard((p) => p.pauseVideo()),
      toggle: () =>
        guard((p) => {
          if (state.isPlaying) p.pauseVideo();
          else p.playVideo();
        }),
      next: () => guard((p) => p.nextVideo()),
      previous: () => guard((p) => p.previousVideo()),
      seek: (seconds) => guard((p) => p.seekTo(seconds, true)),
      setVolume: (v) =>
        guard((p) => {
          p.setVolume(v);
          if (v > 0 && p.isMuted()) p.unMute();
          patch({ volume: v, isMuted: v === 0 ? p.isMuted() : false });
        }),
      toggleMute: () =>
        guard((p) => {
          if (p.isMuted()) {
            p.unMute();
            patch({ isMuted: false });
          } else {
            p.mute();
            patch({ isMuted: true });
          }
        }),
      playIndex: (index) => {
        if (!state.isStarted) {
          void enter();
          return;
        }
        guard((p) => {
          p.playVideoAt(index);
          p.playVideo();
        });
      },
      dismissError: () => patch({ error: null }),
    }),
    [state, enter, guard, patch],
  );

  return (
    <MusicContext.Provider value={api}>
      {children}
      {/* Official YouTube IFrame player — kept offscreen; our UI drives it via the API. */}
      <div className="pointer-events-none fixed bottom-0 left-0 h-px w-px overflow-hidden opacity-0">
        <div ref={mountRef} />
      </div>
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside MusicProvider");
  return ctx;
}

export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
