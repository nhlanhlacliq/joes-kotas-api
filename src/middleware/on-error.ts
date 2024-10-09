import type { ErrorHandler } from "hono";
import type { ServerErrorStatusCode, StatusCode } from "hono/utils/http-status";

import { env } from "../../env";

const onError: ErrorHandler = (err, c) => {
  // Check for existing status code
  const currentStatus =
    "status" in err ? err.status : c.newResponse(null).status;
  const statusCode =
    currentStatus !== 200
      ? (currentStatus as StatusCode)
      : (500 as ServerErrorStatusCode);

  const environment = c.env?.NODE_ENV || env?.NODE_ENV;
  return c.json(
    {
      message: err.message,

      // return stack track if not in production
      stack: environment === "production" ? undefined : err.stack,
    },
    statusCode
  );
};

export default onError;
