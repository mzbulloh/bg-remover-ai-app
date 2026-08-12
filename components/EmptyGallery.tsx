import { StyleSheet, View, Text } from 'react-native';

export default function EmptyGallery() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🖼️</Text>
      <Text style={styles.heading}>No cutouts yet</Text>
      <Text style={styles.body}>
        Head to the Create tab, pick a photo, and your saved cutouts will appear here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  body: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
});
