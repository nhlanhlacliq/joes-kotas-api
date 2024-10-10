import db from "@/db";
import { selectUsersSchema, insertUsersSchema, usersTable } from "@/db/schema";
import IdParamsSchema from "@/helpers/id-params-schema";
import jsonContent from "@/helpers/json-content";
import { hashPassword, verifyPassword } from "@/helpers/password-hash";
import { createBaseApp } from "@/lib/create-app";
import { createRoute, z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";
import { sign } from "hono/jwt";
import { emit } from "process";
import { env } from "../../../env";
import exp from "constants";

// Define the schemas
const registerUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(1),
  password: z.string().min(8),
});

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const router = createBaseApp()
  .openapi(
    // POST /auth/register - Register a new user
    createRoute({
      tags: ["Auth"],
      method: "post",
      path: "/auth/register",
      description: "Register a new user",
      request: {
        body: jsonContent(registerUserSchema, "User registration data", true),
      },
      responses: {
        200: jsonContent(selectUsersSchema, "The registered user"),
        400: jsonContent(z.object({ error: z.string() }), "Registration error"),
      },
    }),
    async (ctx) => {
      const newUser = ctx.req.valid("json");

      // Check if the user already exists
      const [existingUser] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, newUser.email));

      if (existingUser) {
        return ctx.json({ error: "User already exists" }, 400);
      }

      // Hash the password and insert the new user into the database
      const passwordHash = await hashPassword(newUser.password);
      const userDetails = {
        email: newUser.email,
        username: newUser.username,
        passwordHash,
      };
      const [createdUser] = await db
        .insert(usersTable)
        .values(userDetails)
        .returning({
          id: usersTable.id,
          email: usersTable.email,
          username: usersTable.username,
          createdAt: usersTable.createdAt,
          updatedAt: usersTable.updatedAt,
        });

      return ctx.json(createdUser, 200);
    }
  )
  .openapi(
    // POST /auth/login - Login
    createRoute({
      tags: ["Auth"],
      method: "post",
      path: "/auth/login",
      description: "User login",
      request: {
        body: jsonContent(loginUserSchema, "User login data", true),
      },
      responses: {
        200: jsonContent(z.object({ token: z.string() }), "JWT token"),
        400: jsonContent(z.object({ error: z.string() }), "Login error"),
      },
    }),
    async (ctx) => {
      const { email, password } = ctx.req.valid("json");

      // Find user by email
      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      if (!user) {
        return ctx.json({ error: "Invalid email" }, 400);
      }

      // Compare the password with the stored hash
      const isValid = await verifyPassword(password, user.passwordHash);

      if (!isValid) {
        return ctx.json({ error: "Invalid password" }, 400);
      }

      // Generate a JWT token
      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires after 1 hour
      };
      const token = await sign(payload, env.JWT_SECRET);

      return ctx.json({ token }, 200);
    }
  );

export default router;
