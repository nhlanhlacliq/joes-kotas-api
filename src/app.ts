import createApp from "./lib/create-app";
import createOpenApiDoc from "./lib/create-open-api-doc";

import auth from "@/routes/auth/auth.route";
import error from "@/routes/error.route";
import index from "@/routes/index.route";
import inventory from "@/routes/inventory/inventory.route";
import user from "@/routes/user/user.route";

const app = createApp();

// Adds a '/doc', '/reference' endpoint with documentation of api routes
createOpenApiDoc(app);

// Routes
const routes = [user, auth, inventory, index, error];

routes.forEach((route) => {
  app.route("/", route);
});

export default app;
