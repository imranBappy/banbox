import { Platform, TextStyle } from "react-native";

const family = Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: 'System'
}) as string;

const familyBold = Platform.select({
    ios: 'System',
    android: 'sans-serif-medium',
    default: 'System',
}) as string;


export const typography = {
    family,
    familyBold,
    weights: {
        regular: '400' as TextStyle['fontWeight'],
        medium: '500' as TextStyle['fontWeight'],
        semibold: '600' as TextStyle['fontWeight'],
        bold: '700' as TextStyle['fontWeight'],
        extrabold: '800' as TextStyle['fontWeight'],
    },
    sizes: {
        xxs: 10,
        xs: 11,
        sm: 12,
        body: 13,
        base: 14,
        md: 15,
        lg: 17,
        xl: 19,
        xxl: 22,
        title: 24,
        display: 28,
    },
    lineHeights: {
        tight: 1.15,
        normal: 1.35,
        relaxed: 1.55,
    },
} as const;