import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from 'next-themes';
import { ReactQueryProvider } from '@/components/providers/react-query';
import { Provider } from 'jotai/react';

import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Fresh Chance',
  description: 'Give Food a Fresh Chance',
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
          {/*
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */}
          {/* <NextSSRPlugin
            routerConfig={extractRouterConfig(ourFileRouter)}
          /> */}
          <ReactQueryProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
              <Provider>{children}</Provider>
            </ThemeProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
