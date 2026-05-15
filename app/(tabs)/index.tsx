import { AnnouncementCard } from '@/components/home/AnnouncementCard';
import { Categories } from '@/components/home/Categories';
import { FlashSale } from '@/components/home/FlashSale';
import { Header } from '@/components/home/Header';
import { JustForYou } from '@/components/home/JustForYou';
import { MostPopular } from '@/components/home/MostPopular';
import { NewItems } from '@/components/home/NewItems';
import { OrderStatuses } from '@/components/home/OrderStatuses';
import { RecentlyViewed } from '@/components/home/RecentlyViewed';
import { Stories } from '@/components/home/Stories';
import { fetchHome } from '@/services/home';
import { Product, applyHomePayload, useBanboxStore } from '@/store';
import { useColors } from '@/theme';
import { spacing } from '@/theme/spacing';
import { Announcement, OrderStatus, RecentlyViewedItem, Story } from '@/types';
import { useCallback, useEffect, type FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export const HomeScreen: FC = () => {
    const c = useColors();
    const insets = useSafeAreaInsets();
    const user = useBanboxStore((s) => s.user);
    const accessToken = useBanboxStore((s) => s.accessToken);
    const announcement = useBanboxStore((s) => s.announcement);
    const recentlyViewedProducts = useBanboxStore((s) => s.recentlyViewedProducts);
    const orderStatusesProducts = useBanboxStore((s) => s.orderStatuses);
    const storiesProducts = useBanboxStore((s) => s.stories);
    const newItemsProducts = useBanboxStore((s) => s.newItems);
    const mostPopularProducts = useBanboxStore((s) => s.mostPopularItems);
    const categoriesProducts = useBanboxStore((s) => s.categories);
    const flashSaleProducts = useBanboxStore((s) => s.flashSaleProducts);
    const justForYouProducts = useBanboxStore((s) => s.justForYouProducts);
    
    const loadHome = useCallback(async () => {
        try {
            const data = await fetchHome(accessToken);
            applyHomePayload(useBanboxStore.setState, data);
        } catch {
            // Backend may be offline during development.
        }
    }, [accessToken]);

    useEffect(() => {
        void loadHome();
    }, [loadHome]);

    return (
        <View style={[styles.root, { backgroundColor: c.surface }]}>
            <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top }]}
            showsVerticalScrollIndicator={false}
            >
                <Header
                    user={{
                        name: user?.name ?? user?.email ?? 'Guest',
                        avatarUrl: user?.avatarUrl ?? '',
                    }}
                    
                    onPressGrid={() => {}}
                    onPressMenu={() => {}}
                    onPressActivity={() => {}}
                />
                <AnnouncementCard announcement={announcement as unknown as Announcement} />
                <RecentlyViewed items={recentlyViewedProducts as unknown as RecentlyViewedItem[]} />
                <OrderStatuses items={orderStatusesProducts as unknown as OrderStatus[]} />
                <Stories stories={storiesProducts as unknown as Story[]} />
                <NewItems items={newItemsProducts as unknown as Product[]} />
                <MostPopular items={mostPopularProducts as unknown as Product[]} />
                <Categories items={categoriesProducts as unknown as Category[]} />
                <FlashSale products={flashSaleProducts as unknown as Product[]} />
                <JustForYou items={justForYouProducts as unknown as Product[]} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1 },
    content: {
        paddingHorizontal: spacing.screen,
        paddingBottom: spacing.lg,
    },
});

export default HomeScreen;
