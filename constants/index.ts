export const APP_NAME = 'Banbox';
export const APP_TAGLINE = 'Style delivered to your door';

export const API_BASE_URL = 'http://139.59.122.17:4000';

export const SPLASH_MIN_DURATION_MS = 1800;

export const FLASH_SALE_DURATION_MS = (0 * 3600 + 36 * 60 + 58) * 1000;

export const TOUCH_TARGET_MIN = 44;

export const TABS = [
    { key: 'home', label: 'Home', icon: 'home' },
    { key: 'wishlist', label: 'Wishlist', icon: 'heart' },
    { key: 'orders', label: 'Orders', icon: 'list' },
    { key: 'cart', label: 'Cart', icon: 'bag' },
    { key: 'profile', label: 'Profile', icon: 'user' },
] as const;

export type TabKey = (typeof TABS)[number]['key'];
