// Unit tests for the /family-check-in scoring and the copy it shares with the
// newsletter-signup email. Run with `npm run test:quiz` (Node 22.18+ strips TypeScript types).
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { assignEpisodeSlugs } from "../src/lib/episodeSlug.js";
import {
  QUIZ_QUESTIONS,
  QUIZ_RESULTS,
  QUIZ_RESULT_IDS,
  STUCK_MAX,
  WATCHING_MAX,
  isQuizResultId,
  quizScore,
  scoreQuiz,
} from "../src/lib/familyCheckIn.ts";
import { QUIZ_RESULT_EMAILS, quizSource, quizTag } from "../supabase/functions/_shared/family-check-in.ts";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let checks = 0;
const check = (fn) => {
  fn();
  checks++;
};

const scored = QUIZ_QUESTIONS.filter((question) => question.options.some((option) => !option.safety && option.points > 0));
const safetyAnswers = QUIZ_QUESTIONS.flatMap((question) =>
  question.options.filter((option) => option.safety).map((option) => [question.id, option.id]),
);

// Shape: 6-8 questions, unique ids, points 0-3, at least one safety answer.
check(() => assert(QUIZ_QUESTIONS.length >= 6 && QUIZ_QUESTIONS.length <= 8, "6-8 questions"));
check(() => assert.equal(new Set(QUIZ_QUESTIONS.map((q) => q.id)).size, QUIZ_QUESTIONS.length, "unique question ids"));
for (const question of QUIZ_QUESTIONS) {
  check(() => assert.equal(new Set(question.options.map((o) => o.id)).size, question.options.length, `${question.id}: unique option ids`));
  for (const option of question.options) {
    check(() => assert(Number.isInteger(option.points) && option.points >= 0 && option.points <= 3, `${question.id}/${option.id}: points`));
  }
}
check(() => assert(safetyAnswers.length >= 5, "safety answers cover overdose, violence, suicide, driving, withdrawal"));

/** Lowest (or highest) non-safety answer for every question, then overrides. */
const answersWith = (pick, overrides = {}) =>
  Object.fromEntries(
    QUIZ_QUESTIONS.map((question) => {
      const options = question.options.filter((option) => !option.safety);
      const sorted = [...options].sort((a, b) => a.points - b.points);
      return [question.id, overrides[question.id] ?? (pick === "max" ? sorted.at(-1) : sorted[0]).id];
    }),
  );

// Every safety answer forces "crisis", alone, alongside the calmest answers, or the most urgent.
for (const [questionId, optionId] of safetyAnswers) {
  check(() => assert.equal(scoreQuiz({ [questionId]: optionId }), "crisis", `${questionId}/${optionId} alone`));
  check(() => assert.equal(scoreQuiz(answersWith("min", { [questionId]: optionId })), "crisis", `${questionId}/${optionId} with calm answers`));
  check(() => assert.equal(scoreQuiz(answersWith("max", { [questionId]: optionId })), "crisis", `${questionId}/${optionId} with urgent answers`));
}

// No safety answer never yields crisis; the extremes land where expected.
check(() => assert.equal(quizScore(answersWith("min")), 0));
check(() => assert.equal(scoreQuiz(answersWith("min")), "watching"));
check(() => assert.equal(scoreQuiz(answersWith("max")), "ready"));
check(() => assert.equal(scoreQuiz({}), "watching", "empty answers"));
check(() => assert.equal(scoreQuiz({ pattern: "not-a-real-option" }), "watching", "unknown option ids score 0"));

// Build answer sets hitting an exact score by raising questions one point at a time.
const answersForScore = (target) => {
  const answers = answersWith("min");
  let remaining = target;
  for (const question of scored) {
    const options = question.options.filter((o) => !o.safety).sort((a, b) => a.points - b.points);
    const best = [...options].reverse().find((o) => o.points <= remaining) ?? options[0];
    answers[question.id] = best.id;
    remaining -= best.points;
  }
  assert.equal(remaining, 0, `could not build score ${target}`);
  assert.equal(quizScore(answers), target);
  return answers;
};
const maxScore = quizScore(answersWith("max"));
check(() => assert.equal(maxScore, 21));
for (let score = 0; score <= maxScore; score++) {
  const expected = score <= WATCHING_MAX ? "watching" : score <= STUCK_MAX ? "stuck" : "ready";
  check(() => assert.equal(scoreQuiz(answersForScore(score)), expected, `score ${score}`));
}
// The boundaries themselves.
check(() => assert.equal(scoreQuiz(answersForScore(WATCHING_MAX)), "watching"));
check(() => assert.equal(scoreQuiz(answersForScore(WATCHING_MAX + 1)), "stuck"));
check(() => assert.equal(scoreQuiz(answersForScore(STUCK_MAX)), "stuck"));
check(() => assert.equal(scoreQuiz(answersForScore(STUCK_MAX + 1)), "ready"));
// Realistic paths: every answer "2" is the classic cycle; one-pointers are early worry.
const allAt = (points) =>
  Object.fromEntries(
    QUIZ_QUESTIONS.map((q) => [q.id, (q.options.find((o) => !o.safety && o.points === points) ?? q.options.find((o) => !o.safety)).id]),
  );
check(() => assert.equal(scoreQuiz(allAt(1)), "watching"));
check(() => assert.equal(scoreQuiz(allAt(2)), "stuck"));
check(() => assert.equal(scoreQuiz(allAt(3)), "ready"));

// Result ids, shared copy, and links.
check(() => assert.deepEqual([...QUIZ_RESULT_IDS].sort(), Object.keys(QUIZ_RESULTS).sort()));
check(() => assert(!isQuizResultId("nope") && !isQuizResultId(undefined) && isQuizResultId("crisis")));
const blogIds = new Set(
  Array.from(fs.readFileSync(path.join(projectRoot, "src/data/blogData.ts"), "utf8").matchAll(/id:\s*"([^"]+)"/g), (m) => m[1]),
);
const snapshotJson = fs
  .readFileSync(path.join(projectRoot, "src/data/podcastFeedSnapshot.ts"), "utf8")
  .match(/=\s*(\{[\s\S]*\})\s*satisfies\s+PodcastInfo/)?.[1];
const episodes = JSON.parse(snapshotJson).episodes;
const slugs = assignEpisodeSlugs(episodes);
const routes = new Set(JSON.parse(fs.readFileSync(path.join(projectRoot, "public/prerender-routes.json"), "utf8")).routes);
for (const id of QUIZ_RESULT_IDS) {
  const email = QUIZ_RESULT_EMAILS[id];
  check(() => assert(email.articles.length >= 2 && email.articles.length <= 3, `${id}: 2-3 articles`));
  for (const article of email.articles) check(() => assert(blogIds.has(article.slug), `${id}: unknown blog slug ${article.slug}`));
  check(() => assert(episodes.some((episode) => episode.id === email.episode.id), `${id}: episode not in snapshot`));
  check(() => assert.equal(slugs.get(email.episode.id), email.episode.slug, `${id}: email episode slug is stale`));
  for (const step of email.nextSteps) {
    if (step.href.startsWith("/")) check(() => assert(routes.has(step.href), `${id}: next step ${step.href} is not a public route`));
    else check(() => assert(step.href.startsWith("https://"), `${id}: next step must be https`));
  }
  check(() => assert.equal(quizSource(id), `quiz_${id}`));
  check(() => assert.equal(quizTag(id), `quiz:${id}`));
}

console.log(`Family check-in tests passed: ${checks} checks, ${safetyAnswers.length} safety answers, scores 0-${maxScore}.`);
