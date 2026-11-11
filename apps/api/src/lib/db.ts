import { PGlite } from "@electric-sql/pglite";
import { uuid_ossp } from "@electric-sql/pglite/contrib/uuid_ossp";
import { readdir, readFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";

export const db = new PGlite(
  fileURLToPath(new URL("../../pgdata", import.meta.url)),
  { extensions: { uuid_ossp } },
);

export const runMigrations = async () => {
  const { rows } = await db.query(`SELECT to_regclass('schema_migrations')`);
  const { to_regclass } = rows[0] as { to_regclass: string | null };
  if (!to_regclass) {
    await db.exec(
      `CREATE TABLE "schema_migrations" (
        "name" TEXT PRIMARY KEY,
        "applied_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`,
    );
  }

  const alreadyMigrated = new Set(
    (
      await db.query<{ name: string; applied_at: Date }>(
        `SELECT "name" FROM "schema_migrations"`,
      )
    ).rows.map((row) => row.name),
  );

  const migrationFolderPath = fileURLToPath(
    new URL("./migrations", import.meta.url),
  );

  const migrationFilePaths = (
    await readdir(migrationFolderPath, "utf8")
  ).filter((path) => path.endsWith(".sql"));

  migrationFilePaths.sort(
    (path1, path2) => Number(path1.slice(0, 3)) - Number(path2.slice(0, 3)),
  );

  for (let filePath of migrationFilePaths) {
    const sqlQuery = await readFile(
      join(migrationFolderPath, filePath),
      "utf8",
    );
    if (!alreadyMigrated.has(filePath)) {
      await db.transaction(async (tx) => {
        await tx.exec(sqlQuery);
        return await tx.query(
          `INSERT INTO "schema_migrations" ("name") VALUES ($1)`,
          [filePath],
        );
      });
    }
  }
};

await runMigrations();
