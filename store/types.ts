import type { AuthSlice } from './slices/authSlice';
import type { CategorySlice } from './slices/categorySlice';
import type { FlashSaleSlice } from './slices/flashSaleSlice';
import type { JustForYouSlice } from './slices/justForYouSlice';
import type { MostPopularSlice } from './slices/mostPopularSlice';
import type { NewItemsSlice } from './slices/newItemsSlice';
import type { StoriesSlice } from './slices/storiesSlice';
import type { TopProductsSlice } from './slices/topProductsSlice';
import type { ViewedSlice } from './slices/viewedSlice';
import type { WishlistSlice } from './slices/wishlistSlice';

export type BanboxStore = AuthSlice &
    WishlistSlice &
    ViewedSlice &
    StoriesSlice &
    NewItemsSlice &
    MostPopularSlice &
    CategorySlice &
    FlashSaleSlice &
    TopProductsSlice &
    JustForYouSlice;
