import { StyleSheet, View, Text } from 'react-native';

export default function EmptyGallery() {
  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>🖼️</Text>
      <Text style={styles.heading}>No cutouts yet</Text>
      <Text style={styles.body}>
        Head to the Create tab, pick a photo, and your saved cutouts will appear here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    borderRadius: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  emoji: {
    fontSize: 52,
    marginBottom: 12,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  body: {
    fontSize: 15,
    color: '#e0e0e0',
    textAlign: 'center',
    lineHeight: 22,
  },
});
