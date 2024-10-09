import jsonContent from "@/helpers/json-content";
import { createStandaloneApp } from "@/lib/create-base-app";
import { createRoute, z } from "@hono/zod-openapi";

const foodItemSchema = z.object({
  id: z.string().optional(), // Optional for creation, required for existing items
  name: z.string(), // Name of the food item
  count: z.number().min(0), // Available count of the item
  isAvailable: z.boolean(), // Availability status
});

const router = createStandaloneApp().openapi(
  // GET /inventory - List all food items
  createRoute({
    tags: ["Inventory"],
    method: "get",
    path: "/inventory",
    description: "Retrieve a list of all inventory items",
    responses: {
      200: jsonContent(z.array(foodItemSchema), "List of inventory items"),
    },
  }),
  async (ctx) => {
    return ctx.json([
      { id: "1", name: "Bread", count: 10, isAvailable: true },
      { id: "2", name: "Eggs", count: 7, isAvailable: true },
    ]);
  }
);

export default router;
