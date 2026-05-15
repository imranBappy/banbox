import type { StateCreator } from 'zustand';

import type { Product } from '../entities';
import type { BanboxStore } from '../types';

export type TopProductsSlice = {
    topProducts: Product[];
    topProductsFetchedAt: number | null;
    setTopProducts: (items: Product[], fetchedAt?: number) => void;
    clearTopProducts: () => void;
};

export const createTopProductsSlice: StateCreator<
    BanboxStore,
    [['zustand/persist', unknown]],
    [],
    TopProductsSlice
> = (set) => ({
    topProducts: [],
    topProductsFetchedAt: null,
    setTopProducts: (items, fetchedAt = Date.now()) =>
        set({ topProducts: items, topProductsFetchedAt: fetchedAt }),
    clearTopProducts: () => set({ topProducts: [], topProductsFetchedAt: null }),
});
