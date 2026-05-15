import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Platform } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemeProvider, useColors, useScheme } from '@/theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

function ThemedStatusBar() {
  const scheme = useScheme();
  const c = useColors();
  return (
    <StatusBar
      style={scheme === 'dark' ? 'light' : 'dark'}
      backgroundColor={Platform.OS === 'android' ? c.background : undefined}
    />
  );
}

export default function RootLayout() {
  const systemScheme = useColorScheme();

  return (
    <ThemeProvider initialMode={systemScheme === 'dark' ? 'dark' : 'light'}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <ThemedStatusBar />
    </ThemeProvider>
  );
}
