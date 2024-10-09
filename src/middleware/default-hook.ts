import type { Hook } from "@hono/zod-openapi";

// https://github.com/honojs/middleware/tree/main/packages/zod-openapi#a-dry-approach-to-handling-validation-errors

const defaultHook: Hook<any, any, any, any> = (result, ctx) => {
  if (!result.success) {
    return ctx.json(
      {
        ok: false,
        success: false,
        error: result.error,
      },
      422
    );
  }
};

export default defaultHook;
