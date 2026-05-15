import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { createAnnouncementSlice } from './slices/announcementSlice';
import { createAuthSlice } from './slices/authSlice';
import { createCategorySlice } from './slices/categorySlice';
import { createFlashSaleSlice } from './slices/flashSaleSlice';
import { createJustForYouSlice } from './slices/justForYouSlice';
import { createMostPopularSlice } from './slices/mostPopularSlice';
import { createNewItemsSlice } from './slices/newItemsSlice';
import { createOrderStatusesSlice } from './slices/orderStatusesSlice';
import { createStoriesSlice } from './slices/storiesSlice';
import { createTopProductsSlice } from './slices/topProductsSlice';
import { createViewedSlice } from './slices/viewedSlice';
import { createWishlistSlice } from './slices/wishlistSlice';
import type { BanboxStore } from './types';

const STORAGE_KEY = 'banbox-store';

export const useBanboxStore = create<BanboxStore>()(
    persist(
        (...args) => ({
            ...createAuthSlice(...args),
            ...createWishlistSlice(...args),
            ...createViewedSlice(...args),
            ...createStoriesSlice(...args),
            ...createNewItemsSlice(...args),
            ...createMostPopularSlice(...args),
            ...createCategorySlice(...args),
            ...createFlashSaleSlice(...args),
            ...createTopProductsSlice(...args),
            ...createJustForYouSlice(...args),
            ...createAnnouncementSlice(...args),
            ...createOrderStatusesSlice(...args),
        }),
        {
            name: STORAGE_KEY,
            storage: createJSONStorage(() => AsyncStorage),
            version: 1,
        },
    ),
);

export { applyHomePayload } from './applyHomePayload';
export type { AuthUser, Category, Product, Story } from './entities';
export type { BanboxStore } from './types';
