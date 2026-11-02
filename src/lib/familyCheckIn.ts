// "Where is your family right now?" check-in at /family-check-in.
// Scoring is deterministic and runs only in the browser; answers are never sent anywhere.
// The text the follow-up email needs lives in supabase/functions/_shared/family-check-in.ts
// so the page and the email can't drift apart. Tested by scripts/test-family-check-in.mjs.
import {
  QUIZ_RESULT_EMAILS,
  QUIZ_RESULT_IDS,
  isQuizResultId,
  type QuizResultId,
} from "../../supabase/functions/_shared/family-check-in.ts";

export { QUIZ_RESULT_IDS, isQuizResultId, type QuizResultId };

export interface QuizOption {
  id: string;
  label: string;
  /** 0 (calm) to 3 (most urgent / most ready). Ignored when `safety` is set. */
  points: number;
  /** A safety answer: overdose risk, violence, suicidal talk, impaired driving, dangerous withdrawal. */
  safety?: boolean;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  hint?: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "pattern",
    prompt: "Over the last few months, how has the drinking or drug use changed?",
    options: [
      { id: "unsure", label: "I'm not sure it's a problem yet. Something just feels off.", points: 0 },
      { id: "comes-and-goes", label: "It comes and goes: bad nights, then calm stretches.", points: 1 },
      { id: "worse", label: "It's happening more often, or it's getting worse.", points: 2 },
      { id: "constant", label: "It runs most days now.", points: 3 },
    ],
  },
  {
    id: "safety",
    prompt: "In the past month, has any of this happened?",
    hint: "If more than one fits, pick the one that worries you most.",
    options: [
      { id: "none", label: "None of these", points: 0 },
      { id: "overdose", label: "An overdose, a close call, or a time I couldn't wake them", points: 0, safety: true },
      { id: "violence", label: "Violence or threats, or someone at home feeling unsafe", points: 0, safety: true },
      { id: "suicide", label: "Talk of suicide, wanting to die, or self-harm", points: 0, safety: true },
      { id: "driving", label: "Driving drunk or high", points: 0, safety: true },
      { id: "withdrawal", label: "Seizures, severe shaking, or confusion when they stop drinking or using", points: 0, safety: true },
    ],
  },
  {
    id: "promises",
    prompt: "When they promise to cut back or quit, what usually happens?",
    options: [
      { id: "never-discussed", label: "We haven't really talked about it.", points: 0 },
      { id: "creeps-back", label: "They cut back for a while, then it creeps back.", points: 1 },
      { id: "broken", label: "The promises keep coming, and they keep breaking.", points: 2 },
      { id: "relapsed", label: "They got sober for a stretch, then relapsed.", points: 2 },
      { id: "denies", label: "They've stopped promising. They say it's not a problem.", points: 3 },
    ],
  },
  {
    id: "family",
    prompt: "How is the rest of the family handling it?",
    options: [
      { id: "unaware", label: "Most of them don't know, or don't see it yet.", points: 0 },
      { id: "silent", label: "We see it, but nobody talks about it.", points: 1 },
      { id: "divided", label: "We argue about it. Some cover for them, some are angry.", points: 2 },
      { id: "aligned", label: "At least one or two of us agree something has to change.", points: 3 },
    ],
  },
  {
    id: "tried",
    prompt: "What has your family already tried?",
    options: [
      { id: "nothing", label: "Nothing yet. I'm still trying to understand it.", points: 0 },
      { id: "talking", label: "Talking, hinting, and hoping it passes.", points: 1 },
      { id: "rescuing", label: "Covering, paying, or cleaning up after them.", points: 2 },
      { id: "treatment", label: "Ultimatums, boundaries that didn't hold, or treatment that didn't stick.", points: 3 },
    ],
  },
  {
    id: "cost",
    prompt: "What has it cost so far?",
    options: [
      { id: "nothing-visible", label: "Nothing I could point to yet.", points: 0 },
      { id: "small", label: "Missed plans, embarrassing nights, money that doesn't add up.", points: 1 },
      { id: "slipping", label: "Work, school, health, or money are clearly slipping.", points: 2 },
      { id: "serious", label: "An arrest, an ER visit, a lost job, or kids who are seeing it.", points: 3 },
    ],
  },
  {
    id: "you",
    prompt: "And how are you doing, honestly?",
    options: [
      { id: "okay", label: "I'm worried, but I'm okay.", points: 0 },
      { id: "tired", label: "I'm tired. I think about it more than I'd like.", points: 1 },
      { id: "exhausted", label: "I'm exhausted. I'm not sleeping, and it's taking over my life.", points: 2 },
      { id: "done-waiting", label: "I'm done waiting. I want a plan.", points: 3 },
      { id: "not-safe", label: "I'm at the end of my rope and I've thought about hurting myself.", points: 0, safety: true },
    ],
  },
  {
    id: "willingness",
    prompt: "If you brought up getting help this week, what would they do?",
    options: [
      { id: "unknown", label: "I honestly don't know. We've never gone there.", points: 0 },
      { id: "laugh-off", label: "Laugh it off or change the subject.", points: 1 },
      { id: "angry-promise", label: "Get angry, then promise to do better.", points: 2 },
      { id: "might-say-yes", label: "They might say yes. They've been scared lately.", points: 3 },
    ],
  },
];

