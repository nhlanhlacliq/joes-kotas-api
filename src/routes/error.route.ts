import { createStandaloneApp } from "@/lib/create-base-app";
import { createRoute, z } from "@hono/zod-openapi";

// See for more info: https://hono.dev/examples/zod-openapi
const router = createStandaloneApp().openapi(
  // Route Documentation
  createRoute({
    method: "get",
    path: "/error",
    description: "Returns an error",
    responses: {
      200: {
        description: "Throws and returns an error",
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
    throw new Error("Oh no! This is an error example route");
  }
);

export default router;
