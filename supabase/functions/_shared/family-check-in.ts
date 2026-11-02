// The minimum the newsletter-signup function needs to email a family-check-in result or
// the First 72 Hours checklist. Shared with the site (src/lib/familyCheckIn.ts), which
// keeps its own fuller copy for the page. Plain TypeScript, no Deno or browser APIs, so
// both the edge function and the Vite build can import it.
//
// Everything here is fixed text written by us. Nothing a visitor types ever ends up in
// these emails.

export const SITE_ORIGIN = "https://partywreckers.com";

export const QUIZ_RESULT_IDS = ["watching", "stuck", "ready", "crisis"] as const;
export type QuizResultId = (typeof QUIZ_RESULT_IDS)[number];

export const isQuizResultId = (value: unknown): value is QuizResultId =>
  typeof value === "string" && (QUIZ_RESULT_IDS as readonly string[]).includes(value);

/** The newsletter-signup `source` for the checklist form, and its Mailchimp tag. */
export const LEAD_72_HOURS_SOURCE = "lead_72_hours";
export const LEAD_72_HOURS_TAG = "lead:72-hours";
export const LEAD_72_HOURS_PATH = "/first-72-hours";

export const quizSource = (id: QuizResultId) => `quiz_${id}`;
export const quizTag = (id: QuizResultId) => `quiz:${id}`;

export interface EmailLink {
  label: string;
  /** Site-relative path (e.g. /get-help) or an absolute https URL. */
  href: string;
}

/** Absolute URL for an email link. */
export const emailHref = (href: string) => (href.startsWith("/") ? `${SITE_ORIGIN}${href}` : href);

const emailTracking = "utm_source=party_wreckers&utm_medium=email&utm_campaign=family_check_in";
const FAMILY_SQUARES_EMAIL_URL = `https://soberhelpline.com/family-squares?${emailTracking}`;
const FREEDOM_START_HERE_EMAIL_URL = `https://freedominterventions.com/start-here?${emailTracking}`;

export interface QuizResultEmail {
  title: string;
  /** One plain-language paragraph, shown on the page and sent in the email. */
  summary: string;
  /** Existing blog slugs with their titles (checked against blogData by scripts/test-family-check-in.mjs). */
  articles: Array<{ slug: string; title: string }>;
  /** Snapshot episode id; the site resolves the slug at runtime with getEpisodeSlugs. */
  episode: { id: string; title: string; slug: string };
  /** The next step, in order of priority. */
  nextSteps: EmailLink[];
}

