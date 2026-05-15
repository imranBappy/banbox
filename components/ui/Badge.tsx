import { radii, spacing, typography, useColors } from '@/theme';
import type { Palette } from '@/theme/colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Variant = 'new' | 'sale' | 'hot';

const labels: Record<Variant, string> = { new: 'New', sale: 'Sale', hot: 'Hot' };

const colorMap = (c: Palette): Record<Variant, { bg: string; fg: string }> => ({
    new: { bg: c.badgeNew, fg: c.badgeNewText },
    sale: { bg: c.badgeSale, fg: c.badgeSaleText },
    hot: { bg: c.badgeHot, fg: c.badgeHotText },
});

export const Badge: React.FC<{ variant: Variant }> = ({ variant }) => {
    const c = useColors();
    const { bg, fg } = colorMap(c)[variant];
    return (
        <View style={[styles.pill, { backgroundColor: bg }]}>
            <Text style={[styles.text, { color: fg }]}>{labels[variant]}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    pill: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 3,
        borderRadius: radii.sm,
        alignSelf: 'flex-start',
    },
    text: {
        fontSize: typography.sizes.xs,
        fontWeight: typography.weights.semibold,
    },
});
