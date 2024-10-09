import createBaseApp from "./lib/create-base-app";
import createOpenApiDoc from "./lib/create-open-api-doc";

import error from "@/routes/error.route";
import index from "@/routes/index.route";

const app = createBaseApp();

// Adds a '/doc' endpoint with documentation of api routes
createOpenApiDoc(app);

// Routes
const routes = [index, error];

routes.forEach((route) => {
  app.route("/", route);
});

export default app;
