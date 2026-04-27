# Backend

Express 5 + Prisma + MySQL. Architecture and run instructions are in the
[root README](../README.md).

Quick reference:

```bash
npm install
cp .env.example .env
npx prisma migrate deploy
npm run db:seed  # optional: demo user, genres, movies, series
npm run dev      # http://localhost:3000
npm run build    # tsc → dist/
npm run lint
```

The seed creates `demo@wflix.test` / `demo1234`. Re-running it wipes and
re-creates the demo user's content, so it stays idempotent.

Per-request flow:

```
route → requireAuth → validate → factory → controller → useCase → repository → Prisma
```

`requireAuth` decodes the bearer token and attaches `userId`. `validate`
runs the Zod schema for the route and stops with a 400 on bad input.
Errors thrown as `AppError` are caught by the express adapter and turned
into the right HTTP status. Anything else becomes a 500 with a generic
message.
