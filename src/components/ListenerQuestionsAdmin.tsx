import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Copy, ExternalLink, Inbox, Mic, RefreshCw, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { usePodcastFeed } from "@/hooks/usePodcastFeed";
import { withEpisodeSlugs } from "@/lib/episodes";
import { LISTENER_QUESTION_STATUSES, type ListenerQuestionStatus } from "@/lib/listenerQuestions";

interface ListenerQuestion {
  id: string;
  created_at: string;
  question: string;
  topic: string | null;
  display_name: string | null;
  email: string | null;
  wants_reply: boolean;
  on_air_ok: boolean;
  audio_path: string | null;
  audio_url: string | null;
  audio_duration_seconds: number | null;
  source_path: string | null;
  status: ListenerQuestionStatus;
  episode_slug: string | null;
  public_question: string | null;
  is_public: boolean;
  answered_at: string | null;
  admin_notes: string | null;
}

type Filter = "all" | ListenerQuestionStatus;

const FILTERS: Array<{ value: Filter; label: string }> = [
  { value: "new", label: "New" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "answered", label: "Answered" },
  { value: "declined", label: "Declined" },
  { value: "all", label: "All" },
];

const STATUS_LABELS: Record<ListenerQuestionStatus, string> = {
  new: "New",
  shortlisted: "Shortlisted",
  answered: "Answered",
  declined: "Declined",
};

const selectClassName = "h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground";

const formatDateTime = (value: string) =>
  new Date(value).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });

interface ListenerQuestionsAdminProps {
  /** Headers for the legacy access key, when that's how the owner got in. */
  accessHeaders: () => Record<string, string>;
  /** Turns a function error into a sign-in / permission message, or null for other errors. */
  describeError: (error: unknown) => string | null;
}

