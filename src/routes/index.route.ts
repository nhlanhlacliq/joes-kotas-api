import { createStandaloneApp } from "@/lib/create-base-app";
import { createRoute, z } from "@hono/zod-openapi";

// See for more info: https://hono.dev/examples/zod-openapi
const router = createStandaloneApp().openapi(
  // Route Documentation
  createRoute({
    method: "get",
    path: "/",
    description: "Returns a greeting",
    responses: {
      200: {
        description: "Returns a greeting",
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
      },
    },
  }),
  // route handler
  (ctx) => {
    return ctx.json({ message: "Hello! Joes Kotas API index route" });
  }
);

export default router;
