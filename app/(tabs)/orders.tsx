import { ComingSoonScreen } from '@/components/ComingSoon';
import { useColors } from '@/theme';
import { spacing } from '@/theme/spacing';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export const OrdersScreen: React.FC = () => {
    const c = useColors();

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: c.surface }]} edges={['top']}>
            <ComingSoonScreen tabLabel="Orders" icon="clock" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.screen,
        paddingTop: spacing.base,
        paddingBottom: spacing.md,
        gap: spacing.sm,
    },

});

export default OrdersScreen;