export const QUIZ_RESULT_EMAILS: Record<QuizResultId, QuizResultEmail> = {
  crisis: {
    title: "Crisis: act today",
    summary:
      "Something you described means someone may not be safe right now, and safety comes before every other conversation. If you can't wake them or their breathing is slow or stopped, treat it as an overdose: call 911, give naloxone if you have it, and stay with them. If anyone is being threatened or talking about suicide, call 911 or call or text 988. Don't make permanent decisions tonight. Once everyone is safe, the 24 to 72 hours after a crisis is often when a loved one will say yes to help, so call a professional before you call a family meeting.",
    articles: [
      {
        slug: "overdose-safety-plan-for-families",
        title: "Keeping Them Alive Long Enough to Get Well: The Overdose Safety Plan Every Family Needs",
      },
      {
        slug: "72-hours-after-crisis-window-of-willingness",
        title: "The 72 Hours After the Crisis: What to Do When the Door Cracks Open",
      },
      {
        slug: "what-to-do-after-a-relapse-first-24-hours",
        title: "A Relapse Is Not a Verdict: What to Do in the First 24 Hours",
      },
    ],
    episode: {
      id: "Buzzsprout-18236744",
      title: "Your Kid Called From Jail; Your Wallet Doesn't Have To",
      slug: "your-kid-called-from-jail-your-wallet-doesnt-have-to",
    },
    nextSteps: [
      { label: "Tell Matt what's happening", href: "/get-help" },
      { label: "The First 72 Hours checklist", href: LEAD_72_HOURS_PATH },
    ],
  },
  ready: {
    title: "Ready for a plan",
    summary:
      "What you described is past the point where waiting is a kindness: it's getting worse, the promises haven't held, and you're running out of road. That's usually when families stop improvising and get professional guidance. You don't need the whole family on board, and you don't need to have decided anything. A first call to an interventionist is a conversation, not a contract. Write down a rough timeline, the money you're spending, who could be in the room, and any medical history, then make the call this week.",
    articles: [
      { slug: "when-to-consider-intervention", title: "When to Stop Waiting and Consider an Intervention" },
      { slug: "the-phone-call-you-keep-not-making", title: "The Phone Call You Keep Not Making" },
      { slug: "you-dont-need-whole-family-on-board-to-start", title: "You Don't Need the Whole Family on Board to Start" },
    ],
    episode: {
      id: "Buzzsprout-18819236",
      title: "How To Prepare For an Addiction Intervention",
      slug: "how-to-prepare-for-an-addiction-intervention",
    },
    nextSteps: [
      { label: "Tell Matt what's going on", href: "/get-help" },
      { label: "Get answers from Freedom Interventions", href: FREEDOM_START_HERE_EMAIL_URL },
    ],
  },
  stuck: {
    title: "Stuck in the cycle",
    summary:
      "Your family is in a loop a lot of families know: a bad stretch, a promise, a calm spell, and then it starts again. That isn't because you haven't loved them enough. Often the help that comes from love, like covering, paying, and smoothing things over, also protects the addiction from its consequences. The way out is to stop arguing about what they must do and decide what you will do: write it down, say it once, and expect pushback. You also need support for yourself, because nobody can hold a boundary on empty.",
    articles: [
      { slug: "enabling-vs-supporting-boundaries", title: "Enabling vs Supporting—A Boundary Blueprint for Families" },
      {
        slug: "addiction-promises-cycle",
        title: "Why \"They Promise It Won't Happen Again\" Keeps Working on Families",
      },
      { slug: "addiction-family-exhaustion", title: "Why You're Exhausted — And It's Not Just the Drinking" },
    ],
    episode: {
      id: "Buzzsprout-18749006",
      title: "From Requests To Real Boundaries: How Families Stop Enabling Addiction",
      slug: "from-requests-to-real-boundaries-how-families-stop-enabling-addiction",
    },
    nextSteps: [
      { label: "Join The Family Squares, a free Monday night Zoom for families", href: FAMILY_SQUARES_EMAIL_URL },
      { label: "Tell Matt what's going on", href: "/get-help" },
    ],
  },
  watching: {
    title: "Worried and watching",
    summary:
      "Something feels off, and you're right to pay attention. You don't need proof yet. You need a clear picture. Start writing down what you see, with dates, in a few plain sentences: memory bends toward hope, and a record keeps you honest with yourself. After a bad night, don't pretend it didn't happen; wait until they're sober and say what you saw, calmly and once. And know that asking a professional a question isn't a commitment to anything.",
    articles: [
      {
        slug: "documenting-a-loved-ones-addiction",
        title:
          "The Spiral Notebook: Why Documenting a Loved One's Addiction Is the Most Underrated Thing You Can Do Tonight",
      },
      {
        slug: "what-to-do-after-a-loved-ones-drinking-episode",
        title: "The Morning After Halloween: What to Do After a Loved One's Drinking Episode",
      },
      {
        slug: "you-can-call-and-still-say-no",
        title: "You Can Call and Still Say No: Why Asking for Help Isn't a Commitment",
      },
    ],
    episode: {
      id: "Buzzsprout-18472148",
      title: "You Don't Need Proof, You Need Patterns",
      slug: "you-dont-need-proof-you-need-patterns",
    },
    nextSteps: [
      { label: "The First 72 Hours checklist", href: LEAD_72_HOURS_PATH },
      { label: "Listen to the podcast", href: "/episodes" },
    ],
  },
};

export const CRISIS_LINES = [
  { label: "Immediate danger", detail: "Call 911" },
  { label: "Suicide or mental health crisis", detail: "Call or text 988" },
  { label: "SAMHSA National Helpline (free, confidential, 24/7)", detail: "1-800-662-4357" },
] as const;
