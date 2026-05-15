import { SectionHeader } from '@/components/ui/SectionHeader';
import { spacing } from '@/theme/spacing';
import { Product } from '@/types/inddex';
import { FlashList } from '@shopify/flash-list';
import React, { memo } from 'react';
import { View } from 'react-native';
import { ProductCard } from './ProductCard';

interface Props {
  items: Product[];
  onSeeAll?: () => void;
  onPressItem?: (id: string) => void;
}

const CARD_WIDTH = 140;

const MostPopularInner: React.FC<Props> = ({ items, onSeeAll, onPressItem }) => (
  <View style={{ marginTop: spacing.xl }}>
    <SectionHeader title="Most Popular" showSeeAll onSeeAll={onSeeAll} />
    <FlashList
      data={items}
      keyExtractor={(p) => p.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          width={CARD_WIDTH}
          variant="popular"
          onPress={onPressItem}
        />
      )}
    />
  </View>
);

export const MostPopular = memo(MostPopularInner);
