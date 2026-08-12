import { StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TartanBackground from '@/components/TartanBackground';

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
      <TartanBackground />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={26} color="#ffffff" />
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
    backgroundColor: '#8b0000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(15, 15, 20, 0.94)',
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(255, 215, 0, 0.5)',
    zIndex: 1,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    zIndex: 1,
  },
  imageCard: {
    width: '100%',
    height: 260,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  emoji: {
    fontSize: 80,
  },
  detailsCard: {
    width: '100%',
    backgroundColor: 'rgba(15, 15, 20, 0.94)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 215, 0, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  detailsTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    color: '#cccccc',
  },
  value: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});
