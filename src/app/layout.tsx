import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ToasterProvider from './providers/ToasterProvider';
import { ModalsBackground } from './components/ModalsBackground/ModalsBackground';
import ThemeProv from './providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Salty Point',
  description: 'Faça seus pedidos na melhor pizzaria da região',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR'>
      <body className={inter.className}>
        <ThemeProv>
          <ToasterProvider />
          <ModalsBackground />
          {children}
        </ThemeProv>
      </body>
    </html>
  );
}
