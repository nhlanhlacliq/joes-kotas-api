import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono({ strict: false });

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
