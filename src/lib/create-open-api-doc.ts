import packageJSON from "@/../package.json";
import { OpenAPIHono } from "@hono/zod-openapi";

export default function createOpenApiDoc(app: OpenAPIHono) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      title: "Joes Kotas API",
      description: "Joes Kotas API",
      version: packageJSON.version,
    },
  });
}
