import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, ChevronDown, ChevronRight, Clock, FileText, Headphones } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbJsonLd, PodcastEpisodeJsonLd } from "@/components/JsonLd";
import TranscriptDialog from "@/components/TranscriptDialog";
import FollowButtons from "@/components/FollowButtons";
import FollowPrompt from "@/components/FollowPrompt";
import EpisodeFunnelPanel from "@/components/EpisodeFunnelPanel";
import EpisodeListenerQuestions from "@/components/EpisodeListenerQuestions";
import { Button } from "@/components/ui/button";
import { podcastFeedSnapshot } from "@/data/podcastFeedSnapshot";
import { formatDate, formatDuration, usePodcastFeed, type Episode } from "@/hooks/usePodcastFeed";
import { usePostListenPrompt } from "@/hooks/usePostListenPrompt";
import {
  cleanEpisodeDescription,
  episodePath,
  pubDateToIso,
  trimToSentenceLength,
  withEpisodeSlugs,
  type EpisodeWithSlug,
} from "@/lib/episodes";
import { useEpisodeTranscript } from "@/lib/episodeTranscripts";
import NotFound from "./NotFound";

const byNewest = (a: Episode, b: Episode) => Date.parse(b.pubDate) - Date.parse(a.pubDate) || a.id.localeCompare(b.id);

const useEpisodeList = (): EpisodeWithSlug[] => {
  const { data } = usePodcastFeed();
  const episodes = data?.episodes?.length ? data.episodes : podcastFeedSnapshot.episodes;
  return useMemo(() => withEpisodeSlugs([...episodes].sort(byNewest)), [episodes]);
};

const TranscriptSection = ({ episode }: { episode: EpisodeWithSlug }) => {
  const transcript = useEpisodeTranscript(episode.slug);
  const [dialogOpen, setDialogOpen] = useState(false);
  const paragraphs = useMemo(
    () => (transcript.text ? transcript.text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []),
    [transcript.text],
  );
  const wordCount = useMemo(
    () => paragraphs.reduce((total, paragraph) => total + paragraph.split(/\s+/).length, 0),
    [paragraphs],
  );

  return (
    <section aria-labelledby="episode-transcript" className="mt-12">
      <h2 id="episode-transcript" className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
        <FileText className="h-6 w-6 text-primary" />
        Episode transcript
      </h2>

      {paragraphs.length > 0 ? (
        <details className="group rounded-lg border border-border bg-card">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg px-5 py-4 font-semibold text-foreground transition-colors hover:bg-muted/50 [&::-webkit-details-marker]:hidden">
            <span>
              <span className="group-open:hidden">Read the full transcript</span>
              <span className="hidden group-open:inline">Hide the transcript</span>
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({wordCount.toLocaleString("en-US")} words)
              </span>
            </span>
            <ChevronDown className="h-5 w-5 flex-shrink-0 text-primary transition-transform group-open:rotate-180" />
          </summary>
          <div className="max-w-none space-y-4 border-t border-border px-5 py-6 text-base leading-relaxed text-foreground/90">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </details>
      ) : transcript.loading ? (
        <p className="text-muted-foreground" aria-busy="true">Loading transcript…</p>
      ) : episode.transcripts.length > 0 ? (
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-muted-foreground">
            The full text of this episode isn't on this page yet, but you can open the transcript from the podcast feed.
          </p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => setDialogOpen(true)}>
            <FileText className="mr-1 h-4 w-4" />
            View transcript
          </Button>
          <TranscriptDialog
            isOpen={dialogOpen}
            onClose={() => setDialogOpen(false)}
            episodeTitle={episode.title}
            transcripts={episode.transcripts}
          />
        </div>
      ) : (
        <p className="rounded-lg border border-border bg-card p-5 text-muted-foreground">
          A transcript for this episode isn't available yet.
        </p>
      )}
    </section>
  );
};

const EpisodeNavLink = ({ episode, direction }: { episode: EpisodeWithSlug; direction: "previous" | "next" }) => (
  <Link
    to={episodePath(episode.slug)}
    rel={direction === "previous" ? "prev" : "next"}
    className={`group flex flex-col gap-1 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40 ${
      direction === "next" ? "sm:items-end sm:text-right" : ""
    }`}
  >
    <span className="flex items-center gap-1 text-xs font-semibold uppercase text-primary">
      {direction === "previous" && <ArrowLeft className="h-3.5 w-3.5" />}
      {direction === "previous" ? "Previous episode" : "Next episode"}
      {direction === "next" && <ArrowRight className="h-3.5 w-3.5" />}
    </span>
    <span className="text-sm font-semibold leading-snug text-foreground group-hover:text-burgundy">
      {episode.episodeNumber > 0 && `EP ${episode.episodeNumber}: `}
      {episode.title}
    </span>
  </Link>
);

const EpisodePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const episodes = useEpisodeList();
  const followPrompt = usePostListenPrompt();
  const index = episodes.findIndex((episode) => episode.slug === slug);
  if (index === -1) return <NotFound />;

  const episode = episodes[index];
  const previous = episodes[index + 1]; // older
  const next = index > 0 ? episodes[index - 1] : undefined; // newer
  const path = episodePath(episode.slug);
  const description = cleanEpisodeDescription(episode.description);
  const publishedIso = pubDateToIso(episode.pubDate);
  const label = episode.episodeNumber > 0 ? `Episode ${episode.episodeNumber}` : "Bonus episode";
  const metaDescription = trimToSentenceLength(`${label}: ${description || episode.title}`);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${episode.title} | The Party Wreckers Podcast`}
        description={metaDescription}
        canonical={path}
        ogType="article"
        publishedTime={publishedIso || undefined}
        keywords="Party Wreckers podcast episode, addiction podcast, family intervention, Matt Brown"
      />
      <PodcastEpisodeJsonLd
        title={episode.title}
        description={description || episode.title}
        episodeNumber={episode.episodeNumber}
        datePublished={publishedIso || episode.pubDate}
        duration={episode.duration}
        audioUrl={episode.audioUrl}
        url={path}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Episodes", url: "/episodes" },
          { name: episode.title, url: path },
        ]}
      />

      <Navbar />
      <main className="container mx-auto max-w-4xl px-4 pb-12 pt-24">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="transition-colors hover:text-primary">Home</Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
            <li>
              <Link to="/episodes" className="transition-colors hover:text-primary">Episodes</Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
            <li aria-current="page" className="line-clamp-1 max-w-full text-foreground/80">{episode.title}</li>
          </ol>
        </nav>

        <article>
          <header className="mb-8">
            <p className="mb-3 text-sm font-semibold uppercase text-primary">
              {episode.episodeNumber > 0 ? `EP ${episode.episodeNumber}` : "Bonus episode"} · The Party Wreckers Podcast
            </p>
            <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">{episode.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {formatDate(episode.pubDate) && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={publishedIso}>{formatDate(episode.pubDate)}</time>
                </span>
              )}
              {episode.duration > 0 && (
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatDuration(episode.duration)}
                </span>
              )}
              <span>Hosted by Matt Brown</span>
            </div>
          </header>

          <section aria-label="Listen to this episode" className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-5 sm:p-6">
            <p className="mb-3 flex items-center gap-2 font-semibold text-foreground">
              <Headphones className="h-5 w-5 text-primary" />
              Listen now
            </p>
            <audio
              controls
              preload="none"
              src={episode.audioUrl}
              className="w-full"
              onTimeUpdate={(event) =>
                followPrompt.reportProgress(
                  episode.slug,
                  event.currentTarget.currentTime,
                  event.currentTarget.duration,
                  episode.duration,
                )
              }
              onEnded={() => followPrompt.reportEnded(episode.slug)}
            >
              Your browser can't play this audio. <a href={episode.audioUrl}>Download the episode</a>.
            </audio>
            <div className="mt-5 border-t border-primary/15 pt-4">
              <p className="mb-3 text-sm text-muted-foreground">Follow the show so the next episode shows up in your app.</p>
              <FollowButtons placement="episode_page" metadata={{ episode: episode.slug }} />
            </div>
          </section>

          {description && (
            <section aria-labelledby="episode-about" className="mt-10">
              <h2 id="episode-about" className="mb-3 text-2xl font-bold text-foreground">About this episode</h2>
              <p className="text-lg leading-relaxed text-foreground/90">{description}</p>
            </section>
          )}

          <TranscriptSection key={episode.slug} episode={episode} />

          <EpisodeListenerQuestions episodeSlug={episode.slug} />
        </article>

        <div className="mt-12">
          <EpisodeFunnelPanel tone="support" />
        </div>

        {(previous || next) && (
          <nav aria-label="More episodes" className="mt-10 grid gap-4 sm:grid-cols-2">
            <div>{previous && <EpisodeNavLink episode={previous} direction="previous" />}</div>
            <div>{next && <EpisodeNavLink episode={next} direction="next" />}</div>
          </nav>
        )}

        <div className="mt-8">
          <Link to="/episodes" className="inline-flex items-center text-primary transition-colors hover:text-primary/80">
            <ArrowLeft className="mr-2 h-4 w-4" />
            All episodes
          </Link>
        </div>
      </main>
      <Footer />
      <FollowPrompt
        open={followPrompt.open}
        onDismiss={followPrompt.dismiss}
        placement="episode_page_prompt"
        metadata={{ episode: followPrompt.episodeKey ?? episode.slug }}
      />
    </div>
  );
};

export default EpisodePage;
