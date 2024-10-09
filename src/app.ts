import createBaseApp from "./lib/create-base-app";
import createOpenApiDoc from "./lib/create-open-api-doc";

const app = createBaseApp();

// Adds a '/doc' endpoint with documentation of api routes
createOpenApiDoc(app);

// Routes
app.get("/", (c) => {
  return c.json("Hello Hono!");
});

app.get("/err", (c) => {
  throw new Error("Oh no Hono!");
});

export default app;
