import type { StateCreator } from 'zustand';

import type { BanboxStore } from '../types';

export type AnnouncementSlice = {
    announcement: Record<string, unknown>;
    setAnnouncement: (announcement: Record<string, unknown>) => void;
};

export const createAnnouncementSlice: StateCreator<
    BanboxStore,
    [['zustand/persist', unknown]],
    [],
    AnnouncementSlice
> = (set) => ({
    announcement: {},
    setAnnouncement: (announcement) => set({ announcement }),
});
