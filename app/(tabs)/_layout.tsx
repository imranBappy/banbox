import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { useNavigationState } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import React from 'react';
import type { LayoutChangeEvent } from 'react-native';

import { TabBarButton } from '@/components/TabBarButton';
import type { IconName } from '@/components/ui/Icon';
import { useColors } from '@/theme';

const TAB_BY_ROUTE: Record<string, { key: string; label: string; icon: IconName }> = {
  index: { key: 'index', label: 'Home', icon: 'home' },
  wishlist: { key: 'wishlist', label: 'Wishlist', icon: 'heart' },
  cart: { key: 'cart', label: 'Cart', icon: 'bag' },
  orders: { key: 'orders', label: 'Orders', icon: 'clock' },
  profile: { key: 'profile', label: 'Profile', icon: 'user' },
};

function noopTabLayout(_key: string, _e: LayoutChangeEvent) {}

type RoutedTabBarButtonProps = BottomTabBarButtonProps & {
  routeName: string;
  tab: { key: string; label: string; icon: IconName };
};

function RoutedTabBarButton({ routeName, tab, ...props }: RoutedTabBarButtonProps) {
  const colors = useColors();

  const isFocused = useNavigationState((state) => {
    if (!state || typeof state.index !== 'number') return false;
    const active = state.routes[state.index];
    return active?.name === routeName;
  });

  return (
    <TabBarButton
      tab={tab}
      isActive={isFocused}
      colors={{ primary: colors.primary, muted: colors.textMuted }}
      onPress={(e) => props.onPress?.(e)}
      onLongPress={props.onLongPress ?? undefined}
      onTabLayout={noopTabLayout}
      style={props.style}
    />
  );
}

export default function TabLayout() {
  const colors = useColors();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarButton: (props) => (
          <RoutedTabBarButton
            {...props}
            routeName={route.name}
            tab={
              TAB_BY_ROUTE[route.name] ?? {
                key: route.name,
                label: route.name,
                icon: 'home',
              }
            }
          />
        ),
      })}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="wishlist" options={{ title: 'Wishlist' }} />
      <Tabs.Screen name="cart" options={{ title: 'Cart' }} />
      <Tabs.Screen name="orders" options={{ title: 'Orders' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
