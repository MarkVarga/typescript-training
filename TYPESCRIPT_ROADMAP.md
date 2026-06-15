# TypeScript God — Roadmap

**Profile:** JS beginner → TS expert · Domains: type-system, CLI, frontend, backend · Pace: casual ~3h/wk
**Started:** 2026-06-15

Mark progress: `[ ]` todo · `[~]` in progress · `[x]` done.

## How we work (DO NOT FORGET)
- For each stage/project, Claude gives **instructions + what's expected** — NO written code.
- **User writes all the code.** Learning by doing.
- User says when a project is done. Then Claude **reviews correctness** and **suggests changes** — does not rewrite it for them.
- Claude may scaffold non-code setup (folders, configs) only when needed.

**Rules**
- Type everything from Stage 4 on. `any` = banned.
- Read compiler errors slowly — decoding them IS the skill.
- Projects build on each other where possible. Reuse, don't throw away.
- **Production-grade only. No shortcuts accepted.** Every solution must hold up as real, shippable code — proper types, validation, error handling, clear structure. If the user takes a shortcut (e.g. `any`, skipped edge case, hardcoded value, missing validation), Claude **must point it out explicitly** and **state why it matters** (what breaks, what bug it invites, what it teaches) — never let it slide silently. Learning the *reason* is the point, not just the fix.

---

## Stage 0 — Setup (1 session)
Topics: Node, npm/pnpm, `tsc`, `tsconfig.json`, VS Code, `tsx`/`ts-node`.
- [x] **P0** Hello world. `npm init`, install `typescript`, compile + run one `.ts`. Break it, read the error.

## Stage 1 — JS Core via TS (3-4 wk)
Topics: `let`/`const`, primitives, functions, arrays, objects, loops, conditionals, template strings, truthiness, `==` vs `===`.
- [x] **P1** Tip calculator (CLI input → math → output).
- [x] **P2** Word counter — count words/chars/lines in text.
- [ ] **P3** FizzBuzz + variants.

## Stage 2 — JS that bites beginners (3-4 wk)
Topics: closures, scope, `this`, callbacks, `map`/`filter`/`reduce`, spread/rest, destructuring, modules.
- [ ] **P4** Expense tracker (in-memory) — add/list/total via `reduce`.
- [ ] **P5** Reimplement `map`, `filter`, `reduce` yourself.

## Stage 3 — Async (2-3 wk)
Topics: event loop, Promises, `async`/`await`, `fetch`, `try/catch`.
- [ ] **P6** Weather CLI — fetch public API, handle network errors.

## Stage 4 — TS Type Basics (3-4 wk)
Topics: annotations, `interface` vs `type`, unions/intersections, literals, `enum`, optional/readonly, arrays/tuples, `unknown`/`any`/`never`, narrowing.
- [ ] **P7** Fully type the expense tracker (P4). No `any`.
- [ ] **P8** Typed JSON config parser/validator.

## Stage 5 — Functions & Generics (3-4 wk)
Topics: function types, overloads, `generics<T>`, constraints (`extends`), default type params, `keyof`, indexed access.
- [ ] **P9** Generic `Result<T, E>` type + helpers (no exceptions).
- [ ] **P10** Typed collection lib — `Stack<T>`, `Queue<T>`.

## Stage 6 — CLI Tooling (3-4 wk)
Topics: `process.argv`, `commander`/`yargs`, `fs`, `path`, exit codes, npm publish.
- [ ] **P11** `todo` CLI — add/list/done/delete, persist to JSON.
- [ ] **P12** Batch file renamer. Publish to npm (scoped).

## Stage 7 — Backend (4-5 wk)
Topics: HTTP, Express/Fastify, routing, middleware, typed req/res, env vars, SQLite + Prisma/Drizzle, Zod.
- [ ] **P13** REST API for todo list — CRUD + SQLite.
- [ ] **P14** Add Zod validation + typed errors + one auth route.

## Stage 8 — Frontend (4-5 wk)
Topics: DOM types, Vite, React + TS, typed props/state/hooks, events.
- [ ] **P15** Todo UI in vanilla TS + DOM (no framework).
- [ ] **P16** Rebuild in React + TS. Fetch from P13 API. Full stack.

## Stage 9 — Advanced Types (5-6 wk) — wizard tier
Topics: conditional types, mapped types, template literal types, `infer`, recursive types, utility types internals.
- [ ] **P17** Reimplement `Partial`, `Pick`, `Omit`, `ReturnType`.
- [ ] **P18** Type-safe event emitter — payload type checked per event.
- [ ] **P19** Typed router — extract `:id` params via template literals.

## Stage 10 — Library-grade TS (4 wk)
Topics: `.d.ts` files, module augmentation, `declare`, variance, branded types, discriminated unions at scale, `satisfies`.
- [ ] **P20** Write types for an untyped npm package.
- [ ] **P21** Type-safe state machine lib (discriminated unions + exhaustiveness).

## Stage 11 — Pro discipline (ongoing)
Topics: strict tsconfig flags, ESLint + typescript-eslint, Vitest, monorepo project references, build tools.
- [ ] **P22** Add tests + CI + strict mode to an earlier project. Fix every error.

## Stage 12 — Capstone
- [ ] **P23** Full-stack typed app. Shared types backend↔frontend in monorepo, end-to-end safety (e.g. tRPC).

---

## Log
- 2026-06-15 — Plan created.
- 2026-06-15 — Stage 0 done. Setup in `projects/00-setup`. Learned: type annotations, inference, tsc vs tsx, compile-time errors. Note: `@types/node` v25 needs explicit `"types": ["node"]` in tsconfig (auto-include failed).
- 2026-06-15 — P1 done (`projects/01-js-core/src/tip.ts`). Learned: `process.argv`, the `any` trap (require → no types; use global `process`), `Number()`/`Number.isNaN`, validate-before-compute, `console.error`, exit codes, `const` arrow fns not hoisted.
- 2026-06-15 — P2 done (`projects/01-js-core/src/wordcount.ts`). Learned: string `.split`/`.trim`, the `/\s+/` vs `" "` split trap, `"".split` → `[""]` (length 1) empty trap, one-pure-function-per-metric structure, `[]` is truthy (validate with `.length`).
