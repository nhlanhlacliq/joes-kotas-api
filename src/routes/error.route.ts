import jsonContent from "@/helpers/json-content";
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
      200: jsonContent(
        z.object({
          message: z.string(),
        }),
        "Throws and returns an error"
      ),
    },
  }),
  // route handler
  (ctx) => {
    throw new Error("Oh no! This is an error example route");
  }
);

export default router;
