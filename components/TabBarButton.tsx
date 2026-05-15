import * as Haptics from 'expo-haptics';
import React, { memo, useCallback, useEffect } from 'react';
import {
    GestureResponderEvent,
    LayoutChangeEvent,
    Pressable,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { Icon, IconName } from '@/components/ui/Icon';

const TAB_SPRING = { damping: 16, stiffness: 260, mass: 0.55 };
const PRESS_SPRING = { damping: 14, stiffness: 400, mass: 0.35 };

type TabColors = { primary: string; muted: string };

export interface TabBarButtonProps {
    tab: { key: string; label: string; icon: IconName };
    isActive: boolean;
    colors: TabColors;
    onPress: (e: GestureResponderEvent) => void;
    onLongPress?: (e: GestureResponderEvent) => void;
    onTabLayout: (key: string, e: LayoutChangeEvent) => void;
    style?: StyleProp<ViewStyle>;
}

export const TabBarButton = memo(
    ({ tab, isActive, colors, onPress, onLongPress, onTabLayout, style }: TabBarButtonProps) => {
        const selected = useSharedValue(isActive ? 1 : 0);
        const pressed = useSharedValue(0);

        useEffect(() => {
            selected.value = withSpring(isActive ? 1 : 0, TAB_SPRING);
        }, [isActive, selected]);

        const iconAnimatedStyle = useAnimatedStyle(() => {
            const selectedScale = interpolate(selected.value, [0, 1], [1, 1.08], Extrapolation.CLAMP);
            const pressScale = interpolate(pressed.value, [0, 1], [1, 0.92], Extrapolation.CLAMP);
            const lift = interpolate(selected.value, [0, 1], [0, -1], Extrapolation.CLAMP);
            return {
                transform: [{ translateY: lift }, { scale: selectedScale * pressScale }],
            };
        });

        const handleLayout = useCallback(
            (e: LayoutChangeEvent) => {
                onTabLayout(tab.key, e);
            },
            [onTabLayout, tab.key],
        );

        return (
            <Pressable
                onLayout={handleLayout}
                onPress={onPress}
                onLongPress={onLongPress}
                onPressIn={() => {
                    if (process.env.EXPO_OS === 'ios') {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                    pressed.value = withSpring(1, PRESS_SPRING);
                }}
                onPressOut={() => {
                    pressed.value = withSpring(0, PRESS_SPRING);
                }}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
                accessibilityLabel={tab.label}
                // Navigation passes tabVerticalUiKit (justifyContent: 'flex-start') for icon+label
                // stacks; put our styles last so icons stay vertically centered when labels are hidden.
                style={[style, styles.btn]}
            >
                <Animated.View style={iconAnimatedStyle}>
                    <Icon
                        name={tab.icon}
                        size={24}
                        color={isActive ? colors.primary : colors.muted}
                        filled={isActive}
                    />
                </Animated.View>
            </Pressable>
        );
    },
);

TabBarButton.displayName = 'TabBarButton';

const styles = StyleSheet.create({
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
