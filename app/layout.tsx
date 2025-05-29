// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from './components/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PlantID - Identify Plants with AI',
  description: 'Upload an image and identify plants using AI technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light"> {/* Default theme */}
      <body className={inter.className}>
        <ThemeProvider>
          <SpeedInsights />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
