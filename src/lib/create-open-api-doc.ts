import packageJSON from "@/../package.json";
import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";

export default function createOpenApiDoc(app: OpenAPIHono) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      title: "Joes Kotas API",
      description: "Joes Kotas API",
      version: packageJSON.version,
    },
  });

  //Scalar Config Documentation: https://github.com/scalar/scalar/blob/main/documentation/configuration.md
  app.get(
    "/reference",
    apiReference({
      spec: {
        url: "/doc",
      },
      theme: "kepler",
      layout: "classic",
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "fetch",
      },
    })
  );
}
