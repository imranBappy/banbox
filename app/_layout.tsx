import { Stack, type ErrorBoundaryProps } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Platform, View } from 'react-native';

import { AppProviders } from '@/components/AppProviders';
import { RouteErrorBoundary } from '@/components/error';
import { AnimatedSplash } from '@/components/splash/AnimatedSplash';
import { useAnimatedSplash } from '@/hooks/useAnimatedSplash';
import { useColors, useScheme } from '@/theme';

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

function RootNavigator() {
  const c = useColors();
  const scheme = useScheme();
  const { appReady, showSplash, onRootLayout, onSplashFinish } = useAnimatedSplash();

  return (
    <View style={{ flex: 1, backgroundColor: c.background }} onLayout={onRootLayout}>
      {appReady ? (
        <>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          {showSplash ? (
            <AnimatedSplash
              backgroundColor={scheme === 'dark' ? '#000000' : '#ffffff'}
              primaryColor={c.primary}
              textColor={c.textPrimary}
              onFinish={onSplashFinish}
            />
          ) : null}
        </>
      ) : null}
      <ThemedStatusBar />
    </View>
  );
}

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <AppProviders>
      <RouteErrorBoundary {...props} scope="app" />
    </AppProviders>
  );
}

export default function RootLayout() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
