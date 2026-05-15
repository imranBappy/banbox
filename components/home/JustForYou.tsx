import { Icon } from '@/components/ui/Icon';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { spacing, useColors } from '@/theme';
import { Product } from '@/types';
import React, { memo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ProductCard } from './ProductCard';

interface Props {
  items: Product[];
  onPressItem?: (id: string) => void;
}

const JustForYouInner: React.FC<Props> = ({ items, onPressItem }) => {
  const c = useColors();
  const cardWidth = (Dimensions.get('window').width - spacing.screen * 2 - spacing.md) / 2;
  return (
    <View style={{ marginTop: spacing.xl }}>
      <SectionHeader
        title="Just For You"
        rightAdornment={<Icon name="star" size={16} color={c.primary} filled />}
      />
      <View style={styles.grid}>
        {items.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            width={cardWidth}
            variant="justForYou"
            onPress={onPressItem}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: spacing.md,
    rowGap: spacing.lg,
  },
});

export const JustForYou = memo(JustForYouInner);
