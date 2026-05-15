import type { HomeFlashSalePayload, HomePayload } from '@/types';

import type { AuthUser, Category, Product, Story } from './entities';
import { MAX_VIEWED } from './limits';
import type { BanboxStore } from './types';

function asRecord(raw: unknown): Record<string, unknown> {
    if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
        return raw as Record<string, unknown>;
    }
    return {};
}

function asProductArray(raw: unknown): Product[] {
    return Array.isArray(raw) ? (raw as Product[]) : [];
}

function asCategoryArray(raw: unknown): Category[] {
    return Array.isArray(raw) ? (raw as Category[]) : [];
}

function asStoryArray(raw: unknown): Story[] {
    return Array.isArray(raw) ? (raw as Story[]) : [];
}

function asOrderStatuses(raw: unknown): unknown[] {
    return Array.isArray(raw) ? raw : [];
}

function parseFlashSale(raw: unknown): { products: Product[]; endsAt: number | null } {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
        return { products: [], endsAt: null };
    }
    const o = raw as HomeFlashSalePayload;
    const products = Array.isArray(o.products) ? o.products : [];
    const endsAt = typeof o.endsAt === 'number' ? o.endsAt : null;
    return { products, endsAt };
}

/**
 * Maps `/home` JSON into existing slices (single `setState` for one persist write).
 */
export function applyHomePayload(
    setState: (partial: Partial<BanboxStore>) => void,
    payload: HomePayload,
): void {
    const fetchedAt = Date.now();
    const recentlyViewed = asProductArray(payload.recentlyViewed).slice(0, MAX_VIEWED);
    const { products: flashProducts, endsAt: flashEndsAt } = parseFlashSale(payload.flashSale);
   
    const patch: Partial<BanboxStore> = {
        announcement: asRecord(payload.announcement),
        orderStatuses: asOrderStatuses(payload.orderStatuses),
        recentlyViewedProducts: recentlyViewed,
        viewedProductIds: recentlyViewed
            .map((p) => p.id)
            .filter((id): id is string => typeof id === 'string' && id.length > 0)
            .slice(0, MAX_VIEWED),
        stories: asStoryArray(payload.stories),
        newItems: asProductArray(payload.newItems),
        newItemsFetchedAt: fetchedAt,
        mostPopularItems: asProductArray(payload.mostPopular),
        mostPopularFetchedAt: fetchedAt,
        categories: asCategoryArray(payload.categories),
        categoriesFetchedAt: fetchedAt,
        flashSaleProducts: flashProducts,
        flashSaleEndsAt: flashEndsAt,
        flashSaleFetchedAt: fetchedAt,
        topProducts: asProductArray(payload.topProducts),
        topProductsFetchedAt: fetchedAt,
        justForYouProducts: asProductArray(payload.justForYou),
        justForYouFetchedAt: fetchedAt,
        user: payload.user as AuthUser | null,
    };

    setState(patch);
}
