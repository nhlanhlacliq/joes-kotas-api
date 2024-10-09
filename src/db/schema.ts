import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  username: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const selectUsersSchema = createSelectSchema(usersTable);
export const insertUsersSchema = createInsertSchema(usersTable, {
  email: (schema) => schema.email.email(),
  username: (schema) => schema.username.min(1),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const inventoryTable = pgTable("inventory", {
  id: serial("id").primaryKey(),
  name: text().notNull(),
  count: integer().notNull(),
  isAvailable: boolean().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date()),
  //   imageUrl: varchar({ length: 255 }),
});

export const selectInventorySchema = createSelectSchema(inventoryTable);

export const insertInventorySchema = createInsertSchema(inventoryTable, {
  name: (schema) => schema.name.min(1),
  count: (schema) => schema.count.min(0),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
