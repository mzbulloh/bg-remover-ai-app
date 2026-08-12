import { StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';
import EmptyGallery from '@/components/EmptyGallery';

const COLUMNS = 3;
const GAP = 4;
const SCREEN_WIDTH = Dimensions.get('window').width;
const TILE_SIZE = (SCREEN_WIDTH - GAP * (COLUMNS + 1)) / COLUMNS;

const PLACEHOLDERS = [
  { id: '1', color: '#ffd6d6', emoji: '🌸' },
  { id: '2', color: '#d6e8ff', emoji: '🐬' },
  { id: '3', color: '#d6ffd6', emoji: '🌿' },
  { id: '4', color: '#fff4d6', emoji: '🌻' },
  { id: '5', color: '#e8d6ff', emoji: '🦋' },
  { id: '6', color: '#d6fff4', emoji: '🐢' },
  { id: '7', color: '#ffd6f0', emoji: '🌷' },
  { id: '8', color: '#d6f0ff', emoji: '🐳' },
  { id: '9', color: '#f0ffd6', emoji: '🍀' },
];

function Tile({ color, emoji }: { color: string; emoji: string }) {
  return (
    <View style={[styles.tile, { backgroundColor: color }]}>
      <Text style={styles.emoji}>{emoji}</Text>
    </View>
  );
}

export default function GalleryScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={PLACEHOLDERS}
        keyExtractor={(item) => item.id}
        numColumns={COLUMNS}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        ListHeaderComponent={<Text style={styles.heading}>Gallery</Text>}
        ListFooterComponent={<EmptyGallery />}
        renderItem={({ item }) => <Tile color={item.color} emoji={item.emoji} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: GAP,
    paddingTop: 20,
    paddingBottom: 12,
  },
  grid: {
    paddingHorizontal: GAP,
    paddingBottom: 24,
  },
  row: {
    gap: GAP,
    marginBottom: GAP,
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 32,
  },
});
