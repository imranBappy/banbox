import { Icon, IconName } from '@/components/ui/Icon';
import { radii, spacing, typography, useColors } from '@/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  tabLabel: string;
  icon?: IconName;
}

export const ComingSoonScreen: React.FC<Props> = ({ tabLabel, icon = 'clock' }) => {
  const c = useColors();
  return (
    <SafeAreaView style={[styles.root, { backgroundColor: c.surface }]} edges={['top']}>
      <View style={styles.center}>
        <View style={[styles.iconWrap, { backgroundColor: c.primarySoft }]}>
          <Icon name={icon} size={38} color={c.primary} />
        </View>
        <Text style={[styles.heading, { color: c.textPrimary }]}>Coming Soon</Text>
        <Text style={[styles.sub, { color: c.textSecondary }]}>
          {`${tabLabel} is on its way.\nWe're working hard to bring it to you.`}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
    gap: spacing.base,
  },
  iconWrap: {
    width: 84,
    height: 84,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  heading: {
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    letterSpacing: 0.2,
  },
  sub: {
    fontSize: typography.sizes.md,
    textAlign: 'center',
    lineHeight: typography.sizes.md * 1.6,
  },
});
