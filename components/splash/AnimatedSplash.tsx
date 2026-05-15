import { typography } from '@/theme';
import { Package } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';

const LOGO_SIZE = 88;
const ENTER_MS = 720;
const HOLD_MS = 1000;
const EXIT_MS = 420;

interface Props {
    backgroundColor: string;
    primaryColor: string;
    textColor: string;
    onFinish: () => void;
}

export function AnimatedSplash({ backgroundColor, primaryColor, textColor, onFinish }: Props) {
    const overlayOpacity = useSharedValue(1);
    const logoScale = useSharedValue(0.82);
    const logoOpacity = useSharedValue(0);
    const titleOpacity = useSharedValue(0);
    const titleTranslateY = useSharedValue(14);
    const accentWidth = useSharedValue(0);

    useEffect(() => {
        const easeOut = Easing.out(Easing.cubic);

        logoOpacity.value = withTiming(1, { duration: ENTER_MS, easing: easeOut });
        logoScale.value = withTiming(1, { duration: ENTER_MS, easing: easeOut });

        titleOpacity.value = withDelay(
            220,
            withTiming(1, { duration: ENTER_MS - 120, easing: easeOut }),
        );
        titleTranslateY.value = withDelay(
            220,
            withTiming(0, { duration: ENTER_MS - 120, easing: easeOut }),
        );

        accentWidth.value = withDelay(
            380,
            withTiming(48, { duration: 520, easing: easeOut }),
        );

        const finishDelay = ENTER_MS + HOLD_MS;
        overlayOpacity.value = withDelay(
            finishDelay,
            withTiming(0, { duration: EXIT_MS, easing: Easing.in(Easing.cubic) }, (finished) => {
                if (finished) {
                    runOnJS(onFinish)();
                }
            }),
        );
    }, [
        accentWidth,
        logoOpacity,
        logoScale,
        onFinish,
        overlayOpacity,
        titleOpacity,
        titleTranslateY,
    ]);

    const overlayStyle = useAnimatedStyle(() => ({
        opacity: overlayOpacity.value,
    }));

    const logoStyle = useAnimatedStyle(() => ({
        opacity: logoOpacity.value,
        transform: [{ scale: logoScale.value }],
    }));

    const titleStyle = useAnimatedStyle(() => ({
        opacity: titleOpacity.value,
        transform: [{ translateY: titleTranslateY.value }],
    }));

    const accentStyle = useAnimatedStyle(() => ({
        width: accentWidth.value,
    }));

    return (
        <Animated.View
            pointerEvents="none"
            style={[styles.overlay, { backgroundColor }, overlayStyle]}
        >
            <View style={styles.content}>
                <Animated.View style={logoStyle}>
                    <Package
                        size={LOGO_SIZE}
                        color={primaryColor}
                        strokeWidth={1.75}
                        fill={primaryColor}
                    />
                </Animated.View>

                <Animated.View style={[styles.titleBlock, titleStyle]}>
                    <Text style={[styles.title, { color: textColor }]}>Banbox</Text>
                    <Animated.View
                        style={[styles.accent, { backgroundColor: primaryColor }, accentStyle]}
                    />
                    <Text style={[styles.tagline, { color: primaryColor }]}>Shop smarter</Text>
                </Animated.View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        gap: 28,
    },
    titleBlock: {
        alignItems: 'center',
        gap: 10,
    },
    title: {
        fontSize: typography.sizes.display,
        fontWeight: typography.weights.bold,
        letterSpacing: -0.5,
    },
    accent: {
        height: 3,
        borderRadius: 999,
    },
    tagline: {
        fontSize: typography.sizes.base,
        fontWeight: typography.weights.semibold,
        letterSpacing: 0.4,
    },
});
