import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type VideoMeta = {
  videoId: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  playlistIndex: number;
  duration?: number;
};

export const FILMI_RAAT_PLAYLIST_ID = "PLLounUW9rgqGDmPxbZBerszf0dBq_M93b";

/** In-memory metadata cache (MVP). Refreshed every 6 hours. */
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
type CacheEntry = { at: number; videos: VideoMeta[] };
const playlistCache = new Map<string, CacheEntry>();
const titleCache = new Map<string, VideoMeta>();

function thumb(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function parseIsoDuration(iso?: string): number | undefined {
  if (!iso) return undefined;
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso);
  if (!m) return undefined;
  return Number(m[1] ?? 0) * 3600 + Number(m[2] ?? 0) * 60 + Number(m[3] ?? 0);
}

/**
 * Official YouTube oEmbed endpoint — no API key, no scraping.
 * Returns the exact YouTube title/author for a video id.
 */
async function oembed(videoId: string, index: number): Promise<VideoMeta | null> {
  const cached = titleCache.get(videoId);
  if (cached) return { ...cached, playlistIndex: index };
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(
        `https://www.youtube.com/watch?v=${videoId}`,
      )}&format=json`,
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { title?: string; author_name?: string };
    if (!json.title) return null;
    const meta: VideoMeta = {
      videoId,
      title: json.title,
      channelTitle: json.author_name ?? "",
      thumbnailUrl: thumb(videoId),
      playlistIndex: index,
    };
    titleCache.set(videoId, meta);
    return meta;
  } catch {
    return null;
  }
}

/**
 * Playlist metadata straight from the YouTube playlist (source of truth).
 * Uses YouTube Data API v3 when a server-side key is configured, otherwise
 * falls back to the keyless official oEmbed endpoint for ids the player reports.
 */
export const getPlaylistMeta = createServerFn({ method: "GET" }).handler(async () => {
  const playlistId = FILMI_RAAT_PLAYLIST_ID;
  const cached = playlistCache.get(playlistId);
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return { videos: cached.videos, lastSynced: cached.at, source: "cache" as const };
  }

  const key = process.env["YOUTUBE_API_KEY"];
  if (!key) return { videos: [], lastSynced: 0, source: "none" as const };

  try {
    const videos: VideoMeta[] = [];
    let pageToken: string | undefined;
    let index = 0;
    do {
      const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
      url.searchParams.set("part", "snippet,contentDetails");
      url.searchParams.set("maxResults", "50");
      url.searchParams.set("playlistId", playlistId);
      url.searchParams.set("key", key);
      if (pageToken) url.searchParams.set("pageToken", pageToken);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`playlistItems ${res.status}`);
      const json = (await res.json()) as {
        nextPageToken?: string;
        items?: Array<{
          snippet?: {
            title?: string;
            videoOwnerChannelTitle?: string;
            channelTitle?: string;
            thumbnails?: Record<string, { url?: string }>;
          };
          contentDetails?: { videoId?: string };
        }>;
      };
      for (const item of json.items ?? []) {
        const videoId = item.contentDetails?.videoId;
        const title = item.snippet?.title;
        if (!videoId || !title || title === "Deleted video" || title === "Private video") {
          index += 1;
          continue;
        }
        videos.push({
          videoId,
          title,
          channelTitle:
            item.snippet?.videoOwnerChannelTitle ?? item.snippet?.channelTitle ?? "",
          thumbnailUrl:
            item.snippet?.thumbnails?.["high"]?.url ??
            item.snippet?.thumbnails?.["default"]?.url ??
            thumb(videoId),
          playlistIndex: index,
        });
        index += 1;
      }
      pageToken = json.nextPageToken;
    } while (pageToken);

    // durations (optional, best effort)
    for (let i = 0; i < videos.length; i += 50) {
      const chunk = videos.slice(i, i + 50);
      const url = new URL("https://www.googleapis.com/youtube/v3/videos");
      url.searchParams.set("part", "contentDetails");
      url.searchParams.set("id", chunk.map((v) => v.videoId).join(","));
      url.searchParams.set("key", key);
      const res = await fetch(url);
      if (!res.ok) break;
      const json = (await res.json()) as {
        items?: Array<{ id?: string; contentDetails?: { duration?: string } }>;
      };
      for (const item of json.items ?? []) {
        const target = videos.find((v) => v.videoId === item.id);
        if (target) target.duration = parseIsoDuration(item.contentDetails?.duration);
      }
    }

    const entry: CacheEntry = { at: Date.now(), videos };
    playlistCache.set(playlistId, entry);
    for (const v of videos) titleCache.set(v.videoId, v);
    return { videos, lastSynced: entry.at, source: "api" as const };
  } catch {
    return { videos: [], lastSynced: 0, source: "error" as const };
  }
});

/** Exact titles for the video ids the embedded player reports. */
export const getVideoMeta = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ ids: z.array(z.string()).max(200) }).parse(input))
  .handler(async ({ data }) => {
    const results = await Promise.all(data.ids.map((id, i) => oembed(id, i)));
    return { videos: results.filter((v): v is VideoMeta => v !== null) };
  });
