'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CartList } from '@/components/smart/cart-list';
import { useAtomValue } from 'jotai/react';
import { cartAtom } from '@/atoms/cart';
import { CartSummary } from '@/components/smart/cart-summary';

export default function CartPage() {
  const items = useAtomValue(cartAtom);

  if (items.length === 0) {
    return (
      <div className='container py-8'>
        <div className='flex flex-col items-center justify-center min-h-[50vh]'>
          <h2 className='text-2xl font-bold mb-4'>Your cart is empty</h2>
          <p className='text-muted-foreground'>Add some items to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container py-8'>
      <Card>
        <CardHeader>
          <CardTitle>Shopping Cart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid gap-8 md:grid-cols-3'>
            <div className='md:col-span-2'>
              <CartList />
            </div>
            <div>
              <CartSummary />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
