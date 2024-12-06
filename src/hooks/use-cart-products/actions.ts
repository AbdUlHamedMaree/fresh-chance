'use server';

import { inArray } from 'drizzle-orm';

import { withAnonymousDrizzle } from '@/db/anonymous';
import { productsTable } from '@/schema/products';

export const getProductsByIDs = async (ids: string[]) =>
  withAnonymousDrizzle(async db =>
    db.query.productsTable.findMany({
      where: inArray(productsTable.id, ids),
      with: {
        productAssets: {
          with: {
            asset: true,
          },
        },
      },
    })
  );
