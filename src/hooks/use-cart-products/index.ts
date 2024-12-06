'use client';

import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai/react';
import { cartAtom } from '@/atoms/cart';
import { getProductsByIDs } from './actions';

export const useCartProducts = () => {
  const items = useAtomValue(cartAtom);

  const { data: rawProducts, ...rest } = useQuery({
    queryKey: ['cart-products', items.map(item => item.id)] as const,
    queryFn: ({ queryKey: [, ids] }) => getProductsByIDs(ids),
  });

  const products =
    rawProducts?.map(product => ({
      ...product,
      quantity: items.find(item => item.id === product?.id)?.quantity || 0,
    })) ?? [];

  const total = products?.reduce((sum, product) => sum + product.price * product.quantity, 0) ?? 0;

  return { products, total, ...rest };
};
