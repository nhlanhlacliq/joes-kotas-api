import { selectUsersSchema } from "@/db/schema";
import jsonContent from "@/helpers/json-content";
import { createBaseApp } from "@/lib/create-app";
import authMiddleware from "@/middleware/auth";
import { createRoute, z } from "@hono/zod-openapi";

const router = createBaseApp().openapi(
  // GET /user - Returns current user information stored in the auth middleware
  createRoute({
    tags: ["User"],
    method: "get",
    path: "/user",
    description: "Returns current user informatiopn",
    middleware: [authMiddleware],
    responses: {
      200: jsonContent(
        z.array(selectUsersSchema),
        "Information about the current logged in user"
      ),
    },
  }),
  async (ctx) => {
    const user = ctx.get("user");
    return ctx.json(user, 200);
  }
);

export default router;
