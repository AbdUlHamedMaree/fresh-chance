'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useAtomValue } from 'jotai/react';
import { cartItemsCountAtom } from '@/atoms/cart';

export const CartIcon = () => {
  const count = useAtomValue(cartItemsCountAtom);

  return (
    <Link href='/cart' className='text-sm font-medium transition-colors hover:text-primary relative'>
      <ShoppingCart className='w-5 h-5' />
      {count > 0 && (
        <span className='absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center'>
          {count}
        </span>
      )}
    </Link>
  );
};
