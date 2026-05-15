import { radii, spacing, typography, useColors } from '@/theme';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ErrorFallbackProps = {
  error: Error;
  onRetry?: () => void | Promise<void>;
  title?: string;
  message?: string;
  variant?: 'screen' | 'section';
};

export function ErrorFallback({
  error,
  onRetry,
  title = 'Something went wrong',
  message = "We couldn't load this screen. Please try again.",
  variant = 'screen',
}: ErrorFallbackProps) {
  const c = useColors();
  const isSection = variant === 'section';

  const content = (
    <View
      style={[
        styles.card,
        isSection ? styles.sectionCard : styles.screenCard,
        { backgroundColor: isSection ? c.surfaceMuted : c.surface },
      ]}>
      <View
        style={[
          styles.iconWrap,
          isSection ? styles.iconWrapSection : styles.iconWrapScreen,
          { backgroundColor: c.badgeHot },
        ]}>
        <Text style={[styles.iconGlyph, { color: c.badgeHotText }]}>!</Text>
      </View>
      <Text style={[styles.title, { color: c.textPrimary }, isSection && styles.sectionTitle]}>
        {title}
      </Text>
      <Text style={[styles.message, { color: c.textSecondary }]}>
        {message}
      </Text>
      {__DEV__ ? (
        <Text style={[styles.devError, { color: c.textMuted }]} numberOfLines={3}>
          {error.message}
        </Text>
      ) : null}
      {onRetry ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Try again"
          onPress={() => void onRetry()}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: c.primary, opacity: pressed ? 0.85 : 1 },
          ]}>
          <Text style={[styles.buttonLabel, { color: c.textInverse }]}>Try again</Text>
        </Pressable>
      ) : null}
    </View>
  );

  if (isSection) {
    return content;
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: c.surface }]} edges={['top', 'bottom']}>
      <View style={styles.screenInner}>{content}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  screenInner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  card: {
    alignItems: 'center',
    gap: spacing.base,
  },
  screenCard: {
    paddingVertical: spacing.xl,
  },
  sectionCard: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.base,
    borderRadius: radii.lg,
    marginVertical: spacing.sm,
  },
  iconWrap: {
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  iconWrapScreen: {
    width: 84,
    height: 84,
  },
  iconWrapSection: {
    width: 48,
    height: 48,
  },
  iconGlyph: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
  },
  message: {
    fontSize: typography.sizes.md,
    textAlign: 'center',
    lineHeight: typography.sizes.md * 1.5,
    paddingHorizontal: spacing.sm,
  },
  devError: {
    fontSize: typography.sizes.sm,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  button: {
    marginTop: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.pill,
    minWidth: 160,
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
  },
});
