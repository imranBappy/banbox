import type { StateCreator } from 'zustand';

import type { BanboxStore } from '../types';

const MAX_VIEWED = 80;

export type ViewedSlice = {
    viewedProductIds: string[];
    addViewedProduct: (productId: string) => void;
    clearViewedProducts: () => void;
};

export const createViewedSlice: StateCreator<
    BanboxStore,
    [['zustand/persist', unknown]],
    [],
    ViewedSlice
> = (set) => ({
    viewedProductIds: [],
    addViewedProduct: (productId) =>
        set((s) => {
            const without = s.viewedProductIds.filter((id) => id !== productId);
            const next = [productId, ...without].slice(0, MAX_VIEWED);
            return { viewedProductIds: next };
        }),
    clearViewedProducts: () => set({ viewedProductIds: [] }),
});