/** Inclusive upper bound for "watching"; "stuck" runs to STUCK_MAX; anything above is "ready". */
export const WATCHING_MAX = 7;
export const STUCK_MAX = 14;

export type QuizAnswers = Record<string, string>;

const findOption = (questionId: string, optionId: string | undefined) =>
  QUIZ_QUESTIONS.find((question) => question.id === questionId)?.options.find((option) => option.id === optionId);

export const isSafetyAnswer = (questionId: string, optionId: string | undefined) =>
  Boolean(findOption(questionId, optionId)?.safety);

export const quizScore = (answers: QuizAnswers) =>
  QUIZ_QUESTIONS.reduce((total, question) => total + (findOption(question.id, answers[question.id])?.points ?? 0), 0);

/**
 * Any safety answer means "crisis", whatever else was chosen. Otherwise the points add up
 * (0-21 across the seven scored questions): 0-7 watching, 8-14 stuck, 15+ ready.
 */
export const scoreQuiz = (answers: QuizAnswers): QuizResultId => {
  if (QUIZ_QUESTIONS.some((question) => isSafetyAnswer(question.id, answers[question.id]))) return "crisis";
  const score = quizScore(answers);
  if (score <= WATCHING_MAX) return "watching";
  if (score <= STUCK_MAX) return "stuck";
  return "ready";
};

export interface QuizResultDetails {
  id: QuizResultId;
  title: string;
  summary: string;
  articleSlugs: string[];
  episodeId: string;
  episodeTitle: string;
  /** Short heading for the result card. */
  headline: string;
  /** What to do this week, in plain steps (page only). */
  thisWeek: string[];
}

const PAGE_COPY: Record<QuizResultId, { headline: string; thisWeek: string[] }> = {
  crisis: {
    headline: "Safety first. Everything else can wait.",
    thisWeek: [
      "If you can't wake them, call 911, give naloxone if you have it, and stay with them. Naloxone can wear off before the drugs do, so the ambulance still matters.",
      "If anyone is being threatened, or someone is talking about suicide, call 911 or call or text 988. Get yourself and the kids somewhere safe.",
      "Don't make permanent decisions in a temporary crisis. Get through tonight, then think.",
      "Once everyone is safe, call a professional before you call a family meeting. The day or three after a crisis is often when the door cracks open.",
    ],
  },
  ready: {
    headline: "You've seen enough. It's time for a real plan.",
    thisWeek: [
      "Write down a rough timeline, what you're paying for each month, who could be in the room, and any medical or treatment history.",
      "Make the call from a quiet room and give it 30 minutes. Your first sentence can be as simple as \"I don't know what to do next.\"",
      "Decide what you're no longer willing to do. You don't have to be sure yet, just honest.",
    ],
  },
  stuck: {
    headline: "The same loop keeps repeating. You can step out of it.",
    thisWeek: [
      "Pick one thing you usually clean up (the call to the boss, the money, the excuse to the family) and don't do it this time.",
      "Write one boundary down: the line, what you will do, and the support you'll still offer.",
      "Say it once, calmly, and expect pushback. Pushback often means it's working.",
      "Get support for yourself. You can't hold a line on empty.",
    ],
  },
  watching: {
    headline: "Something feels off, and you're right to pay attention.",
    thisWeek: [
      "Start a private, dated record: what you saw, what it cost, how it affected you. Five minutes, facts only.",
      "After the next bad night, wait until they're sober and say what you saw, calmly and once.",
      "Tell one person you trust what's going on. You weren't meant to carry this alone.",
    ],
  },
};

export const QUIZ_RESULTS: Record<QuizResultId, QuizResultDetails> = Object.fromEntries(
  QUIZ_RESULT_IDS.map((id) => {
    const shared = QUIZ_RESULT_EMAILS[id];
    return [
      id,
      {
        id,
        title: shared.title,
        summary: shared.summary,
        articleSlugs: shared.articles.map((article) => article.slug),
        episodeId: shared.episode.id,
        episodeTitle: shared.episode.title,
        ...PAGE_COPY[id],
      },
    ];
  }),
) as Record<QuizResultId, QuizResultDetails>;
