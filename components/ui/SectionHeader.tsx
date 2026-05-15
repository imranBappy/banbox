import { radii, spacing, typography, useColors } from '@/theme/index';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from './Icon';

interface Props {
    title: string;
    onSeeAll?: () => void;
    trailing?: React.ReactNode;
    showSeeAll?: boolean;
    rightAdornment?: React.ReactNode;
}

export const SectionHeader: React.FC<Props> = ({
    title,
    onSeeAll,
    trailing,
    showSeeAll = false,
    rightAdornment,
}) => {
    const c = useColors();
    return (
        <View style={styles.row}>
            <View style={styles.titleRow}>
                <Text style={[styles.title, { color: c.textPrimary }]}>{title}</Text>
                {rightAdornment}
            </View>
            {showSeeAll ? (
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`See all ${title}`}
                    onPress={onSeeAll}
                    style={({ pressed }) => [styles.seeAllRow, pressed && { opacity: 0.6 }]}
                >
                    <Text style={[styles.seeAll, { color: c.textSecondary }]}>See All</Text>
                    <View style={[styles.arrowCircle, { backgroundColor: c.primary }]}>
                        <Icon name="arrowRightSmall" size={14} color={c.textInverse} />
                    </View>
                </Pressable>
            ) : (
                trailing
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
    },
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    title: {
        fontSize: typography.sizes.xl,
        fontWeight: typography.weights.bold,
        letterSpacing: -0.3,
    },
    seeAllRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    seeAll: {
        fontSize: typography.sizes.body,
        fontWeight: typography.weights.medium,
    },
    arrowCircle: {
        width: 28,
        height: 28,
        borderRadius: radii.pill,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
