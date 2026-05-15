import type { StateCreator } from 'zustand';

import type { Product } from '../entities';
import type { BanboxStore } from '../types';

export type JustForYouSlice = {
    justForYouProducts: Product[];
    justForYouFetchedAt: number | null;
    setJustForYouProducts: (items: Product[], fetchedAt?: number) => void;
    clearJustForYouProducts: () => void;
};

export const createJustForYouSlice: StateCreator<
    BanboxStore,
    [['zustand/persist', unknown]],
    [],
    JustForYouSlice
> = (set) => ({
    justForYouProducts: [],
    justForYouFetchedAt: null,
    setJustForYouProducts: (items, fetchedAt = Date.now()) =>
        set({ justForYouProducts: items, justForYouFetchedAt: fetchedAt }),
    clearJustForYouProducts: () =>
        set({ justForYouProducts: [], justForYouFetchedAt: null }),
});
