import { ReactNode } from 'react';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/app/providers';
import { Header } from '@organisms';
import './globals.css';

const inter = Inter({ subsets: ['cyrillic'] });

export const metadata: Metadata = {
  title: 'MyStocks',
  description: 'Сервис для отслеживания своих инвестиций',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full light">
      <body className={clsx(inter.className, 'h-full')}>
        <Providers>
          <Header />
          <main className="mx-auto w-full max-w-screen-lg flex-grow p-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
