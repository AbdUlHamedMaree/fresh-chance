import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppleIcon, Leaf, Package, ShoppingCart, Smartphone, ThumbsUp } from 'lucide-react';
import { getAllProductsAction } from './dashboard/products/actions';
import { ProductCard } from '@/components/dumb/product-card';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const products = await getAllProductsAction();

  return (
    <>
      <section className='py-12 md:py-24 lg:py-32 xl:py-48'>
        <div className='container px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col items-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                Give Food a Fresh Chance
              </h1>
              <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                Fresh Chance brings you high-quality groceries nearing their best-before dates at unbeatable prices.
              </p>
            </div>
            <div className='space-x-4'>
              <Button asChild>
                <Link href='#download'>Get Started</Link>
              </Button>
              <Button variant='outline' asChild>
                <Link href='#how-it-works'>Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id='benefits' className='py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
        <div className='container px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12'>
            Why Choose Fresh Chance?
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <Card>
              <CardHeader>
                <ThumbsUp className='w-8 h-8 mb-2 text-primary' />
                <CardTitle>Great Deals</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Save up to 50% on high-quality groceries and food items.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Leaf className='w-8 h-8 mb-2 text-primary' />
                <CardTitle>Reduce Food Waste</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Help reduce food waste by purchasing items before they expire.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <ShoppingCart className='w-8 h-8 mb-2 text-primary' />
                <CardTitle>Convenient Shopping</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Easy-to-use app with home delivery or pickup options.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className='py-12 md:py-24 lg:py-32'>
        <div className='container px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12'>
            Featured Products
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {products.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                originalPrice={product.originalPrice}
                imageUrl={product.productAssets?.[0]?.asset.url}
                imageName={product.productAssets?.[0]?.asset.name}
              />
            ))}
          </div>
        </div>
      </section>

      <section id='how-it-works' className='py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'>
        <div className='container px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12'>
            How It Works
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='flex flex-col items-center text-center'>
              <Smartphone className='w-12 h-12 mb-4 text-primary' />
              <h3 className='text-xl font-semibold mb-2'>1. Download the App</h3>
              <p>Get our free Fresh Chance app on iOS or Android devices.</p>
            </div>
            <div className='flex flex-col items-center text-center'>
              <ShoppingCart className='w-12 h-12 mb-4 text-primary' />
              <h3 className='text-xl font-semibold mb-2'>2. Shop for Deals</h3>
              <p>Browse and select from a wide range of discounted items.</p>
            </div>
            <div className='flex flex-col items-center text-center'>
              <Package className='w-12 h-12 mb-4 text-primary' />
              <h3 className='text-xl font-semibold mb-2'>3. Get Your Groceries</h3>
              <p>Choose between home delivery or convenient pickup options.</p>
            </div>
          </div>
        </div>
      </section>

      <section id='download' className='py-12 md:py-24 lg:py-32'>
        <div className='container px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col items-center space-y-4 text-center'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>Download Fresh Chance Today</h2>
            <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
              Start saving money and reducing food waste with our easy-to-use app.
            </p>
            <div className='space-x-4'>
              <Button className='inline-flex items-center'>
                <AppleIcon className='mr-2 h-5 w-5' />
                App Store
              </Button>
              <Button variant='outline' className='inline-flex items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='mr-2 h-5 w-5'
                >
                  <polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2' />
                </svg>
                Google Play
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
