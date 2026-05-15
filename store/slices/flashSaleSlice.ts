import type { StateCreator } from 'zustand';

import type { Product } from '../entities';
import type { BanboxStore } from '../types';

export type FlashSaleSlice = {
    flashSaleProducts: Product[];
    flashSaleEndsAt: number | null;
    flashSaleFetchedAt: number | null;
    setFlashSale: (args: {
        products: Product[];
        endsAt?: number | null;
        fetchedAt?: number;
    }) => void;
    clearFlashSale: () => void;
};

export const createFlashSaleSlice: StateCreator<
    BanboxStore,
    [['zustand/persist', unknown]],
    [],
    FlashSaleSlice
> = (set) => ({
    flashSaleProducts: [],
    flashSaleEndsAt: null,
    flashSaleFetchedAt: null,
    setFlashSale: ({ products, endsAt = null, fetchedAt = Date.now() }) =>
        set({
            flashSaleProducts: products,
            flashSaleEndsAt: endsAt,
            flashSaleFetchedAt: fetchedAt,
        }),
    clearFlashSale: () =>
        set({
            flashSaleProducts: [],
            flashSaleEndsAt: null,
            flashSaleFetchedAt: null,
        }),
});
