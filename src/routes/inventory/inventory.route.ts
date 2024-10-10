import db from "@/db";
import {
  insertInventorySchema,
  inventoryTable,
  selectInventorySchema,
} from "@/db/schema";
import IdParamsSchema from "@/helpers/id-params-schema";
import jsonContent from "@/helpers/json-content";
import { createBaseApp } from "@/lib/create-app";
import { createRoute, z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";
import authMiddleware from "@/middleware/auth";

const router = createBaseApp()
  .openapi(
    // GET /inventory - List all food items
    createRoute({
      tags: ["Inventory"],
      method: "get",
      path: "/inventory",
      description: "Retrieve a list of all inventory items",
      middleware: [authMiddleware], // Apply authentication middleware to this route
      responses: {
        200: jsonContent(
          z.array(selectInventorySchema),
          "List of inventory items"
        ),
      },
    }),
    async (ctx) => {
      const inventory = await db.query.inventoryTable.findMany({
        orderBy: (model, { asc }) => asc(model.id),
      });
      return ctx.json(inventory, 200);
    }
  )
  .openapi(
    // POST /inventory - create a food item
    createRoute({
      tags: ["Inventory"],
      method: "post",
      path: "/inventory",
      description: "Create a new inventory item",
      request: {
        body: jsonContent(
          insertInventorySchema,
          "The inventory item to create",
          true
        ),
      },
      middleware: [authMiddleware],
      responses: {
        200: jsonContent(selectInventorySchema, "The created inventory item"),
      },
    }),
    async (ctx) => {
      const inventoryItem = ctx.req.valid("json");
      const [insertedItem] = await db
        .insert(inventoryTable)
        .values(inventoryItem)
        .returning();
      return ctx.json(insertedItem, 200);
    }
  )
  .openapi(
    // PUT /inventory/:id - Update a food item
    createRoute({
      tags: ["Inventory"],
      method: "put", // Patch had issues(response would hang)
      path: "/inventory/{id}",
      description: "Update an existing inventory item",
      request: {
        params: IdParamsSchema,
        body: jsonContent(
          insertInventorySchema,
          "The inventory item data to update",
          true
        ),
      },
      middleware: [authMiddleware],
      responses: {
        200: jsonContent(selectInventorySchema, "The updated inventory item"),
        404: jsonContent(
          z.object({ error: z.string() }),
          "Inventory item not found"
        ),
      },
    }),
    async (ctx) => {
      const { id } = ctx.req.valid("param");
      const inventoryItem = ctx.req.valid("json");

      const [updatedItem] = await db
        .update(inventoryTable)
        .set(inventoryItem)
        .where(eq(inventoryTable.id, id))
        .returning();

      if (!updatedItem) {
        return ctx.json({ error: "Inventory item not found" }, 404);
      }

      return ctx.json(updatedItem, 200);
    }
  )
  .openapi(
    // DELETE /inventory/:id - delete a food item
    createRoute({
      tags: ["Inventory"],
      method: "delete",
      path: "/inventory/{id}",
      description: "Delete an inventory item",
      request: {
        params: IdParamsSchema,
      },
      middleware: [authMiddleware],
      responses: {
        204: { description: "Inventory item deleted" },
        404: jsonContent(
          z.object({ error: z.string() }),
          "Inventory item not found"
        ),
      },
    }),

    async (ctx) => {
      const { id } = ctx.req.valid("param");

      const result = await db
        .delete(inventoryTable)
        .where(eq(inventoryTable.id, id));

      if (result.rowCount === 0) {
        return ctx.json({ error: "Inventory item not found" }, 404);
      }

      return ctx.body(null, 204);
    }
  );

export default router;
