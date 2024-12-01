import { pgTable, primaryKey, text, uuid } from 'drizzle-orm/pg-core';
import { productsTable } from './products';
import { assetsTable } from './assets';
import { createInsertSchema } from 'drizzle-zod';
import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';
import { relations, sql } from 'drizzle-orm';
import { anonymousRole, authenticatedRole, authUid, crudPolicy } from 'drizzle-orm/neon';

export const productAssetsTable = pgTable(
  'product_assets',
  {
    productId: uuid('product_id')
      .notNull()
      .references(() => productsTable.id, { onDelete: 'cascade' }),
    assetId: uuid('asset_id')
      .notNull()
      .references(() => assetsTable.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .default(sql`(auth.user_id())`),
  },
  table => [
    primaryKey({ columns: [table.productId, table.assetId] }),
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

export const productAssetsRelations = relations(productAssetsTable, ({ one }) => ({
  asset: one(assetsTable, {
    fields: [productAssetsTable.assetId],
    references: [assetsTable.id],
  }),
  product: one(productsTable, {
    fields: [productAssetsTable.productId],
    references: [productsTable.id],
  }),
}));

export const selectProductAssetSchema = createSelectSchema(productAssetsTable);
export type SelectProductAsset = z.infer<typeof selectProductAssetSchema>;

export const insertProductAssetSchema = createInsertSchema(productAssetsTable);
export type InsertProductAsset = z.infer<typeof insertProductAssetSchema>;
