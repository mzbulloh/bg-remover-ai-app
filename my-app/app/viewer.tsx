import { StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ViewerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id?: string;
    title?: string;
    color?: string;
    emoji?: string;
    date?: string;
    size?: string;
  }>();

  const title = params.title || 'Image Details';
  const color = params.color || '#e8d6ff';
  const emoji = params.emoji || '🖼️';
  const date = params.date || 'Aug 2026';
  const size = params.size || '1080 × 1080';

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color="#333" />
        </Pressable>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={{ width: 26 }} />
      </View>

      <View style={styles.content}>
        <View style={[styles.imageCard, { backgroundColor: color }]}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Image Specifications</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Title</Text>
            <Text style={styles.value}>{title}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Created Date</Text>
            <Text style={styles.value}>{date}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Resolution</Text>
            <Text style={styles.value}>{size}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  imageCard: {
    width: '100%',
    height: 280,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emoji: {
    fontSize: 80,
  },
  detailsCard: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#eee',
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
  divider: {
    height: 1,
    backgroundColor: '#e9ecef',
  },
});
