import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

export function useAnimatedSplash() {
    const [appReady, setAppReady] = useState(false);
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        setAppReady(true);
    }, []);

    const onRootLayout = useCallback(() => {
        if (appReady) {
            SplashScreen.hideAsync().catch(() => undefined);
        }
    }, [appReady]);

    const onSplashFinish = useCallback(() => {
        setShowSplash(false);
    }, []);

    return { appReady, showSplash, onRootLayout, onSplashFinish };
}
