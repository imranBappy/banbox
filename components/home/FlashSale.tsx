import { Icon } from '@/components/ui/Icon';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FLASH_SALE_DURATION_MS } from '@/constants/index';
import { useCountdown } from '@/hooks/useCountdown';
import { radii, spacing, typography, useColors } from '@/theme';
import { Product } from '@/types/index';
import { pad2 } from '@/utils/format';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  products: Product[];
  onPressItem?: (id: string) => void;
}

const TILE = 100;

const FlashSaleInner: React.FC<Props> = ({ products, onPressItem }) => {
  const c = useColors();
  const { hours, minutes, seconds } = useCountdown(FLASH_SALE_DURATION_MS);

  return (
    <View style={{ marginTop: spacing.xl }}>
      <SectionHeader
        title="Flash Sale"
        trailing={
          <View style={styles.timerRow} accessibilityLabel="Flash sale ends soon">
            <Icon name="clock" size={18} color={c.primary} />
            <TimerCell value={hours} bg={c.surfaceMuted} fg={c.textPrimary} />
            <TimerCell value={minutes} bg={c.surfaceMuted} fg={c.textPrimary} />
            <TimerCell value={seconds} bg={c.surfaceMuted} fg={c.textPrimary} />
          </View>
        }
      />
      <FlashList
        data={products}
        keyExtractor={(p) => p.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onPressItem?.(item.id)}
            accessibilityRole="button"
            accessibilityLabel={`${item.title}, ${item.discountPercent}% off`}
            style={({ pressed }) => [
              styles.tile,
              { backgroundColor: c.surfaceMuted },
              pressed && { opacity: 0.92 },
            ]}
          >
            <Image source={{ uri: item.imageUrl }} contentFit="cover" style={styles.image} />
            <View style={[styles.discountTag, { backgroundColor: c.saleTag }]}>
              <Text style={[styles.discountText, { color: c.textInverse }]}>
                -{item.discountPercent}%
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};


const TimerCell: React.FC<{ value: number; bg: string; fg: string }> = ({ value, bg, fg }) => (
  <View style={[styles.cell, { backgroundColor: bg }]}>
    <Text style={[styles.cellText, { color: fg }]}>{pad2(value)}</Text>
  </View>
);

const styles = StyleSheet.create({
  timerRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  cell: {
    minWidth: 28,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: radii.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.bold,
  },
  tile: {
    width: TILE,
    height: TILE,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%' },
  discountTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.xs,
  },
  discountText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
});

export const FlashSale = memo(FlashSaleInner);
