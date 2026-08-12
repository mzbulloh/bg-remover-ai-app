import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TartanBackground from '@/components/TartanBackground';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <TartanBackground />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>App Preferences & Details</Text>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>App Name</Text>
            <Text style={styles.value}>[Mad's Bg Remover]'s App</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Version</Text>
            <Text style={styles.value}>1.0.0 (Week 2)</Text>
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
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    zIndex: 1,
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 4,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {
    fontSize: 15,
    color: '#cccccc',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
});
