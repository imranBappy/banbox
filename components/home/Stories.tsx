import { Icon } from '@/components/ui/Icon';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { radii, spacing, typography, useColors } from '@/theme';
import { Story } from '@/types/inddex';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  stories: Story[];
  onPressStory?: (id: string) => void;
}

const StoriesInner: React.FC<Props> = ({ stories, onPressStory }) => {
  const c = useColors();
  return (
    <View style={{ marginTop: spacing.xl }}>
      <SectionHeader title="Stories" />
      <FlashList
        data={stories}
        keyExtractor={(s) => s.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: spacing.md }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onPressStory?.(item.id)}
            accessibilityRole="button"
            accessibilityLabel={item.isLive ? 'Live story' : 'Story'}
            style={({ pressed }) => [
              styles.tile,
              { backgroundColor: c.surfaceMuted },
              pressed && { opacity: 0.92 },
            ]}
          >
            <Image source={{ uri: item.imageUrl }} contentFit="cover" style={styles.image} />
            {item.isLive ? (
              <View style={styles.liveBadge}>
                <Icon name="play" size={10} color={c.textInverse} />
                <Text style={[styles.liveText, { color: c.textInverse }]}>Live</Text>
              </View>
            ) : null}
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: 110,
    height: 160,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  liveBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.sm,
    backgroundColor: '#22C55E',
  },
  liveText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.bold,
  },
});

export const Stories = memo(StoriesInner);
