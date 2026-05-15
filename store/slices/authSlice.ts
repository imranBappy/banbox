import type { StateCreator } from 'zustand';

import type { AuthUser } from '../entities';
import type { BanboxStore } from '../types';

export type AuthSlice = {
    user: AuthUser | null;
    accessToken: string | null;
    /** Updates only `user`; leaves `accessToken` unchanged (e.g. home payload). */
    setUser: (user: AuthUser | null) => void;
    setSession: (user: AuthUser | null, accessToken: string | null) => void;
    clearSession: () => void;
};

export const createAuthSlice: StateCreator<
    BanboxStore,
    [['zustand/persist', unknown]],
    [],
    AuthSlice
> = (set) => ({
    user: null,
    accessToken: null,
    setUser: (user) => set({ user }),
    setSession: (user, accessToken) => set({ user, accessToken }),
    clearSession: () => set({ user: null, accessToken: null }),
});
