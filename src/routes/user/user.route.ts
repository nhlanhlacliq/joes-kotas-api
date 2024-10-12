import db from "@/db";
import { selectUsersSchema, usersTable } from "@/db/schema";
import jsonContent from "@/helpers/json-content";
import { createBaseApp } from "@/lib/create-app";
import authMiddleware from "@/middleware/auth";
import { createRoute, z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";

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
        selectUsersSchema,
        "Information about the current logged in user"
      ),
      403: jsonContent(z.object({ error: z.string() }), "Unauthorized"),
    },
  }),
  async (ctx) => {
    const user = await ctx.get("user");
    const [userFromDb] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, user.id));

    if (!userFromDb) {
      return ctx.json({ error: "No user found. Please login again" }, 403);
    }

    return ctx.json(userFromDb, 200);
  }
);

export default router;
