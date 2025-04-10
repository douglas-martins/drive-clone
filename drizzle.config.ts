import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "singlestore",
  dbCredentials: {
    host: String(env.SINGLESTORE_HOST),
    port: parseInt(String(env.SINGLESTORE_PORT)),
    user: String(env.SINGLESTORE_USER),
    password: String(env.SINGLESTORE_PASSWORD),
    database: String(env.SINGLESTORE_DATABASE),
    ssl: {},
  },
  tablesFilter: ["drive-tutorial_*"],
} satisfies Config;
