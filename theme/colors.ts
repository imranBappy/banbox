export const lightPalette = {
    primary: '#2563FF',
    primaryDark: '#1B4FD9',
    primarySoft: '#E8EFFF',
    accent: '#FF3D5A',

    background: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceMuted: '#F4F6FA',
    surfaceAlt: '#F8F9FC',

    textPrimary: '#0F1626',
    textSecondary: '#5C6577',
    textMuted: '#9097A6',
    textInverse: '#FFFFFF',

    border: '#ECEEF3',
    divider: '#EEF0F5',

    badgeNew: '#E8EFFF',
    badgeNewText: '#2563FF',
    badgeSale: '#FFE7DE',
    badgeSaleText: '#FF6A3D',
    badgeHot: '#FFEEEC',
    badgeHotText: '#FF3D5A',

    liveRed: '#E63946',
    star: '#2563FF',
    saleTag: '#FF3D5A',
    success: '#10B981',
    warning: '#F59E0B',
    shadow: 'rgba(15, 22, 38, 0.06)',
    backdrop: 'rgba(15, 22, 38, 0.45)',
} as const;

export type Palette = { [K in keyof typeof lightPalette]: string };

export const darkPalette: Palette = {
    primary: '#3B82F6',
    primaryDark: '#1D4ED8',
    primarySoft: '#1A2540',
    accent: '#FF5573',

    background: '#0B0F1A',
    surface: '#121826',
    surfaceMuted: '#1B2333',
    surfaceAlt: '#1F2839',

    textPrimary: '#F5F7FB',
    textSecondary: '#A8B0C0',
    textMuted: '#6B7385',
    textInverse: '#0B0F1A',

    border: '#28324A',
    divider: '#1F2839',

    badgeNew: '#1A2540',
    badgeNewText: '#7FA3FF',
    badgeSale: '#3A1F18',
    badgeSaleText: '#FF8866',
    badgeHot: '#3A1A20',
    badgeHotText: '#FF6E84',

    liveRed: '#EF4D5B',
    star: '#7FA3FF',
    saleTag: '#FF5573',
    success: '#10B981',
    warning: '#F59E0B',
    shadow: 'rgba(0, 0, 0, 0.35)',
    backdrop: 'rgba(0, 0, 0, 0.65)',
};

/** Backwards-compatible alias for legacy modules; new code should use `useColors()`. */
export const palette = lightPalette;
