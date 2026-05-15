import { Header } from '@/components/home/Header';
import { useColors } from '@/theme';
import { spacing } from '@/theme/spacing';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



export const HomeScreen: React.FC = () => {
  const c = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor: c.surface }]}>
      <ScrollView
      contentContainerStyle={[styles.content, { paddingTop: insets.top }]}
      >
        <Header user={{
          name: 'John Doe',
          avatarUrl: 'https://via.placeholder.com/150',
        }} />
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