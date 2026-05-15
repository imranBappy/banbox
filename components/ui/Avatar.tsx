import { radii, useColors } from '@/theme/index';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
    uri: string;
    size?: number;
    ring?: boolean;
    style?: ViewStyle;
    accessibilityLabel?: string;
}

export const Avatar: React.FC<Props> = ({ uri, size = 44, ring = false, style, accessibilityLabel }) => {
    const c = useColors();
    const dimension = { width: size, height: size, borderRadius: size / 2 };
    return (
        <View
            style={[
                styles.wrap,
                { backgroundColor: c.surfaceMuted },
                ring && [styles.ring, { borderColor: c.surface }],
                dimension,
                style,
            ]}
            accessible
            accessibilityRole="image"
            accessibilityLabel={accessibilityLabel}
        >
            <Image source={{ uri }} contentFit="cover" style={[dimension, styles.image]} accessibilityIgnoresInvertColors />
        </View>
    );
};

const styles = StyleSheet.create({
    wrap: { overflow: 'hidden' },
    ring: {
        borderWidth: 2,
        shadowColor: '#0F1626',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 1,
    },
    image: {
        borderRadius: radii.pill,
    },
});
