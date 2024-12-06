'use client';

import { formatCurrency } from '@/utils/formatCurrency';
import { Button } from '@/components/ui/button';
import { Package, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCartProducts } from '@/hooks/use-cart-products';
import { removeProductFromCartAtom, setProductQuantityInCartAtom } from '@/atoms/cart';
import { useSetAtom } from 'jotai/react';
import { Skeleton } from '@/components/ui/skeleton';

export const CartList = () => {
  const removeItem = useSetAtom(removeProductFromCartAtom);
  const updateQuantity = useSetAtom(setProductQuantityInCartAtom);
  const { products, total, isLoading } = useCartProducts();

  if (isLoading) {
    return (
      <div className='space-y-4'>
        {[...Array(3)].map((_, index) => (
          <div key={index} className='flex gap-4 py-4 border-b last:border-0'>
            <Skeleton className='w-24 h-24' />
            <div className='flex-1 space-y-2'>
              <Skeleton className='h-6 w-1/2' />
              <Skeleton className='h-4 w-1/3' />
              <Skeleton className='h-4 w-1/4' />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {products?.map(product => (
        <div key={product.id} className='flex gap-4 py-4 border-b last:border-0'>
          <div className='w-24 h-24'>
            {product.productAssets?.[0]?.asset.url ? (
              <img
                src={product.productAssets[0].asset.url}
                alt={product.productAssets[0].asset.name || product.title}
                className='w-full h-full object-cover rounded-md'
              />
            ) : (
              <div className='w-full h-full bg-gray-100 rounded-md flex items-center justify-center'>
                <Package className='w-8 h-8 text-gray-400' />
              </div>
            )}
          </div>
          <div className='flex-1'>
            <h3 className='font-semibold'>{product.title}</h3>
            <div className='flex items-center gap-2 mt-1'>
              <p className='text-sm text-gray-500 line-through'>{formatCurrency.format(product.originalPrice)}</p>
              <p className='text-sm font-semibold'>{formatCurrency.format(product.price)}</p>
            </div>
            <div className='flex items-center gap-4 mt-4'>
              <Input
                type='number'
                min='1'
                value={product.quantity}
                onChange={e => updateQuantity(product.id, parseInt(e.target.value))}
                className='w-20'
              />
              <Button variant='destructive' size='sm' onClick={() => removeItem(product.id)}>
                <Trash2 className='w-4 h-4' />
              </Button>
            </div>
          </div>
        </div>
      ))}

      {products?.length > 0 && (
        <div className='flex justify-between items-center pt-4 border-t'>
          <span className='font-semibold'>Subtotal</span>
          <span className='font-semibold'>{formatCurrency.format(total)}</span>
        </div>
      )}
    </div>
  );
};
