import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { CartIcon } from '@/components/smart/cart-icon';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { SignedOut } from '@clerk/nextjs';
import { SignInButton } from '@clerk/nextjs';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container flex h-14 items-center px-4 sm:px-6 lg:px-8'>
          <Link href='/' className='flex items-center space-x-2'>
            <Package className='h-6 w-6' />
            <span className='font-bold'>Fresh Chance</span>
          </Link>
          <nav className='ml-auto flex items-center space-x-4 sm:space-x-6'>
            <ThemeToggle />
            <Link href='#how-it-works' className='text-sm font-medium transition-colors hover:text-primary'>
              How It Works
            </Link>
            <Link href='#benefits' className='text-sm font-medium transition-colors hover:text-primary'>
              Benefits
            </Link>
            <Link href='/products' className='text-sm font-medium transition-colors hover:text-primary'>
              Products
            </Link>
            <Button asChild>
              <Link href='#download'>Download App</Link>
            </Button>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <Link href='/dashboard' className='text-sm font-medium transition-colors hover:text-primary'>
                Dashboard
              </Link>
              <UserButton />
            </SignedIn>
            <CartIcon />
          </nav>
        </div>
      </header>

      <main className='flex-1'>{children}</main>
      <footer className='border-t'>
        <div className='container flex flex-col gap-4 py-10 px-4 sm:px-6 lg:px-8 md:flex-row md:gap-8'>
          <div className='flex-1 space-y-4'>
            <Link href='/' className='flex items-center space-x-2'>
              <Package className='h-6 w-6' />
              <span className='font-bold'>Fresh Chance</span>
            </Link>
            <p className='text-sm text-gray-500 dark:text-gray-400'>Saving you money while reducing food waste.</p>
          </div>
          <div className='flex-1 space-y-4'>
            <h3 className='font-semibold'>Company</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#' className='hover:underline'>
                  About Us
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:underline'>
                  Careers
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:underline'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className='flex-1 space-y-4'>
            <h3 className='font-semibold'>Legal</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#' className='hover:underline'>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:underline'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:underline'>
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className='flex-1 space-y-4'>
            <h3 className='font-semibold'>Connect</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#' className='hover:underline'>
                  Twitter
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:underline'>
                  Facebook
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:underline'>
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='border-t py-6 text-center text-sm'>
          <p>© 2023 Fresh Chance. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
