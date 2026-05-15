import type { StateCreator } from 'zustand';

import type { BanboxStore } from '../types';

export type WishlistSlice = {
    wishlistIds: string[];
    setWishlistIds: (ids: string[]) => void;
    toggleWishlist: (productId: string) => void;
    isWishlisted: (productId: string) => boolean;
    clearWishlist: () => void;
};

export const createWishlistSlice: StateCreator<
    BanboxStore,
    [['zustand/persist', unknown]],
    [],
    WishlistSlice
> = (set, get) => ({
    wishlistIds: [],
    setWishlistIds: (ids) => set({ wishlistIds: ids }),
    toggleWishlist: (productId) =>
        set((s) => ({
            wishlistIds: s.wishlistIds.includes(productId)
                ? s.wishlistIds.filter((id) => id !== productId)
                : [...s.wishlistIds, productId],
        })),
    isWishlisted: (productId) => get().wishlistIds.includes(productId),
    clearWishlist: () => set({ wishlistIds: [] }),
});
