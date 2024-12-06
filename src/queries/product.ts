'use server';

import { withAnonymousDrizzle } from '@/db/anonymous';
import { withAuthenticatedDrizzle } from '@/db/authenticated';
import { type InsertProduct, type SelectProduct, productsTable } from '@/schema/products';
import { eq } from 'drizzle-orm';
import { head } from '@/utils/head';

export const createProduct = async (data: InsertProduct) =>
  withAuthenticatedDrizzle(async db => db.insert(productsTable).values(data).returning().then(head));

export const getProducts = async () =>
  withAnonymousDrizzle(async db =>
    db.query.productsTable.findMany({
      with: {
        productAssets: {
          with: {
            asset: true,
          },
        },
      },
    })
  );

export const getProduct = async (id: SelectProduct['id']) =>
  withAuthenticatedDrizzle(async db =>
    db.query.productsTable.findFirst({
      where: eq(productsTable.id, id),
      with: {
        productAssets: {
          with: {
            asset: true,
          },
        },
      },
    })
  );

export type GetProduct = Awaited<ReturnType<typeof getProduct>>;

export const updateProduct = async (id: SelectProduct['id'], data: Partial<Omit<SelectProduct, 'id'>>) =>
  withAuthenticatedDrizzle(async db =>
    db.update(productsTable).set(data).where(eq(productsTable.id, id)).returning().then(head)
  );

export const deleteProduct = async (id: SelectProduct['id']) =>
  withAuthenticatedDrizzle(async db => db.delete(productsTable).where(eq(productsTable.id, id)));
