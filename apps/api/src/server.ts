import app from "./app.js";
import { env } from "./config/env.js";
import { db } from "./lib/db.js";

app.listen(env.PORT, async () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
  // await db.exec(`DROP TABLE "schema_migrations", "User", "Shipper", "Carrier", "Load"`)
  console.log(await db.query(`SELECT * FROM "schema_migrations"`));
  console.log(await db.query(`SELECT * FROM "User"`));
  //   console.log(await db.query(`SELECT * FROM "Shipper"`));
  //   console.log(await db.query(`SELECT * FROM "Carrier"`));
  //   console.log(await db.query(`SELECT * FROM "Load"`));
});
