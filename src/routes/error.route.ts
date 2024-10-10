import jsonContent from "@/helpers/json-content";
import { createBaseApp } from "@/lib/create-app";
import { createRoute, z } from "@hono/zod-openapi";

// See for more info: https://hono.dev/examples/zod-openapi
const router = createBaseApp().openapi(
  // Route Documentation
  createRoute({
    tags: ["Error"],
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
