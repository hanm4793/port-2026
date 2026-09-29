import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Han | Builder of Worlds — Interactive Portfolio',
  description:
    'Full-stack developer, AI filmmaker, musician, and creative technologist. ' +
    'Explore the Island of Memory — an interactive 3D portfolio.',
  openGraph: {
    title: 'Han | Builder of Worlds',
    description: 'Interactive 3D portfolio — web development, AI filmmaking, music, creative technology.',
    type: 'website',
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#1A1816] text-[#F5F0E6]">
        {children}
      </body>
    </html>
  );
}
