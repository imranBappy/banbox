import { Avatar } from '@/components/ui/Avatar';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { spacing } from '@/theme';
import { RecentlyViewedItem } from '@/types';
import { FlashList } from '@shopify/flash-list';
import React, { memo } from 'react';
import { Pressable, View } from 'react-native';

interface Props {
  items: RecentlyViewedItem[];
  onPressItem?: (id: string) => void;
}

const RecentlyViewedInner: React.FC<Props> = ({ items, onPressItem }) => (
  <View style={{ marginTop: spacing.xl }}>
    <SectionHeader title="Recently viewed" />
    <FlashList
      data={items}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onPressItem?.(item.id)}
          accessibilityRole="button"
          accessibilityLabel="Recently viewed item"
        >
          <Avatar uri={item.imageUrl} size={56} ring />
        </Pressable>
      )}
    />
  </View>
);

export const RecentlyViewed = memo(RecentlyViewedInner);
