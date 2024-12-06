'use client';

import { Button } from '@/components/ui/button';
import { useCartProducts } from '@/hooks/use-cart-products';
import { formatCurrency } from '@/utils/formatCurrency';
import { Skeleton } from '@/components/ui/skeleton';

export const CartSummary = () => {
  const { total, isLoading } = useCartProducts();

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <Skeleton className='h-6 w-full' />
        <Skeleton className='h-6 w-full' />
        <Skeleton className='h-6 w-full' />
        <Skeleton className='h-10 w-full' />
      </div>
    );
  }

  const shipping = 0;
  const tax = total * 0.1;
  const finalTotal = total + shipping + tax;

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <div className='flex justify-between'>
          <span>Subtotal</span>
          <span>{formatCurrency.format(total)}</span>
        </div>
        <div className='flex justify-between'>
          <span>Shipping</span>
          <span>{formatCurrency.format(shipping)}</span>
        </div>
        <div className='flex justify-between'>
          <span>Tax</span>
          <span>{formatCurrency.format(tax)}</span>
        </div>
        <div className='flex justify-between font-bold border-t pt-2'>
          <span>Total</span>
          <span>{formatCurrency.format(finalTotal)}</span>
        </div>
      </div>
      <Button className='w-full' size='lg'>
        Proceed to Checkout
      </Button>
    </div>
  );
};
