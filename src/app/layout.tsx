import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ModalsProvider from './providers/ModalsProvider';
import ToasterProvider from './providers/ToasterProvider';
import { ModalsBackground } from './components/ModalsBackground/ModalsBackground';
import ThemeProv from './providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProv>
          <ModalsProvider />
          <ToasterProvider />
          <ModalsBackground />
          {children}
        </ThemeProv>
      </body>
    </html>
  );
}