/** The "Ask Matt" question queue on /funnel-report. Only rendered once the report loaded. */
const ListenerQuestionsAdmin = ({ accessHeaders, describeError }: ListenerQuestionsAdminProps) => {
  const [filter, setFilter] = useState<Filter>("new");
  const [questions, setQuestions] = useState<ListenerQuestion[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "saving" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [setupRequired, setSetupRequired] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const { data: feed } = usePodcastFeed();

  const episodes = useMemo(
    () =>
      withEpisodeSlugs([...(feed?.episodes || [])].sort((a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate))).map(
        (episode) => ({ slug: episode.slug, title: episode.title }),
      ),
    [feed],
  );

  // The latest callbacks from the page, without re-running the load effect on every render.
  const headersFn = useRef(accessHeaders);
  headersFn.current = accessHeaders;
  const describeErrorRef = useRef(describeError);
  describeErrorRef.current = describeError;

  const fail = useCallback((cause: unknown, fallback: string) => {
    setState("error");
    setError(describeErrorRef.current(cause) || fallback);
  }, []);

  const load = useCallback(
    async (status: Filter) => {
      setState("loading");
      setError(null);
      const { data, error: invokeError } = await supabase.functions.invoke("listener-questions-admin", {
        headers: headersFn.current(),
        body: { action: "list", status },
      });
      if (invokeError) {
        fail(invokeError, "Could not load listener questions. Try again, and confirm the listener-questions-admin function is deployed.");
        return;
      }
      setSetupRequired(Boolean(data?.setup_required));
      setQuestions((data?.questions || []) as ListenerQuestion[]);
      setState("idle");
    },
    [fail],
  );

  useEffect(() => {
    void load(filter);
  }, [filter, load]);

  const edit = (id: string, updates: Partial<ListenerQuestion>) => {
    setSavedId(null);
    setQuestions((current) => current.map((question) => (question.id === id ? { ...question, ...updates } : question)));
  };

  const save = async (question: ListenerQuestion) => {
    setState("saving");
    setError(null);
    const { data, error: invokeError } = await supabase.functions.invoke("listener-questions-admin", {
      headers: headersFn.current(),
      body: {
        action: "update",
        id: question.id,
        status: question.status,
        episode_slug: question.episode_slug || "",
        public_question: question.public_question || "",
        is_public: question.is_public,
        admin_notes: question.admin_notes || "",
      },
    });
    if (invokeError) {
      fail(invokeError, "Could not save that question. Try again.");
      return;
    }
    const updated = data?.question as ListenerQuestion | null;
    // Stays in view (even if it no longer matches the tab) until the next refresh.
    if (updated) setQuestions((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    setSavedId(question.id);
    setState("idle");
  };

  const remove = async (question: ListenerQuestion) => {
    if (typeof window !== "undefined" && !window.confirm("Delete this question permanently? Any voice recording is deleted too.")) {
      return;
    }
    setState("saving");
    setError(null);
    const { error: invokeError } = await supabase.functions.invoke("listener-questions-admin", {
      headers: headersFn.current(),
      body: { action: "delete", id: question.id },
    });
    if (invokeError) {
      fail(invokeError, "Could not delete that question. Try again.");
      return;
    }
    setQuestions((current) => current.filter((item) => item.id !== question.id));
    setState("idle");
  };

  const busy = state === "loading" || state === "saving";

  return (
    <Card className="border-border bg-card" id="listener-questions">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Inbox className="h-5 w-5 text-primary" />
              Listener Questions
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              &quot;Ask Matt&quot; questions from /ask-matt. To show one on its episode page: mark it Answered, pick the
              episode, write the public wording, and tick &quot;Show on site&quot;.
            </p>
          </div>
          <Button variant="outline" onClick={() => void load(filter)} disabled={busy}>
            <RefreshCw className={`h-4 w-4 ${state === "loading" ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Filter questions by status">
          {FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={filter === option.value}
              onClick={() => setFilter(option.value)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                filter === option.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary hover:text-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {state === "error" && error && (
          <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}
        {setupRequired && (
          <div role="status" className="rounded-lg border border-primary/30 bg-primary/10 p-4 text-sm text-foreground">
            The listener-questions table doesn&apos;t exist yet. Apply the migration
            <code className="mx-1 rounded bg-background px-1">20261102120000_listener_questions.sql</code>
            (see docs/new-features-setup.md). Until then, questions still arrive by email.
          </div>
        )}

        {state === "loading" && !questions.length ? (
          <p className="text-sm text-muted-foreground">Loading questions…</p>
        ) : questions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No {filter === "all" ? "" : `${STATUS_LABELS[filter].toLowerCase()} `}questions.
          </p>
        ) : (
          questions.map((question) => (
            <QuestionRow
              key={question.id}
              question={question}
              episodes={episodes}
              onEdit={(updates) => edit(question.id, updates)}
              onSave={() => void save(question)}
              onDelete={() => void remove(question)}
              busy={busy}
              saved={savedId === question.id}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};

interface QuestionRowProps {
  question: ListenerQuestion;
  episodes: Array<{ slug: string; title: string }>;
  onEdit: (updates: Partial<ListenerQuestion>) => void;
  onSave: () => void;
  onDelete: () => void;
  busy: boolean;
  saved: boolean;
}

const QuestionRow = ({ question, episodes, onEdit, onSave, onDelete, busy, saved }: QuestionRowProps) => {
  const id = (field: string) => `lq-${question.id}-${field}`;
  const hasTypedText = !question.question.startsWith("(Voice question");
  const knownEpisode = !question.episode_slug || episodes.some((episode) => episode.slug === question.episode_slug);
  const willShow = question.status === "answered" && question.is_public && Boolean(question.public_question?.trim()) && Boolean(question.episode_slug);

  return (
    <article className="rounded-lg border border-border bg-background p-4" aria-label={`Question from ${question.display_name || "Anonymous"}`}>
      <div className="flex flex-col gap-1 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
        <span className="font-semibold text-foreground">{question.display_name || "Anonymous"}</span>
        <span className="text-muted-foreground">{formatDateTime(question.created_at)}</span>
        {question.topic && <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{question.topic}</span>}
        {question.audio_path && (
          <span className="inline-flex items-center gap-1 text-xs text-primary">
            <Mic className="h-3 w-3" aria-hidden="true" />
            Voice{question.audio_duration_seconds ? ` · ${question.audio_duration_seconds}s` : ""}
          </span>
        )}
        {question.email && (
          <a href={`mailto:${question.email}`} className="text-xs text-primary underline">
            {question.email}
            {question.wants_reply ? " (wants to know when answered)" : ""}
          </a>
        )}
      </div>

      {hasTypedText ? (
        <p className="mt-3 whitespace-pre-wrap text-foreground">{question.question}</p>
      ) : (
        <p className="mt-3 text-sm italic text-muted-foreground">Voice only, no typed text.</p>
      )}

      {question.audio_path &&
        (question.audio_url ? (
          <audio controls preload="none" src={question.audio_url} className="mt-3 w-full max-w-md">
            <a href={question.audio_url}>Download the recording</a>
          </audio>
        ) : (
          <p className="mt-3 text-sm text-destructive">The recording couldn&apos;t be loaded. Refresh to try again.</p>
        ))}

      <div className="mt-4 grid gap-3 md:grid-cols-[10rem_1fr]">
        <div className="space-y-1">
          <label htmlFor={id("status")} className="text-xs uppercase tracking-widest text-muted-foreground">Status</label>
          <select
            id={id("status")}
            value={question.status}
            onChange={(event) => onEdit({ status: event.target.value as ListenerQuestionStatus })}
            className={selectClassName}
          >
            {LISTENER_QUESTION_STATUSES.map((status) => (
              <option key={status} value={status}>{STATUS_LABELS[status]}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor={id("episode")} className="text-xs uppercase tracking-widest text-muted-foreground">Answered in episode</label>
          <select
            id={id("episode")}
            value={question.episode_slug || ""}
            onChange={(event) => onEdit({ episode_slug: event.target.value || null })}
            className={selectClassName}
          >
            <option value="">Not assigned</option>
            {!knownEpisode && <option value={question.episode_slug as string}>{question.episode_slug}</option>}
            {episodes.map((episode) => (
              <option key={episode.slug} value={episode.slug}>{episode.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor={id("public")} className="text-xs uppercase tracking-widest text-muted-foreground">
            Public wording (shown on the site)
          </label>
          {hasTypedText && (
            <Button type="button" variant="ghost" size="sm" onClick={() => onEdit({ public_question: question.question })}>
              <Copy className="h-3.5 w-3.5" />
              Start from original
            </Button>
          )}
        </div>
        <Textarea
          id={id("public")}
          value={question.public_question || ""}
          onChange={(event) => onEdit({ public_question: event.target.value })}
          placeholder="An edited version with identifying details removed."
          maxLength={2000}
          className="min-h-[80px]"
        />
      </div>

      <div className="mt-3 space-y-1">
        <label htmlFor={id("notes")} className="text-xs uppercase tracking-widest text-muted-foreground">Private notes</label>
        <Textarea
          id={id("notes")}
          value={question.admin_notes || ""}
          onChange={(event) => onEdit({ admin_notes: event.target.value })}
          maxLength={5000}
          className="min-h-[60px]"
        />
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={question.is_public}
            onChange={(event) => onEdit({ is_public: event.target.checked })}
            className="h-4 w-4"
          />
          Show on site
          <span className="text-xs text-muted-foreground">
            {willShow
              ? "Visible on the episode page and /ask-matt."
              : "Needs: Answered, an episode, and public wording."}
          </span>
        </label>
        <div className="flex items-center gap-2">
          {saved && <span className="text-sm text-muted-foreground" role="status">Saved</span>}
          {willShow && question.episode_slug && (
            <Button variant="ghost" size="sm" asChild>
              <a href={`/episodes/${question.episode_slug}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Episode
              </a>
            </Button>
          )}
          <Button size="sm" onClick={onSave} disabled={busy}>
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button size="sm" variant="outline" onClick={onDelete} disabled={busy}>
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ListenerQuestionsAdmin;
