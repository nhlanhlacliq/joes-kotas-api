import createBaseApp from "./lib/create-base-app";
import createOpenApiDoc from "./lib/create-open-api-doc";

import error from "@/routes/error.route";
import index from "@/routes/index.route";
import inventory from "@/routes/inventory/inventory.route";
import auth from "@/routes/auth/auth.route";

const app = createBaseApp();

// Adds a '/doc' endpoint with documentation of api routes
createOpenApiDoc(app);

// Routes
const routes = [auth, inventory, index, error];

routes.forEach((route) => {
  app.route("/", route);
});

export default app;
