import { palette } from "./colors";
import { elevation, radii, spacing } from "./spacing";
import { typography } from "./typography";

export const theme = {
    spacing,
    radii,
    elevation,
    typography,
    colors:palette,
} as const;

export type Theme = typeof theme;


export * from './ThemeContext';
export * from './colors';
export * from './spacing';
export * from './typography';
