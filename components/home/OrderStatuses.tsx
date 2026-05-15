import { SectionHeader } from '@/components/ui/SectionHeader';
import { radii, spacing, typography, useColors } from '@/theme';
import { OrderStatus, OrderStatusKey } from '@/types';
import React, { memo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  items: OrderStatus[];
  initialKey?: OrderStatusKey;
  onChange?: (key: OrderStatusKey) => void;
}

const OrderStatusesInner: React.FC<Props> = ({ items, initialKey, onChange }) => {
  const c = useColors();
  const [activeKey, setActiveKey] = useState<OrderStatusKey | undefined>(initialKey);

  return (
    <View style={{ marginTop: spacing.xl }}>
      <SectionHeader title="My Orders" />
      <View style={styles.row}>
        {items.map((item) => {
          const isActive = activeKey === item.key;
          return (
            <Pressable
              key={item.key}
              onPress={() => {
                setActiveKey(item.key);
                onChange?.(item.key);
              }}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={item.label}
              style={({ pressed }) => [
                styles.chip,
                { backgroundColor: isActive ? c.primary : c.primarySoft },
                pressed && { opacity: 0.85 },
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: isActive ? c.textInverse : c.primary },
                ]}
              >
                {item.label}
              </Text>
              {item.hasBadge ? (
                <View style={[styles.badge, { backgroundColor: c.success }]} />
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md, flexWrap: 'wrap' },
  chip: {
    minHeight: 44,
    paddingHorizontal: spacing.base,
    paddingVertical: 10,
    borderRadius: radii.pill,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  chipText: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semibold,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export const OrderStatuses = memo(OrderStatusesInner);
