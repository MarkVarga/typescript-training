# Go Backend God — Roadmap

**Profile:** Programming beginner-to-intermediate → Go backend expert · Domains: language core, concurrency, CLI, HTTP services, data/SQL, architecture · Pace: casual ~3h/wk
**Started:** 2026-06-16

Mark progress: `[ ]` todo · `[~]` in progress · `[x]` done.

## How we work (DO NOT FORGET)
- For each stage/project, Claude gives **instructions + what's expected** — NO written code.
- **User writes all the code.** Learning by doing.
- User says when a project is done. Then Claude **reviews correctness** and **suggests changes** — does not rewrite it for them.
- Claude may scaffold non-code setup (folders, `go.mod`, configs) only when needed.

**Rules**
- **Always handle errors.** Ignoring an `error` return (`_ =` without reason, or not checking) = banned. Error handling IS Go.
- Run `go vet` + `gofmt`/`goimports` always. From Stage 10 on, `golangci-lint` clean = required.
- Read compiler errors and `go vet` output slowly — decoding them IS the skill. Same for race detector output.
- Projects build on each other where possible. Reuse, don't throw away. (The "todo" / "expense" themes recur on purpose.)
- **Production-grade only. No shortcuts accepted.** Every solution must hold up as real, shippable code — checked errors, proper `context.Context` propagation, no goroutine leaks, no data races, clear structure, small interfaces. If the user takes a shortcut (e.g. ignored error, `panic` for control flow, goroutine with no exit, missing `defer Close()`, naked `interface{}`/`any`), Claude **must point it out explicitly** and **state why it matters** (what breaks, what bug it invites, what it teaches) — never let it slide silently. Learning the *reason* is the point, not just the fix.
- **"Where does this value go?"** — for every expression written, ask where its result goes. If the answer is "nowhere" (computed then discarded, error not checked, channel send no one reads, return value ignored), it's a bug.
- **"Does this goroutine ever stop? Is the error checked? Is it deferred-closed?"** — the three Go traps. Every goroutine needs an exit path, every `error` a check, every resource a `defer Close()`.

---

## Stage 0 — Setup (1 session)
Topics: Go install, `go mod init`, `go build`/`run`/`test`, project layout, `gofmt`/`goimports`, `gopls` LSP in editor, `go env`.
- [ ] **P0** Hello world. `go mod init`, build + run. Break it (unused import/var, wrong type), read each error — Go is strict about these on purpose.

## Stage 1 — Go Core (3-4 wk)
Topics: `var`/`:=`, basic types, `string`/`rune`/`byte`, functions (multiple returns), `if`/`switch`, `for` (only loop), slices, maps, `fmt`, `strconv`.
- [ ] **P1** Tip calculator (CLI input → math → output). Validate input, exit codes.
- [ ] **P2** Word counter — count words/chars/lines in text.
- [ ] **P3** FizzBuzz + variants (data-driven rules, no magic `% 15`).

## Stage 2 — Types, structs, methods, errors (4-5 wk)
Topics: `struct`, methods (value vs pointer receiver), `interface` (small, implicit), `error` interface, custom errors, `errors.Is`/`As`/`%w` wrapping, zero values, `iota`/enums.
- [ ] **P4** Expense tracker (in-memory) — `Expense` struct, category type, add/list/total. Methods on types, no global mutable state.
- [ ] **P5** Shape set — `Shape` interface (area/perimeter), polymorphic slice. Show why small implicit interfaces beat type switches.

## Stage 3 — Slices, maps, generics (3-4 wk)
Topics: slice internals (len/cap, append aliasing trap), map idioms, sorting, generics (`[T any]`, constraints), the `comparable` constraint, `slices`/`maps` stdlib packages.
- [ ] **P6** Rewrite expense tracker (P4) reporting — totals per category, top spends, grouping. Use `slices`/`maps` helpers.
- [ ] **P7** Generic helpers — `Map`, `Filter`, `Reduce` over slices with type params + constraints. Understand why Go added these late.

