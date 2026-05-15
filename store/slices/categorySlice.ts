import type { StateCreator } from 'zustand';

import type { Category } from '../entities';
import type { BanboxStore } from '../types';

export type CategorySlice = {
    categories: Category[];
    categoriesFetchedAt: number | null;
    setCategories: (items: Category[], fetchedAt?: number) => void;
    clearCategories: () => void;
};

export const createCategorySlice: StateCreator<
    BanboxStore,
    [['zustand/persist', unknown]],
    [],
    CategorySlice
> = (set) => ({
    categories: [],
    categoriesFetchedAt: null,
    setCategories: (items, fetchedAt = Date.now()) =>
        set({ categories: items, categoriesFetchedAt: fetchedAt }),
    clearCategories: () => set({ categories: [], categoriesFetchedAt: null }),
});
