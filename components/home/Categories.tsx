import { SectionHeader } from '@/components/ui/SectionHeader';
import { radii, spacing, typography, useColors } from '@/theme';
import { Category } from '@/types';
import { Image } from 'expo-image';
import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface Props {
  items: Category[];
  onSeeAll?: () => void;
  onPressCategory?: (id: string) => void;
}

const CategoriesInner: React.FC<Props> = ({ items, onSeeAll, onPressCategory }) => {
  const c = useColors();
  return (
    <View style={{ marginTop: spacing.xl }}>
      <SectionHeader title="Categories" showSeeAll onSeeAll={onSeeAll} />
      <View style={styles.grid}>
        {items.map((category) => (
          <Pressable
            key={category.id}
            accessibilityRole="button"
            accessibilityLabel={`${category.label}, ${category.count} items`}
            onPress={() => onPressCategory?.(category.id)}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: c.surface },
              pressed && { opacity: 0.92 },
            ]}
          >
            <View style={[styles.collage, { backgroundColor: c.surfaceMuted }]}>
              {category.images.slice(0, 4).map((uri, i) => (
                <View key={i} style={[styles.tile, tilePos(i)]}>
                  <Image source={{ uri }} contentFit="cover" style={styles.tileImg} />
                </View>
              ))}
            </View>
            <View style={styles.metaRow}>
              <Text style={[styles.label, { color: c.textPrimary }]}>{category.label}</Text>
              <Text style={[styles.count, { color: c.textMuted }]}>{category.count}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const tilePos = (i: number): ViewStyle => {
  const positions: Pick<ViewStyle, 'top' | 'left'>[] = [
    { top: 0, left: 0 },
    { top: 0, left: '50%' },
    { top: '50%', left: 0 },
    { top: '50%', left: '50%' },
  ];
  return { position: 'absolute', width: '50%', height: '50%', ...positions[i] };
};

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  card: {
    width: '48%',
    borderRadius: radii.lg,
    overflow: 'hidden',
    shadowColor: '#0F1626',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
  },
  collage: { width: '100%', aspectRatio: 1.4 },
  tile: { overflow: 'hidden', padding: 2 },
  tileImg: { width: '100%', height: '100%' },
  metaRow: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm + 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },
  count: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.medium,
  },
});

export const Categories = memo(CategoriesInner);
