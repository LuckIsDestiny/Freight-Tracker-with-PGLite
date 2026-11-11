# PGlite and database rules

## Stage A: Direct PGlite

Use direct PGlite while learning SQL:

```js
import { PGlite } from '@electric-sql/pglite';

const db = new PGlite('./pgdata');

const result = await db.query(
  'SELECT id, title FROM notes WHERE user_id = $1',
  [userId]
);
```

Use `db.query(sql, params)` for normal queries.
Use `db.exec()` for multi-statement migration scripts.

## Stage B: PGlite socket server

Later, run PGlite as a local Postgres-compatible server:

```bash
npx pglite-server --db=./pgdata --port=5432
```

Connect from Express using `pg` / node-postgres and a `DATABASE_URL`.

Teach:
- `Pool`
- `client.query`
- Parameterized queries
- Transactions with `BEGIN`, `COMMIT`, and `ROLLBACK`

## Important differences

PGlite is real PostgreSQL compiled to WebAssembly, but it is not a full production Postgres deployment.

Explain honestly:
- Direct PGlite has one real connection.
- The socket server multiplexes connections.
- Roles, users, permissions, replication, and backup tooling differ from a full Postgres server.
- Code should be written so changing `DATABASE_URL` later can point it to Neon, Supabase, RDS, or another hosted Postgres.

## Rules

- Always use parameterized queries: `$1`, `$2`, etc.
- Never interpolate user input directly into SQL.
- Store migrations as numbered `.sql` files.
- Track applied migrations in a `schema_migrations` table.
- Keep seed data separate from schema migrations.
- Remind the learner to add `pgdata/` to `.gitignore`.
- To reset locally: delete `pgdata/`, rerun migrations, then rerun seeds.
