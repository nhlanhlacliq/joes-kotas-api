import { z } from "zod";

export const envSchema = z.object({
  env: z.enum(["development", "production"]).default("development"),
  port: z.number().default(8080),
});

export const env = envSchema.parse(process.env);