## Stage 4 — Concurrency (4-5 wk)
Topics: goroutines, channels (buffered/unbuffered), `select`, `sync.WaitGroup`/`Mutex`, `context.Context` (cancel/timeout), `-race` detector, goroutine leaks, fan-out/fan-in.
- [ ] **P8** Concurrent URL fetcher — fetch N URLs in parallel, bounded workers, honor `context` timeout/cancel, collect results+errors. Run with `-race`, zero leaks.

## Stage 5 — Stdlib & robustness (3-4 wk)
Topics: `encoding/json`, `time`, `io`/`bufio`, `os`/file IO, `flag`, structured errors, table-driven tests (intro `testing`), `defer`/`panic`/`recover` (proper use).
- [ ] **P9** JSON config parser/validator — load, validate, clear errors. Round-trip safe.
- [ ] **P10** Generic `Result`-ish helpers OR a small typed in-memory store with proper error returns + table-driven tests.

## Stage 6 — CLI Tooling (3-4 wk)
Topics: `flag`/`cobra`, `os.Args`, file/dir IO, atomic writes, `os.Exit` codes, building/distributing a single binary (`go build`, cross-compile).
- [ ] **P11** `todo` CLI — add/list/done/delete, persist to JSON file. Atomic writes, handle corrupt/missing file.
- [ ] **P12** Batch file renamer with `--dry-run`. Cross-compile a binary for another OS.

## Stage 7 — Backend foundations (5-6 wk)
Topics: `net/http`, `http.ServeMux` (Go 1.22+ routing), handlers, middleware, JSON request/response, `context` in requests, graceful shutdown, `database/sql` + SQLite (or Postgres), DTOs.
- [ ] **P13** REST API for todo list — CRUD with `net/http`, in-memory store first, then interface-backed service + DI by hand.
- [ ] **P14** Back P13 with `database/sql` + SQLite. Migrations (e.g. `goose`), prepared statements, repository interface, no SQL injection.

## Stage 8 — Validation, errors, auth (4-5 wk)
Topics: request validation, consistent JSON error envelope / `problem+json`, error-to-status mapping, middleware (logging/recovery/auth), JWT, password hashing (`bcrypt`), config via env.
- [ ] **P15** Add validation + structured JSON error responses + recovery/logging middleware to the todo API. No raw 500s, no leaked stack traces.
- [ ] **P16** Add user registration/login (bcrypt) + JWT. Protect todo routes per-user. Never log secrets.

## Stage 9 — Data, deeper (4-5 wk)
Topics: SQL relationships, transactions (`Tx`), the N+1 trap, indexes, pagination (keyset), `context` deadlines on queries, connection pool tuning, `sqlc` or careful manual mapping.
- [ ] **P17** Extend schema — users own todos, todos have tags (N:N). Paginated endpoint, eliminate N+1 with joins/batching.
- [ ] **P18** Transactional multi-step op (bulk move/complete) with rollback on failure. Add an optimistic-update/version check.

## Stage 10 — Testing & discipline (4-5 wk)
Topics: table-driven tests, `httptest`, test fixtures/golden files, mocking via interfaces, `-race` in CI, `golangci-lint`, coverage, benchmarks (`testing.B`).
- [ ] **P19** Unit-test services + validators from P15/P16. Table-driven, edge cases, not just happy path.
- [ ] **P20** Integration-test the API end-to-end with `httptest` + throwaway SQLite. Add CI (GitHub Actions) with `-race` + `golangci-lint`. Fix every finding.

## Stage 11 — Architecture & advanced (5-6 wk)
Topics: clean/hexagonal layering, dependency injection patterns, `log/slog` structured logging, graceful shutdown, worker/background loops, caching, rate limiting, `OpenTelemetry`, health checks.
- [ ] **P21** Refactor todo backend into clean layers (domain/service/transport/storage) with interfaces at boundaries. `slog` structured logging throughout.
- [ ] **P22** Add a background worker (e.g. overdue-todo sweep) with clean shutdown via `context`, read caching, rate limiting, and a health endpoint.

## Stage 12 — Capstone
- [ ] **P23** Full backend service from scratch (pick a real domain — not todos). Clean architecture, SQL + migrations, auth, validation, tests, Docker + `docker compose`, OpenTelemetry tracing, CI/CD pipeline, README. Single deployable binary, production-shippable end to end.

---

## Log
- 2026-06-16 — Plan created.
