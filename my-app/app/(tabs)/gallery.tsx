import { StyleSheet, View, Text, FlatList, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import TartanBackground from '@/components/TartanBackground';
import EmptyGallery from '@/components/EmptyGallery';

const COLUMNS = 3;
const GAP = 8;
const SCREEN_PADDING = 16;
const SCREEN_WIDTH = Dimensions.get('window').width;
const TILE_SIZE = (SCREEN_WIDTH - SCREEN_PADDING * 2 - GAP * (COLUMNS - 1)) / COLUMNS;

export const GALLERY_ITEMS = [
  { id: '1', title: 'Flower Cutout', color: '#ffd6d6', emoji: '🌸', date: 'Aug 12, 2026', size: '1080 × 1080' },
  { id: '2', title: 'Dolphin View', color: '#d6e8ff', emoji: '🐬', date: 'Aug 11, 2026', size: '1200 × 800' },
  { id: '3', title: 'Leaf Layer', color: '#d6ffd6', emoji: '🌿', date: 'Aug 10, 2026', size: '960 × 960' },
  { id: '4', title: 'Sunflower', color: '#fff4d6', emoji: '🌻', date: 'Aug 09, 2026', size: '1024 × 1024' },
  { id: '5', title: 'Butterfly', color: '#e8d6ff', emoji: '🦋', date: 'Aug 08, 2026', size: '800 × 800' },
  { id: '6', title: 'Turtle Shell', color: '#d6fff4', emoji: '🐢', date: 'Aug 07, 2026', size: '1200 × 1200' },
  { id: '7', title: 'Tulip Field', color: '#ffd6f0', emoji: '🌷', date: 'Aug 06, 2026', size: '750 × 750' },
  { id: '8', title: 'Blue Whale', color: '#d6f0ff', emoji: '🐳', date: 'Aug 05, 2026', size: '1440 × 900' },
  { id: '9', title: 'Clover Leaf', color: '#f0ffd6', emoji: '🍀', date: 'Aug 04, 2026', size: '1000 × 1000' },
];

export default function GalleryScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <TartanBackground />
      <View style={styles.container}>
        <View style={styles.headerCard}>
          <Text style={styles.heading}>Gallery</Text>
          <Text style={styles.subheading}>{GALLERY_ITEMS.length} items saved</Text>
        </View>

        <FlatList
          data={GALLERY_ITEMS}
          keyExtractor={(item) => item.id}
          numColumns={COLUMNS}
          columnWrapperStyle={{ gap: GAP }}
          contentContainerStyle={styles.grid}
          ListFooterComponent={<EmptyGallery />}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [styles.tile, { backgroundColor: item.color, opacity: pressed ? 0.7 : 1 }]}
              onPress={() => router.push({ pathname: '/viewer', params: item })}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#8b0000',
  },
  container: {
    flex: 1,
    paddingHorizontal: SCREEN_PADDING,
    zIndex: 1,
  },
  headerCard: {
    backgroundColor: 'rgba(15, 15, 20, 0.94)',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginTop: 12,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 215, 0, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subheading: {
    fontSize: 14,
    color: '#f0f0f0',
    marginTop: 2,
    fontWeight: '500',
  },
  grid: {
    paddingBottom: 24,
    gap: GAP,
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  emoji: {
    fontSize: 32,
  },
});
