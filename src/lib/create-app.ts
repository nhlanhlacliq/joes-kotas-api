import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import defaultHook from "@/middleware/default-hook";
import notFound from "@/middleware/not-found";
import onError from "@/middleware/on-error";
import serveEmojiFavicon from "@/middleware/serve-emoji-favicon";

// Structed like this so we can attach documented routes (without middleware added by create app)
export function createBaseApp() {
  // OpenApiHono is just a wrapper around Hono (https://hono.dev/examples/zod-openapi) enables easier api documentation(openApi)
  return new OpenAPIHono({ strict: false, defaultHook });
}

export default function createApp() {
  const app = createBaseApp();
  // Middlewares
  app.use(logger());
  app.use(serveEmojiFavicon("🍞")); // Serves an emoji string when browsers request /favicon.ico. Also the favicon on the browser tab

  app.use(cors());

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
