import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Palette, darkPalette, lightPalette } from "./colors";

export type ThemeMode = "system" | 'dark' | 'light'
export type ThemeScheme = 'light' | 'dark'

interface ThemeContextValue {
    mode: ThemeMode;
    scheme: ThemeScheme;
    colors: Palette;
    setMode: (mode: ThemeMode) => void;
    toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
interface ProviderProps {
    initialMode?: ThemeMode;
    children: React.ReactNode;
}
export const ThemeProvider: React.FC<ProviderProps> = ({ initialMode = 'system', children }) => {
    const systemScheme = useColorScheme();
    const [mode, setMode] = useState<ThemeMode>(initialMode);
    const [scheme] = useState<ThemeScheme>(systemScheme ?? 'light');
    const colors = scheme === 'dark' ? darkPalette : lightPalette;

    const toggle = useCallback(() => {
        setMode((current) => {
            if (current === 'system') {
                return systemScheme === 'dark' ? 'light' : 'dark';
            }
            return current === 'dark' ? 'light' : 'dark';
        });
    }, [systemScheme]);
    const value = useMemo<ThemeContextValue>(
        () => ({ mode, scheme, colors, setMode, toggle }),
        [mode, scheme, colors, toggle],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
  
}


export const useThemeContext = ():ThemeContextValue => {
    const context = useContext(ThemeContext);
    return context ?? {
        mode: 'light',
        scheme: 'light',
        colors: lightPalette,
        setMode: () => undefined,
        toggle: () => undefined,
    };
}

export const useColors = (): Palette => useThemeContext().colors;

/** Returns the current resolved scheme — 'light' or 'dark'. */
export const useScheme = (): ThemeScheme => useThemeContext().scheme;

/** Returns mode + toggles for theme switching. */
export const useThemeMode = () => {
    const { mode, scheme, setMode, toggle } = useThemeContext();
    return { mode, scheme, setMode, toggle };
};
