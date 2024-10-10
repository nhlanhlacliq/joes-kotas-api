import { verify } from "hono/jwt";
import { env } from "../../env";
import { JWTPayload } from "hono/utils/jwt/types";
import { Context, Next } from "hono";

export default async function authMiddleware(ctx: Context, next: Next) {
  const authHeader = ctx.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return ctx.json({ error: "Unauthorized" }, 401);
  }

  const token = authHeader.substring(7); // Remove "Bearer " from "Bearer <token>"
  try {
    const decoded = verify(token, env.JWT_SECRET);
    ctx.set("user", decoded); // Store user info in the context
    await next();
  } catch (err) {
    return ctx.json({ error: "Invalid or expired token" }, 401);
  }
}
