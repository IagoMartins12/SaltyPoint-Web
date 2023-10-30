'use client';

import { ThemeProvider } from 'next-themes';

export default function ThemeProv({ children }: { children: React.ReactNode }) {
  return <ThemeProvider> {children}</ThemeProvider>;
}
