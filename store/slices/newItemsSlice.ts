import type { StateCreator } from 'zustand';

import type { Product } from '../entities';
import type { BanboxStore } from '../types';

export type NewItemsSlice = {
    newItems: Product[];
    newItemsFetchedAt: number | null;
    setNewItems: (items: Product[], fetchedAt?: number) => void;
    clearNewItems: () => void;
};

export const createNewItemsSlice: StateCreator<
    BanboxStore,
    [['zustand/persist', unknown]],
    [],
    NewItemsSlice
> = (set) => ({
    newItems: [],
    newItemsFetchedAt: null,
    setNewItems: (items, fetchedAt = Date.now()) =>
        set({ newItems: items, newItemsFetchedAt: fetchedAt }),
    clearNewItems: () => set({ newItems: [], newItemsFetchedAt: null }),
});
