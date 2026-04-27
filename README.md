# WESLLEYFLIX

A Netflix-style catalog app I built end-to-end as a learning playground for Clean
Architecture on the backend and Feature-Sliced Design on the frontend. Users can
sign up, browse movies and series grouped by genre, search the catalog, leave
ratings and comments, and (with admin intent) create new entries and genres.

It is intentionally small — the point is the shape of the project, not the
feature count. If you're poking around to learn how the layers fit together, you
came to the right place.

---

## Screenshots

<p align="center">
  <img src="docs/screenshots/landing.png" alt="Landing page" width="49%" />
  <img src="docs/screenshots/movies-home.png" alt="Movies home" width="49%" />
</p>
<p align="center">
  <img src="docs/screenshots/movie-details.png" alt="Movie details" width="49%" />
  <img src="docs/screenshots/login.png" alt="Login" width="49%" />
</p>

---

## Stack

**Backend** — Node 20+, Express 5, TypeScript, Prisma ORM, MySQL 8, Zod for
input validation, JWT for auth, bcrypt for password hashing.

**Frontend** — React 19, TypeScript, Vite, Tailwind CSS, React Router 7,
TanStack Query, Zustand (with `persist`), React Hook Form + Zod.

---

## Repository layout

```
.
├── backend/      Express API, Prisma schema and migrations
├── frontend/     React SPA
└── README.md     this file
```

Both halves run independently. They talk to each other over HTTP and only
share a contract — the request/response payloads — not code.

---

## Getting it running locally

### 1. Prerequisites

- Node.js 20 or newer
- A reachable MySQL 8 instance (Docker or local install)
- npm (Yarn / pnpm work too, scripts are vanilla `npm`)

### 2. Database

Spin up a MySQL container if you don't already have one:

```bash
docker run --name wflix -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=wflix -p 3306:3306 -d mysql:8
```

### 3. Backend

```bash
cd backend
cp .env.example .env       # if you don't have one yet, see "Env vars" below
npm install
npx prisma migrate deploy  # applies the existing migrations
npm run db:seed            # optional: populate demo data (10 genres, 12 movies, 10 series)
npm run dev                # starts on http://localhost:3000
```

You should see `Server running on port 3000`. Hit `GET /ping` and you'll get
`"pong"` back. If you ran the seed, log in with
`demo@wflix.test` / `demo1234`.

### 4. Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev                # starts on http://localhost:5173
```

Open `http://localhost:5173`, register a user, and you're in.

> The catalog starts empty. Create a couple of genres at `/genres/register`,
> then add a movie or series — they'll start showing up on the home rows.

### Env vars

`backend/.env`

```
DATABASE_URL="mysql://root:root@localhost:3306/wflix"
JWT_SECRET=<any long random string>
PORT=3000  # optional, defaults to 3000
```

`frontend/.env`

```
VITE_API_URL=http://localhost:3000
```

---

## Why the project is shaped this way

I made two architectural bets and then stuck to them. They're more interesting
than the feature list.

### Backend: Clean Architecture, four-layer slice per resource

Each request walks through the same lanes:

```
HTTP request
   │
   ▼
main/routes/*.ts          ── Express wiring. Each private route stacks
                             `requireAuth` and `validate(schema)` before the
                             handler, so by the time the controller runs the
                             caller is authenticated and the input is typed.
   │
   ▼
infrastructure/factories  ── Composition root. Builds the controller graph
                             (repository → useCase → controller). One factory
                             per endpoint keeps DI explicit and easy to follow.
   │
   ▼
presentation/controllers  ── Translates the HTTP envelope into a typed input,
                             calls the useCase, builds the HTTP response. No
                             framework code beyond the input/output types.
   │
   ▼
application/useCases      ── The actual business logic. Depends on a
                             repository port (`I*Repository`), never on the
                             concrete Prisma class.
   │
   ▼
infrastructure/repositories
                          ── Implements its port. Talks to the database via
                             Prisma. Swap this layer and nothing above needs
                             to change.
```

`shared/` holds cross-cutting bits (`AppError`, the logger, the JWT helper).
`presentation/middlewares/` carries `requireAuth` and the Zod `validate`
factory; `presentation/schemas/` holds one schema file per resource.
Repository, use-case and controller ports live next to the layer that owns
the contract — see `application/repositories/ports/`,
`application/useCases/ports/` and `presentation/controllers/ports/`.
`domain/` is just the type contracts that flow between layers — no behavior.

The reason for the layering: I wanted to be able to add a new endpoint by
copying an existing slice and changing a handful of lines, and to be able to
swap MySQL for something else without touching the controllers or use cases.
The factories are the only place where concrete classes meet, so dependency
direction stays clean.

The Express adapter (`infrastructure/adapters/expressRoute.adapter.ts`) is the
one piece of glue that bridges the framework to the controller. Errors from
any layer that throw an `AppError` get translated to the right HTTP status; the
rest fall through to a 500 with a generic message and a server-side log.
Failed validation produces a 401 (missing/invalid bearer) or a 400 with the
offending field paths in the response body.

### Frontend: Feature-Sliced Design

Five layers, each one allowed to import only from the layers below it:

```
app       ── providers, router, layouts, the http instance + interceptors
pages     ── one folder per URL; pages compose features and entities
widgets   ── large reusable UI blocks (the navbar lives here)
features  ── user actions: forms, mutations, anything that *does* something
entities  ── domain models and read queries (movies, series, genres, session)
shared    ── the design system: Button, Card, Input, FormField, Loading, ...
```

A page is allowed to pull from features, entities, and shared. A feature can
pull from entities and shared. An entity can only pull from shared. The
discipline pays off the moment two pages need the same thing — the answer is
already in the right place.

