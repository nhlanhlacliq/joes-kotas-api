import { drizzle } from "drizzle-orm/connect";
import { env } from "../../env";

async function main() {
  const db = await drizzle("neon-http", env.DATABASE_URL);
}

main();
