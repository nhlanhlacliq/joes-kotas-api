import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import notFound from "./middleware/not-found";
import onError from "./middleware/on-error";
import serveEmojiFavicon from "./middleware/serve-emoji-favicon";

// OpenApiHono is just a wrapper around Hono (https://hono.dev/examples/zod-openapi) enables easier api documentation(openApi)
const app = new OpenAPIHono({ strict: false });

// Middlewares
app.use(logger());
app.use(serveEmojiFavicon("🍞")); // Serves an emoji string when browsers request /favicon.ico. Also the favicon on the browser tab

app.use(cors());

app.notFound(notFound);
app.onError(onError);

// Routes
app.get("/", (c) => {
  return c.json("Hello Hono!");
});

app.get("/err", (c) => {
  throw new Error("Oh no Hono!");
});

export default app;
