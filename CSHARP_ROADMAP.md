# C# Backend God — Roadmap

**Profile:** Programming beginner-to-intermediate → C# backend expert · Domains: language core, OOP, async, CLI, ASP.NET Core, data/EF Core, architecture · Pace: casual ~3h/wk
**Started:** 2026-06-16

Mark progress: `[ ]` todo · `[~]` in progress · `[x]` done.

## How we work (DO NOT FORGET)
- For each stage/project, Claude gives **instructions + what's expected** — NO written code.
- **User writes all the code.** Learning by doing.
- User says when a project is done. Then Claude **reviews correctness** and **suggests changes** — does not rewrite it for them.
- Claude may scaffold non-code setup (folders, `.csproj`, configs) only when needed.

**Rules**
- Enable **nullable reference types** (`<Nullable>enable</Nullable>`) from Stage 5 on. Suppressing warnings with `!` (null-forgiving) without justification = banned.
- Enable `<TreatWarningsAsErrors>true</TreatWarningsAsErrors>` from Stage 10 on. `dynamic` = banned unless the task explicitly demands it.
- Read compiler errors slowly — decoding them IS the skill. Same for analyzer warnings and stack traces.
- Projects build on each other where possible. Reuse, don't throw away. (The "todo" / "expense" themes recur on purpose.)
- **Production-grade only. No shortcuts accepted.** Every solution must hold up as real, shippable code — proper types, validation, error handling, async all the way, clear structure, DI over `new`. If the user takes a shortcut (e.g. swallowed exception, blocking `.Result`/`.Wait()`, hardcoded connection string, missing validation, leaked `IDisposable`), Claude **must point it out explicitly** and **state why it matters** (what breaks, what bug it invites, what it teaches) — never let it slide silently. Learning the *reason* is the point, not just the fix.
- **"Where does this value go?"** — for every expression written, ask where its result goes. If the answer is "nowhere" (computed then discarded, method with unused return, LINQ result never enumerated, fire-and-forget `Task` not awaited), it's a bug.
- **"Is this disposed? Is this awaited?"** — the two C# traps. Every `IDisposable` needs `using`/lifetime ownership; every `Task` needs `await` or a deliberate reason not to.

---

## Stage 0 — Setup (1 session)
Topics: .NET SDK, `dotnet` CLI, `dotnet new`/`build`/`run`, project structure, `.csproj`, VS Code / Rider, `dotnet watch`.
- [ ] **P0** Hello world. `dotnet new console`, build + run. Break it (typo, missing semicolon, wrong type), read each error.

## Stage 1 — C# Core (3-4 wk)
Topics: `var`/explicit types, value types, `string` interpolation, methods, arrays, `if`/`switch`, loops, operators, `Console` I/O, `int.TryParse`.
- [ ] **P1** Tip calculator (CLI input → math → output). Validate input, exit codes.
- [ ] **P2** Word counter — count words/chars/lines in text.
- [ ] **P3** FizzBuzz + variants (data-driven rules, no magic `% 15`).

## Stage 2 — OOP & C# that bites (4-5 wk)
Topics: classes vs structs, properties (auto/computed), constructors, `readonly`/`init`, access modifiers, interfaces, inheritance, polymorphism, `enum`, value vs reference semantics, `static`, `null` basics.
- [ ] **P4** Expense tracker (in-memory) — `Expense` class, `Category` enum, add/list/total. Encapsulate state, no public mutable fields.
- [ ] **P5** Shape hierarchy — `IShape` interface, area/perimeter, polymorphic list. Show why interface beats `if (type == ...)`.

## Stage 3 — Collections & LINQ (3-4 wk)
Topics: `List<T>`, `Dictionary<TK,TV>`, `HashSet<T>`, `IEnumerable<T>`, LINQ (`Where`/`Select`/`Aggregate`/`GroupBy`/`OrderBy`), deferred execution, `IEnumerable` vs `List` materialization.
- [ ] **P6** Rewrite expense tracker (P4) totals/reports with LINQ — totals per category, top spends, monthly grouping.
- [ ] **P7** Reimplement `Where`, `Select`, `Aggregate` yourself as extension methods (`yield return`). Prove you understand deferred execution.

