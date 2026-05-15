import type { StateCreator } from 'zustand';

import type { BanboxStore } from '../types';

export type OrderStatusesSlice = {
    orderStatuses: unknown[];
    setOrderStatuses: (items: unknown[]) => void;
};

export const createOrderStatusesSlice: StateCreator<
    BanboxStore,
    [['zustand/persist', unknown]],
    [],
    OrderStatusesSlice
> = (set) => ({
    orderStatuses: [],
    setOrderStatuses: (orderStatuses) => set({ orderStatuses }),
});
