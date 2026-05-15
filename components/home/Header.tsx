import { Avatar } from '@/components/ui/Avatar';
import { Icon } from '@/components/ui/Icon';
import { TOUCH_TARGET_MIN } from '@/constants';
import { radii, spacing, typography, useColors, useScheme } from '@/theme';
import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
    user: { name: string; avatarUrl: string };
    onPressActivity?: () => void;
    onPressGrid?: () => void;
    onPressMenu?: () => void;
    onPressSettings?: () => void;
}

const HeaderInner: React.FC<Props> = ({
    user,
    onPressActivity,
    onPressGrid,
    onPressMenu,
    onPressSettings,
}) => {
    const c = useColors();
    const scheme = useScheme();
    return (
        <View>
            <View style={styles.topRow}>
                <Avatar uri={user.avatarUrl} size={42} accessibilityLabel={`${user.name} avatar`} />
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="My activity"
                    onPress={onPressActivity}
                    style={({ pressed }) => [
                        styles.activityPill,
                        { backgroundColor: c.primary },
                        pressed && { opacity: 0.9 },
                    ]}
                >
                    <Text style={[styles.activityText, { color: c.textInverse }]}>My Activity</Text>
                </Pressable>
                <View style={styles.rightIcons}>
                    <IconButton name="grid" onPress={onPressGrid} label="View grid" color={c.textPrimary} />
                    <IconButton
                        name="menu"
                        onPress={onPressMenu}
                        label="Menu"
                        color={c.textPrimary}
                        adornment={<View style={[styles.dot, { backgroundColor: c.primary }]} />}
                    />
                    <IconButton
                        name={scheme === 'dark' ? 'sun' : 'moon'}
                        onPress={onPressSettings}
                        label={scheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        color={c.textPrimary}
                    />
                </View>
            </View>
            <Text style={[styles.greeting, { color: c.textPrimary }]}>{`Hello, ${user.name}!`}</Text>
        </View>
    );
};

const IconButton: React.FC<{
    name: 'grid' | 'menu' | 'settings' | 'sun' | 'moon';
    onPress?: () => void;
    label: string;
    color: string;
    adornment?: React.ReactNode;
}> = ({ name, onPress, label, color, adornment }) => (
    <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={onPress}
        hitSlop={8}
        style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}
    >
        <Icon name={name} size={22} color={color} />
        {adornment}
    </Pressable>
);

const styles = StyleSheet.create({
    topRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
    activityPill: {
        paddingHorizontal: spacing.base,
        height: 36,
        borderRadius: radii.pill,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: spacing.xs,
    },
    activityText: {
        fontWeight: typography.weights.semibold,
        fontSize: typography.sizes.body,
    },
    rightIcons: {
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    iconBtn: {
        width: TOUCH_TARGET_MIN,
        height: TOUCH_TARGET_MIN,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    dot: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    greeting: {
        marginTop: spacing.base,
        fontSize: typography.sizes.display,
        fontWeight: typography.weights.bold,
        letterSpacing: -0.5,
    },
});

export const Header = memo(HeaderInner);
