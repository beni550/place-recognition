import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'חוויות טיולים',
  description: 'שיתוף חוויות טיולים עם חברים',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>{children}</body>
    </html>
  );
}