## Stage 4 — Async (3-4 wk)
Topics: `Task`/`Task<T>`, `async`/`await`, `HttpClient` (typed, injected, not `new` per call), `CancellationToken`, exception handling, the `.Result`/`.Wait()` deadlock trap, `ConfigureAwait`.
- [ ] **P8** Weather CLI — `async` fetch from public API, handle network/timeout errors, honor a `CancellationToken`. No blocking calls.

## Stage 5 — Modern type system (3-4 wk)
Topics: nullable reference types (turn ON here), generics `<T>`, constraints (`where T :`), `record` types, pattern matching (`switch` expressions, property/relational patterns), tuples, `Span`/`readonly` awareness.
- [ ] **P9** Generic `Result<T, TError>` type + helpers (no exceptions for expected failures). Pattern-match on it.
- [ ] **P10** Typed collection lib — `Stack<T>`, `Queue<T>` from scratch with constraints + nullability correct.

## Stage 6 — CLI Tooling (3-4 wk)
Topics: `args`, `System.CommandLine`, `System.IO` (`File`/`Path`/`Directory`), `System.Text.Json`, config (`IConfiguration`/`appsettings.json`), exit codes, packaging a tool (`dotnet pack`/`dotnet tool`).
- [ ] **P11** `todo` CLI — add/list/done/delete, persist to JSON file. Atomic writes, handle corrupt/missing file.
- [ ] **P12** Batch file renamer with `--dry-run`. Pack as a global `dotnet tool`.

## Stage 7 — Backend foundations (5-6 wk)
Topics: ASP.NET Core minimal APIs, routing, HTTP verbs/status codes, dependency injection container, `appsettings`/environments, EF Core + SQLite, `DbContext`, migrations, typed request/response DTOs.
- [ ] **P13** REST API for todo list — CRUD endpoints, in-memory store first, then DI-wired service.
- [ ] **P14** Back P13 with EF Core + SQLite. Migrations, async repository, DTO ↔ entity mapping (no leaking entities).

## Stage 8 — Validation, errors, auth (4-5 wk)
Topics: model validation (DataAnnotations / FluentValidation), `ProblemDetails`, exception-handling middleware, `Result` → HTTP mapping, JWT auth, `[Authorize]`, password hashing, secrets management.
- [ ] **P15** Add FluentValidation + RFC 7807 `ProblemDetails` + global error middleware to the todo API. No raw 500s leaking stack traces.
- [ ] **P16** Add user registration/login with hashed passwords + JWT. Protect todo routes per-user. Never log secrets.

## Stage 9 — Data & persistence, deeper (4-5 wk)
Topics: EF Core relationships (1:N, N:N), eager/lazy/explicit loading, the N+1 trap, transactions, concurrency tokens, indexes, pagination, raw SQL escape hatch.
- [ ] **P17** Extend schema — users own todos, todos have tags (N:N). Paginated list endpoint, fix any N+1 with projection.
- [ ] **P18** Add optimistic concurrency + a transactional multi-step operation (e.g. bulk move/complete). Prove rollback on failure.

## Stage 10 — Testing & discipline (4-5 wk)
Topics: xUnit, `Theory`/`Fact`, FluentAssertions, mocking (NSubstitute/Moq), `WebApplicationFactory` integration tests, test DB, code coverage, analyzers, `TreatWarningsAsErrors`, CI.
- [ ] **P19** Unit-test services + validators from P15/P16. Cover edge cases, not just happy path.
- [ ] **P20** Integration-test the todo API end-to-end with `WebApplicationFactory` + a throwaway SQLite DB. Add CI (GitHub Actions) + strict warnings. Fix every warning.

## Stage 11 — Architecture & advanced (5-6 wk)
Topics: layered/clean architecture, CQRS + MediatR, caching (`IMemoryCache`/`HybridCache`), `IHostedService`/`BackgroundService`, logging (`ILogger`, structured), `OpenTelemetry`, options pattern, rate limiting.
- [ ] **P21** Refactor the todo backend into clean layers (Domain/Application/Infrastructure/Api). Introduce MediatR commands/queries.
- [ ] **P22** Add a `BackgroundService` (e.g. overdue-todo reminder sweep), caching on reads, structured logging + a health check endpoint.

## Stage 12 — Capstone
- [ ] **P23** Full backend service from scratch (pick a real domain — not todos). Clean architecture, EF Core, auth, validation, tests, Docker + `docker compose`, OpenTelemetry tracing, CI/CD pipeline, README. Production-shippable end to end.

---

## Log
- 2026-06-16 — Plan created.
