# Python Backend God — Roadmap

**Profile:** Programming beginner-to-intermediate → Python backend expert · Domains: language core, typing, async, CLI, HTTP APIs (FastAPI), data/SQL, architecture · Pace: casual ~3h/wk
**Started:** 2026-06-16

Mark progress: `[ ]` todo · `[~]` in progress · `[x]` done.

## How we work (DO NOT FORGET)
- For each stage/project, Claude gives **instructions + what's expected** — NO written code.
- **User writes all the code.** Learning by doing.
- User says when a project is done. Then Claude **reviews correctness** and **suggests changes** — does not rewrite it for them.
- Claude may scaffold non-code setup (folders, `pyproject.toml`, venv, configs) only when needed.

**Rules**
- **Type-hint everything from Stage 5 on**, and run `mypy --strict` (or `pyright`). `Any` = banned unless justified. Untyped function = incomplete.
- Use a venv + `pyproject.toml` (uv/poetry) from Stage 0. No global installs. `ruff` clean = required from Stage 5.
- Read tracebacks bottom-up slowly — decoding them IS the skill. Same for `mypy` errors.
- Projects build on each other where possible. Reuse, don't throw away. (The "todo" / "expense" themes recur on purpose.)
- **Production-grade only. No shortcuts accepted.** Every solution must hold up as real, shippable code — type hints, validation (Pydantic), proper exception handling, context managers for resources, async correctness, clear structure, dependency injection over globals. If the user takes a shortcut (e.g. bare `except:`, swallowed exception, mutable default arg, file not closed, blocking call in async code, `Any` to dodge a type error), Claude **must point it out explicitly** and **state why it matters** (what breaks, what bug it invites, what it teaches) — never let it slide silently. Learning the *reason* is the point, not just the fix.
- **"Where does this value go?"** — for every expression written, ask where its result goes. If the answer is "nowhere" (computed then discarded, comprehension result ignored, function with implicit `None` return that should return, un-awaited coroutine), it's a bug.
- **"Is it awaited? Is it closed? Is that default mutable?"** — the three Python traps. Every coroutine awaited, every resource in `with`, no mutable default arguments (`def f(x=[])`).

---

## Stage 0 — Setup (1 session)
Topics: Python install, `uv`/venv, `pyproject.toml`, running scripts/modules, `ruff`/`mypy`/`pyright` LSP in editor, REPL.
- [ ] **P0** Hello world. Create venv, run one script + as a module (`python -m`). Break it (NameError, TypeError), read each traceback.

## Stage 1 — Python Core (3-4 wk)
Topics: variables/dynamic typing, `int`/`float`/`str`/`bool`, f-strings, functions, `if`/`elif`/`else`, `for`/`while`, `list`/`tuple`/`dict`/`set`, truthiness, `is` vs `==`.
- [ ] **P1** Tip calculator (CLI input → math → output). Validate input, exit codes (`sys.exit`).
- [ ] **P2** Word counter — count words/chars/lines in text.
- [ ] **P3** FizzBuzz + variants (data-driven rules, no magic `% 15`).

## Stage 2 — Functions, OOP, idioms (4-5 wk)
Topics: `*args`/`**kwargs`, default args (mutable-default trap), comprehensions, `class`, `__init__`, properties, dunder methods, `@dataclass`, inheritance vs composition, `Enum`, exceptions (`raise`/custom).
- [ ] **P4** Expense tracker (in-memory) — `Expense` dataclass, `Category` enum, add/list/total. Encapsulate, raise on bad input.
- [ ] **P5** Shape set — abstract base (`ABC`) area/perimeter, polymorphic list. Show why ABC/protocol beats `if isinstance(...)`.

## Stage 3 — Collections, iterators, functional (3-4 wk)
Topics: `itertools`, `collections` (`defaultdict`/`Counter`/`namedtuple`), generators (`yield`), comprehensions vs `map`/`filter`, `functools` (`reduce`/`cache`), lazy evaluation.
- [ ] **P6** Rewrite expense tracker (P4) reporting — totals per category, top spends, monthly grouping. Use `Counter`/`defaultdict`/comprehensions.
- [ ] **P7** Build a generator pipeline (e.g. lazy file/line processing) + reimplement `map`/`filter`/`reduce` as generators. Understand laziness.

## Stage 4 — Async (4-5 wk)
Topics: `asyncio`, `async`/`await`, coroutines vs tasks, `aiohttp`/`httpx`, `asyncio.gather`, timeouts/cancellation, the "blocking call in event loop" trap, the un-awaited coroutine trap.
- [ ] **P8** Async URL fetcher — fetch N URLs concurrently with `httpx`/`aiohttp`, bounded concurrency (semaphore), timeouts, collect results+errors. No blocking calls in the loop.

