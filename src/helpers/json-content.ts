import { z } from "@hono/zod-openapi";
import { ZodTypeAny } from "zod";

export type ZodSchema =
  | z.ZodUnion<[ZodTypeAny]>
  | z.AnyZodObject
  | z.ZodArray<z.AnyZodObject>;

export default function jsonContent<ZodSchema>(
  schema: ZodSchema,
  description: string
) {
  return {
    content: {
      "application/json": {
        schema,
      },
    },
    description,
  };
}
