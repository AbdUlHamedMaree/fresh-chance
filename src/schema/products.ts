import { check, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { relations, sql } from 'drizzle-orm';
import { anonymousRole, authenticatedRole, authUid, crudPolicy } from 'drizzle-orm/neon';
import { productAssetsTable } from './productsAssets';

export const productsTable = pgTable(
  'products_table',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: text('user_id')
      .notNull()
      .default(sql`(auth.user_id())`),

    title: text('title').notNull(),
    description: text('description').notNull(),
    price: integer('price').notNull(),
    originalPrice: integer('original_price').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
  },
  table => [
    check('original_price_gt_price_check', sql`${table.originalPrice} > ${table.price}`),
    crudPolicy({
      role: anonymousRole,
      read: true,
      modify: false,
    }),
    crudPolicy({
      role: authenticatedRole,
      read: true,
      modify: authUid(table.userId),
    }),
  ]
);

export const productsRelations = relations(productsTable, ({ many }) => ({
  productAssets: many(productAssetsTable),
}));

export const selectProductSchema = createSelectSchema(productsTable);
export type SelectProduct = z.infer<typeof selectProductSchema>;

export const insertProductSchema = createInsertSchema(productsTable, {
  price: z.coerce.number(),
  originalPrice: z.coerce.number(),
});
export type InsertProduct = z.infer<typeof insertProductSchema>;
