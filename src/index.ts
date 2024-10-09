import { serve } from "@hono/node-server";
import { env } from "../env";
import app from "./app";

const port = env.port;
console.log(`Server is running on port http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
