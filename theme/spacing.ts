export const spacing = {
    xxs: 2,
    xs: 4,
    sm: 8, 
    md: 12,
    base: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 40,
    screen: 20,
}

export const radii = {
    sx: 6,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    pill: 999
} as const;

export const elevation = {
    card: {
        shadowColor: '#0F1626',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 2,
    },
    pill: {
        shadowColor: '#0F1626',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },
} as const;
