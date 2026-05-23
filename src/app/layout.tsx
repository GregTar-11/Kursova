import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: 'Ramblers — Оренда будинків на колесах',
  description: 'Відкрийте свободу подорожей з Ramblers.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ua" className={`${inter.variable} h-full`}>
      <body className="flex flex-col antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
