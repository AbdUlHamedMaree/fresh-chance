import { relations, sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { productAssetsTable } from './productsAssets';
import { anonymousRole, authenticatedRole, authUid, crudPolicy } from 'drizzle-orm/neon';

export const assetsTable = pgTable(
  'assets_table',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    url: text('url').notNull(),
    userId: text('user_id')
      .notNull()
      .default(sql`(auth.user_id())`),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
  },
  table => [
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

export const assetsRelations = relations(assetsTable, ({ many }) => ({
  productAssets: many(productAssetsTable),
}));

export const selectAssetSchema = createSelectSchema(assetsTable);
export type SelectAsset = z.infer<typeof selectAssetSchema>;

export const insertAssetSchema = createInsertSchema(assetsTable);
export type InsertAsset = z.infer<typeof insertAssetSchema>;
