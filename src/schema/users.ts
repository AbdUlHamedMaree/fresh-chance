import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const usersTable = pgTable("users_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  email: text("email").notNull().unique(),
});

// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(usersTable);
export type SelectUser = z.infer<typeof selectUserSchema>;

// Schema for inserting a user - can be used to validate API requests
export const insertUserSchema = createInsertSchema(usersTable, { email: z.string().email(), age: z.coerce.number() });

export type InsertUser = z.infer<typeof insertUserSchema>;
