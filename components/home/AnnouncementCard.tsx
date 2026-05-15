import { Icon } from '@/components/ui/Icon';
import { radii, spacing, typography, useColors } from '@/theme';
import { Announcement } from '@/types/inddex';
import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  announcement: Announcement;
  onPressCta?: () => void;
}

const AnnouncementCardInner: React.FC<Props> = ({ announcement, onPressCta }) => {
  const c = useColors();
  return (
    <View
      style={[styles.card, { backgroundColor: c.surfaceMuted }]}
      accessible
      accessibilityRole="summary"
      accessibilityLabel={announcement.title}
    >
      <View style={styles.copy}>
        <Text style={[styles.title, { color: c.textPrimary }]}>{announcement.title}</Text>
        <Text style={[styles.body, { color: c.textSecondary }]} numberOfLines={2}>
          {announcement.body}
        </Text>
      </View>
      <Pressable
        onPress={onPressCta}
        accessibilityRole="button"
        accessibilityLabel={announcement.ctaLabel ?? 'View announcement'}
        style={({ pressed }) => [
          styles.cta,
          { backgroundColor: c.primary },
          pressed && { opacity: 0.85 },
        ]}
      >
        <Icon name="arrowRight" size={20} color={c.textInverse} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    padding: spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.base,
  },
  copy: { flex: 1 },
  title: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    marginBottom: 2,
  },
  body: {
    fontSize: typography.sizes.sm,
    lineHeight: typography.sizes.sm * 1.45,
  },
  cta: {
    width: 44,
    height: 44,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const AnnouncementCard = memo(AnnouncementCardInner);
