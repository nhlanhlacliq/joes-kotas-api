import { env } from "@/../env";
import app from "@/app";
import { serve } from "@hono/node-server";

const port = env.PORT;

env.NODE_ENV === "development" &&
  console.log(`Server is running on port http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
