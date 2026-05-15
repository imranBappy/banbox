import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemeProvider } from '@/theme';
import type { ReactNode } from 'react';

export function AppProviders({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  return (
    <ThemeProvider initialMode={systemScheme === 'dark' ? 'dark' : 'light'}>
      {children}
    </ThemeProvider>
  );
}
