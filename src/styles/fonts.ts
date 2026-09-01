import { Inter, Kalam, Montserrat } from 'next/font/google';

export const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '700'],
  display: 'swap',
  preload: true,
  style: ['normal'],
  fallback: ['sans-serif'],
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  style: ['normal'],
  fallback: ['sans-serif'],
});

export const kalam = Kalam({
  subsets: ['latin'],
  variable: '--font-kalam',
  weight: ['400', '700'],
  display: 'swap',
  preload: true,
  style: ['normal'],
  fallback: ['cursive'],
});

export const fontVariables = `${montserrat.variable} ${inter.variable} ${kalam.variable}`;
