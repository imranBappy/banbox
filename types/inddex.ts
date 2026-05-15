import type { AuthUser, } from '@/store/entities';
export type ID = string;

/** Raw `/home` response; fields are normalized in `applyHomePayload`. */
export type HomePayload = {
    user: unknown;
    announcement: unknown;
    recentlyViewed: unknown;
    orderStatuses: unknown;
    stories: unknown;
    newItems: unknown;
    mostPopular: unknown;
    categories: unknown;
    flashSale: unknown;
    topProducts: unknown;
    justForYou: unknown;
};

export type HomeFlashSalePayload = {
    products?: Product[];
    endsAt?: number | null;
};

export function isAuthUserPayload(raw: unknown): raw is AuthUser {
    if (!raw || typeof raw !== 'object') return false;
    const o = raw as Record<string, unknown>;
    return typeof o.id === 'string' && typeof o.email === 'string';
}


export interface Announcement {
    id: ID;
    title: string;
    body: string;
    ctaLabel?: string;
}

export interface RecentlyViewedItem {
    id: ID;
    imageUrl: string;
}

export type OrderStatusKey = 'toPay' | 'toReceive' | 'toReview';

export interface OrderStatus {
    key: OrderStatusKey;
    label: string;
    hasBadge?: boolean;
}

export interface Story {
    id: ID;
    imageUrl: string;
    isLive?: boolean;
    author?: string;
}
export interface Product {
    id: ID;
    title: string;
    imageUrl: string;
    price: number;
    currency: string;
    oldPrice?: number;
    likes?: number;
    badge?: 'new' | 'sale' | 'hot';
    discountPercent?: number;
}


export interface Category {
    id: ID;
    label: string;
    count: number;
    images: string[];
}
