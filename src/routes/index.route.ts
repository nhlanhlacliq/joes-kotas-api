import jsonContent from "@/helpers/json-content";
import { createStandaloneApp } from "@/lib/create-base-app";
import { createRoute, z } from "@hono/zod-openapi";

// See for more info: https://hono.dev/examples/zod-openapi
const router = createStandaloneApp().openapi(
  // Route Documentation
  createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    description: "Index route - Returns a greeting",
    responses: {
      200: jsonContent(
        z.object({
          message: z.string(),
        }),
        "Returns a greeting"
      ),
    },
  }),
  // route handler
  (ctx) => {
    return ctx.json({ message: "Hello! Joes Kotas API index route" });
  }
);

export default router;
