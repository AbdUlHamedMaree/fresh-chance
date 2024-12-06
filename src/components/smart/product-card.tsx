'use client';

import { ProductCard as DumbProductCard } from '../dumb/product-card';
import { insertProductIdToCartAtom } from '@/atoms/cart';
import { useSetAtom } from 'jotai/react';

interface SmartProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  imageUrl?: string;
  imageName?: string;
}

export const ProductCard = (props: SmartProductCardProps) => {
  const addItem = useSetAtom(insertProductIdToCartAtom);

  return <DumbProductCard {...props} onAddToCart={addItem} />;
};
