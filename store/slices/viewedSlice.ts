import type { StateCreator } from 'zustand';

import type { Product } from '../entities';
import { MAX_VIEWED } from '../limits';
import type { BanboxStore } from '../types';

export type ViewedSlice = {
    viewedProductIds: string[];
    recentlyViewedProducts: Product[];
    addViewedProduct: (productId: string) => void;
    setRecentlyViewedProducts: (items: Product[]) => void;
    clearViewedProducts: () => void;
};

export const createViewedSlice: StateCreator<
    BanboxStore,
    [['zustand/persist', unknown]],
    [],
    ViewedSlice
> = (set) => ({
    viewedProductIds: [],
    recentlyViewedProducts: [],
    setRecentlyViewedProducts: (items) =>
        set({
            recentlyViewedProducts: items,
            viewedProductIds: items
                .map((p) => p.id)
                .filter((id): id is string => typeof id === 'string' && id.length > 0)
                .slice(0, MAX_VIEWED),
        }),
    addViewedProduct: (productId) =>
        set((s) => {
            const without = s.viewedProductIds.filter((id) => id !== productId);
            const next = [productId, ...without].slice(0, MAX_VIEWED);
            return { viewedProductIds: next };
        }),
    clearViewedProducts: () =>
        set({ viewedProductIds: [], recentlyViewedProducts: [] }),
});
