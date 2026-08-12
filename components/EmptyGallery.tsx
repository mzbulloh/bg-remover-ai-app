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
    paddingVertical: 28,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(15, 15, 20, 0.94)',
    borderRadius: 18,
    marginTop: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 215, 0, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  body: {
    fontSize: 15,
    color: '#f0f0f0',
    textAlign: 'center',
    lineHeight: 22,
  },
});
