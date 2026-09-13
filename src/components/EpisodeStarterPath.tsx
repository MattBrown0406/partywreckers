import { ArrowRight, Clock, Headphones, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatDuration, type Episode } from "@/hooks/usePodcastFeed";
import { getStarterEpisodes } from "@/lib/episodeGuides";

type EpisodeStarterPathProps = {
  episodes: Episode[];
  compact?: boolean;
};

const EpisodeStarterPath = ({ episodes, compact = false }: EpisodeStarterPathProps) => {
  const starterEpisodes = getStarterEpisodes(episodes);

  return (
    <section className={compact ? "py-10" : "border-y border-border bg-card py-14 sm:py-20"}>
      <div className="container px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-7 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase text-primary">Start here</p>
              <h2 className="font-script text-4xl text-burgundy sm:text-5xl">Three episodes for the moment you are in.</h2>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground">
              The archive is useful, but families in crisis do not always need more browsing. These three episodes point people toward the right next move.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {starterEpisodes.map(({ title, body, episode }) => (
              <article key={title} className="rounded-lg border border-border bg-background p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Headphones className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                {episode && (
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="text-sm font-semibold leading-snug text-foreground">{episode.title}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      {episode.episodeNumber > 0 && <span>EP {episode.episodeNumber}</span>}
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDuration(episode.duration)}
                      </span>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>

          {!compact && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild>
                <Link to="/episodes">
                  <Play className="h-4 w-4" />
                  Browse All Episodes
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/from-party-wreckers">
                  Listener Path
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EpisodeStarterPath;
