import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { radii, spacing, typography, useColors } from '@/theme';
import { Product } from '@/types';
import { formatCount, formatPrice } from '@/utils/format';
import { Image } from 'expo-image';
import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

const ProductCardInner: React.FC<{ product: Product; width: number; variant?: 'newItem' | 'popular' | 'justForYou'; onPress?: (id: string) => void; style?: ViewStyle }> = ({ product, width, variant = 'newItem', onPress, style }) => {
    const c = useColors();
    const imageHeight = variant === 'justForYou' ? width * 1.15 : width;
    return (
        <Pressable
            onPress={() => onPress?.(product.id)}
            accessibilityRole="button"
            accessibilityLabel={`${product.title}, ${formatPrice(product.price, product.currency)}`}
            style={({ pressed }) => [styles.card, { width }, pressed && { opacity: 0.92 }, style]}
        >
            <View
                style={[styles.imageWrap, { height: imageHeight, backgroundColor: c.surfaceMuted }]}
            >
                <Image source={{ uri: product.imageUrl }} contentFit="cover" style={styles.image} />
            </View>
            {variant === 'popular' ? (
                <View style={[styles.popularMeta, { backgroundColor: c.surface }]}>
                    <View style={styles.likeRow}>
                        <Text style={[styles.likes, { color: c.textPrimary }]}>{formatCount(product.likes ?? 0)}</Text>
                        <Icon name="heart" size={14} color={c.primary} filled />
                    </View>
                    {product.badge ? <Badge variant={product.badge} /> : null}
                </View>
            ) : (
                <View style={styles.text}>
                    <Text style={[styles.title, { color: c.textSecondary }]} numberOfLines={2}>
                        {product.title}
                    </Text>
                    <Text style={[styles.price, { color: c.textPrimary }]}>
                        {formatPrice(product.price, product.currency)}
                    </Text>
                </View>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: { borderRadius: radii.lg },
    imageWrap: {
        width: '100%',
        borderRadius: radii.lg,
        overflow: 'hidden',
        marginBottom: spacing.sm,
    },
    image: { width: '100%', height: '100%' },
    text: { gap: 2 },
    title: {
        fontSize: typography.sizes.body,
        lineHeight: typography.sizes.body * 1.35,
    },
    price: {
        fontSize: typography.sizes.md,
        fontWeight: typography.weights.bold,
        marginTop: 2,
    },
    popularMeta: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: radii.md,
        marginTop: -spacing.xl,
        marginHorizontal: spacing.sm,
        shadowColor: '#0F1626',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 2,
    },
    likeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    likes: {
        fontSize: typography.sizes.body,
        fontWeight: typography.weights.bold,
    },
});

export const ProductCard = memo(ProductCardInner);