## Stage 5 — Typing & modern Python (3-4 wk)
Topics: type hints, `mypy --strict`, generics (`TypeVar`/`Generic`/PEP 695 `class C[T]`), `Protocol`, `Optional`/unions (`X | None`), `Literal`, `TypedDict`, Pydantic models, pattern matching (`match`).
- [ ] **P9** Generic `Result[T, E]` type + helpers (no exceptions for expected failures). `match` on it. `mypy --strict` clean.
- [ ] **P10** Pydantic-based typed config/domain models with validation. Fully typed, `mypy --strict` clean.

## Stage 6 — CLI Tooling (3-4 wk)
Topics: `argparse`/`typer`/`click`, `pathlib`, file IO + context managers, `json`, config/env (`os.environ`/`pydantic-settings`), exit codes, packaging (`pyproject.toml`, entry points, `pipx`).
- [ ] **P11** `todo` CLI — add/list/done/delete, persist to JSON file. Atomic writes, handle corrupt/missing file.
- [ ] **P12** Batch file renamer with `--dry-run`. Package it so it installs as a command via `pipx`.

## Stage 7 — Backend foundations (5-6 wk)
Topics: FastAPI, path/query/body params, Pydantic request/response models, dependency injection (`Depends`), routers, ASGI/uvicorn, SQLAlchemy 2.0 + SQLite, sessions, Alembic migrations.
- [ ] **P13** REST API for todo list — CRUD with FastAPI, in-memory store first, then service injected via `Depends`.
- [ ] **P14** Back P13 with SQLAlchemy 2.0 (async) + SQLite. Alembic migrations, repository pattern, Pydantic DTOs separate from ORM models.

## Stage 8 — Validation, errors, auth (4-5 wk)
Topics: Pydantic validation depth, exception handlers, RFC 7807 `problem+json`, custom error responses, middleware, OAuth2 password flow + JWT, password hashing (`passlib`/`argon2`), settings/secrets.
- [ ] **P15** Add rich validation + consistent JSON error responses + global exception handlers to the todo API. No raw 500s leaking tracebacks.
- [ ] **P16** Add user registration/login (hashed passwords) + JWT (OAuth2 flow). Protect todo routes per-user. Never log secrets.

## Stage 9 — Data, deeper (4-5 wk)
Topics: SQLAlchemy relationships (1:N, N:N), eager/lazy loading, the N+1 trap, transactions, indexes, pagination, optimistic concurrency, connection pooling, raw SQL escape hatch.
- [ ] **P17** Extend schema — users own todos, todos have tags (N:N). Paginated endpoint, fix N+1 with `selectinload`/joins.
- [ ] **P18** Transactional multi-step op (bulk move/complete) with rollback on failure. Add a version/concurrency check.

## Stage 10 — Testing & discipline (4-5 wk)
Topics: `pytest`, fixtures, parametrize, `httpx`/`TestClient` for API tests, test DB, mocking (`unittest.mock`), coverage, `ruff` + `mypy --strict` in CI, pre-commit hooks.
- [ ] **P19** Unit-test services + validators from P15/P16. Parametrized, edge cases, not just happy path.
- [ ] **P20** Integration-test the API end-to-end with `TestClient` + throwaway SQLite. Add CI (GitHub Actions) running `pytest` + `ruff` + `mypy --strict`. Fix every finding.

## Stage 11 — Architecture & advanced (5-6 wk)
Topics: clean/layered architecture, dependency injection patterns, structured logging (`structlog`/`logging`), background tasks (`BackgroundTasks`/Celery/ARQ), caching (Redis), rate limiting, OpenTelemetry, health checks, `pydantic-settings`.
- [ ] **P21** Refactor todo backend into clean layers (domain/application/infrastructure/api) with interfaces (`Protocol`) at boundaries. Structured logging throughout.
- [ ] **P22** Add a background worker (e.g. overdue-todo reminder sweep), read caching (Redis), rate limiting, and a health check endpoint.

## Stage 12 — Capstone
- [ ] **P23** Full backend service from scratch (pick a real domain — not todos). Clean architecture, SQLAlchemy + migrations, auth, validation, tests, Docker + `docker compose`, OpenTelemetry tracing, CI/CD pipeline, README. Production-shippable end to end.

---

## Log
- 2026-06-16 — Plan created.
