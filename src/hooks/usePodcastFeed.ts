import { useQuery } from "@tanstack/react-query";
import { podcastFeedSnapshot } from "@/data/podcastFeedSnapshot";
import { supabase } from "@/integrations/supabase/client";

export interface TranscriptInfo {
  url: string;
  type: string; // 'text/html', 'application/json', 'application/x-subrip'
}

export interface Episode {
  id: string;
  title: string;
  description: string;
  pubDate: string;
  duration: number;
  episodeNumber: number;
  audioUrl: string;
  transcripts: TranscriptInfo[];
}

export interface PodcastInfo {
  title: string;
  description: string;
  author: string;
  image: string;
  episodes: Episode[];
}

const snapshotDurationsByEpisode = new Map(
  podcastFeedSnapshot.episodes.flatMap((episode) => [
    [episode.id, episode.duration],
    [episode.title, episode.duration],
  ]),
);

const normalizePodcastInfo = (podcastInfo: PodcastInfo): PodcastInfo => {
  return {
    ...podcastInfo,
    episodes: podcastInfo.episodes.map((episode) => ({
      ...episode,
      duration:
        episode.duration ||
        snapshotDurationsByEpisode.get(episode.id) ||
        snapshotDurationsByEpisode.get(episode.title) ||
        0,
    })),
  };
};

const fetchPodcastFeed = async (): Promise<PodcastInfo> => {
  const { data, error } = await supabase.functions.invoke<PodcastInfo>("get-party-wreckers-podcast-feed");

  if (error || !data?.episodes?.length) {
    throw error || new Error("Podcast feed cache did not return episodes");
  }

  return normalizePodcastInfo(data);
};

export const usePodcastFeed = () => {
  return useQuery({
    queryKey: ["podcast-feed"],
    queryFn: fetchPodcastFeed,
    initialData: podcastFeedSnapshot,
    initialDataUpdatedAt: 0,
    staleTime: 1000 * 60 * 30,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes} min`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";

  // Fixed timezone so prerendered HTML (built in UTC) shows the same date as browsers.
  return date.toLocaleDateString("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