State management is split by purpose:

- **Server state** lives in TanStack Query. Every read endpoint is a `useQuery`
  with a stable key; every write endpoint is a `useMutation` that invalidates
  the relevant key on success. Cache and refetch behavior is consistent across
  the app instead of being re-implemented per page.
- **Auth state** lives in a tiny Zustand store with `persist`, so the JWT
  survives page reloads. The HTTP interceptor reads the token from that store
  on every request, and on a 401 it clears the store and bounces the user to
  `/login`.
- **Form state** lives in React Hook Form. Zod schemas double as runtime
  validators and as the source of truth for the form's TypeScript type, so the
  type drift problem just doesn't happen.

The HTTP layer is also split intentionally: `shared/api/http.ts` is a bare
Axios instance with the base URL — perfect for tests. `app/api/http.ts`
re-exports the same instance after attaching the auth interceptor and the 401
redirect. The first import in `main.tsx` is the wrapped one, so by the time
React mounts, every request already carries the bearer token.

---

## Routes

### Backend

| Method | Path                       | What it does                              |
| ------ | -------------------------- | ----------------------------------------- |
| GET    | `/ping`                    | Health check                              |
| POST   | `/auth/register`           | Create a user                             |
| POST   | `/auth/login`              | Issue a JWT                               |
| POST   | `/movie/register`          | Create a movie                            |
| GET    | `/movie/list`              | List/filter movies (`title`, `genre`)     |
| GET    | `/movie/details`           | Movie + average rating + genres           |
| GET    | `/movie/comments`          | Comments on a movie                       |
| GET    | `/movie/comments-rate`     | Comments + average rating in one call     |
| PUT    | `/movie/updater/:id`       | Update a movie                            |
| POST   | `/serie/register`          | Create a series                           |
| GET    | `/serie/list`              | List/filter series (`title`, `genre`)     |
| GET    | `/serie/details`           | Series + average rating + genres          |
| POST   | `/comment/movie`           | Comment on a movie                        |
| POST   | `/comment/serie`           | Comment on a series                       |
| GET    | `/comments/serie`          | Comments on a series                      |
| PATCH  | `/comment/:id`             | Edit a comment                            |
| DELETE | `/comment/:id`             | Delete a comment                          |
| POST   | `/rate/register-movie`     | Rate a movie (integer 1–10)               |
| POST   | `/rate/register-serie`     | Rate a series (integer 1–10)              |
| GET    | `/rate/movie`              | Aggregate movie rating                    |
| GET    | `/rate/serie`              | Aggregate series rating                   |
| POST   | `/genre/register`          | Create a genre                            |
| GET    | `/genre/list`              | All genres                                |
| GET    | `/genre/movie-list`        | Movies grouped by genre (home carousel)   |
| GET    | `/genre/serie-list`        | Series grouped by genre (home carousel)   |
| POST   | `/genreMovie/register`     | Attach genres to a movie                  |

### Frontend

| Path                | Page                                          |
| ------------------- | --------------------------------------------- |
| `/`                 | Landing                                       |
| `/login`            | Login                                         |
| `/register`         | Sign up                                       |
| `/movies`           | Movie home (carousels by genre)               |
| `/movies/list`      | Browse / search results                       |
| `/movies/register`  | Create a movie                                |
| `/movies/details`   | Movie detail (rating, comments)               |
| `/movies/edit`      | Edit a movie                                  |
| `/series`           | Series home                                   |
| `/series/list`      | Browse / search results                       |
| `/series/register`  | Create a series                               |
| `/series/details`   | Series detail (rating, comments)              |
| `/genres/register`  | Create a genre + see existing ones            |
| `/profile`          | Account info + log out                        |

Anything not in this list lands on `/` thanks to a catch-all redirect.

---

## Database

Eight tables, all owned by Prisma:

- `users` — email + bcrypt-hashed password
- `movies`, `series` — the catalog itself
- `seasons` — series can have seasons (table is in place; UI for it is future work)
- `genres` — shared between movies and series
- `movies_genres`, `series_genres` — many-to-many join tables
- `rates` — one row per (user, movie\|series), 1–10 integer
- `comments` — text, scoped to either a movie or a series

The schema lives in `backend/prisma/schema.prisma`. To apply changes:

```bash
cd backend
npx prisma migrate dev --name <change-name>   # generates a new migration
npx prisma generate                            # regenerates the client
```

---

## Useful scripts

From `backend/`:

| Command           | What it runs                                |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | `ts-node-dev` with auto-restart             |
| `npm run build`   | TypeScript compile to `dist/`               |
| `npm run start`   | Run the compiled output                     |
| `npm run lint`    | ESLint                                      |
| `npm run db:seed` | Populate the database with demo data        |

From `frontend/`:

| Command           | What it runs                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Vite dev server                           |
| `npm run build`   | `tsc -b && vite build`                    |
| `npm run preview` | Serve the production build locally        |
| `npm run lint`    | ESLint                                    |

---

## Things I deliberately left out

- **No tests yet.** The architecture is designed to make use cases trivial to
  unit-test (they only depend on a repository interface), but I haven't written
  the suites. They're the obvious next step.
- **No refresh tokens.** The JWT lifetime is short and a 401 just kicks you
  back to login. Adding a refresh flow is a few hours of work but doesn't
  change anything structural.
- **No image uploads.** Posters are URLs you paste in. Wiring an S3 / R2
  upload would slot into the existing register form without changing the
  layers around it.
- **No pagination on the list pages.** The repository already takes
  `limit`/`page` — the UI just doesn't expose them yet.

---

## License

Personal/educational project — use it however you like.
