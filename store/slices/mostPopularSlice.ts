import type { StateCreator } from 'zustand';

import type { Product } from '../entities';
import type { BanboxStore } from '../types';

export type MostPopularSlice = {
    mostPopularItems: Product[];
    mostPopularFetchedAt: number | null;
    setMostPopularItems: (items: Product[], fetchedAt?: number) => void;
    clearMostPopularItems: () => void;
};

export const createMostPopularSlice: StateCreator<
    BanboxStore,
    [['zustand/persist', unknown]],
    [],
    MostPopularSlice
> = (set) => ({
    mostPopularItems: [],
    mostPopularFetchedAt: null,
    setMostPopularItems: (items, fetchedAt = Date.now()) =>
        set({ mostPopularItems: items, mostPopularFetchedAt: fetchedAt }),
    clearMostPopularItems: () =>
        set({ mostPopularItems: [], mostPopularFetchedAt: null }),
});
