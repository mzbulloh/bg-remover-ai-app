import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TartanBackground from '@/components/TartanBackground';
import { useEngine } from '@/src/lib/engine';

function formatMB(bytes: number): string {
  if (!bytes || bytes <= 0) return '0.0 MB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function SettingsScreen() {
  const engine = useEngine();
  const [busy, setBusy] = useState(false);

  const modelStatus = engine.modelStatus;
  const isReady = modelStatus?.phase === 'ready';
  const isDownloading = engine.state === 'downloading' || !!engine.download;
  const isPartial = modelStatus?.phase === 'partial';

  const downloadedBytes = engine.download?.bytesDownloaded ?? (modelStatus?.bytesOnDisk ?? 0);
  const totalBytes = engine.download?.bytesTotal ?? (175 * 1024 * 1024); // ~175MB expected total
  const percent = totalBytes > 0 ? Math.min(100, Math.round((downloadedBytes / totalBytes) * 100)) : 0;

  async function handleDownload() {
    setBusy(true);
    try {
      engine.startDownload();
    } catch (err) {
      console.error('Download start failed', err);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    setBusy(true);
    try {
      await engine.deleteModel();
    } catch (err) {
      console.error('Delete failed', err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <TartanBackground />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Main Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>App Preferences & AI Engine</Text>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>App Name</Text>
            <Text style={styles.value}>[Mad's Bg Remover]'s App</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Version</Text>
            <Text style={styles.value}>1.0.0 (Week 3)</Text>
          </View>
        </View>

        {/* AI Model Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🤖 Background Removal AI Model</Text>
          <Text style={styles.modelName}>RMBG-1.4 AI Model</Text>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text
              style={[
                styles.statusBadge,
                isReady
                  ? styles.statusReady
                  : isDownloading
                  ? styles.statusDownloading
                  : styles.statusMissing,
              ]}>
              {isReady
                ? 'Ready ✓'
                : isDownloading
                ? 'Downloading...'
                : isPartial
                ? 'Incomplete'
                : 'Not Downloaded'}
            </Text>
          </View>

          {/* Download Progress Bar when downloading */}
          {isDownloading && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBarTrack}>
                <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
              </View>
              <Text style={styles.progressText}>
                {formatMB(downloadedBytes)} / {formatMB(totalBytes)} ({percent}%)
              </Text>
              {engine.download?.currentFile && (
                <Text style={styles.fileText} numberOfLines={1}>
                  Downloading: {engine.download.currentFile}
                </Text>
              )}
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            {isDownloading ? (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => engine.cancelDownload()}
                activeOpacity={0.8}>
                <Text style={styles.buttonText}>Cancel Download</Text>
              </TouchableOpacity>
            ) : isReady ? (
              <View style={styles.readyContainer}>
                <Text style={styles.diskText}>
                  Model saved on device ({formatMB(modelStatus?.bytesOnDisk ?? 0)})
                </Text>
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={handleDelete}
                  disabled={busy}
                  activeOpacity={0.8}>
                  {busy ? (
                    <ActivityIndicator color="#ffffff" />
                  ) : (
                    <Text style={styles.buttonText}>🗑️ Delete Model</Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.downloadButton]}
                onPress={handleDownload}
                disabled={busy}
                activeOpacity={0.8}>
                {busy ? (
                  <ActivityIndicator color="#121216" />
                ) : (
                  <Text style={styles.downloadButtonText}>
                    📥 {isPartial ? 'Resume Model Download' : 'Download Model'}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#8b0000',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 16,
  },
  card: {
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
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#f0f0f0',
    marginTop: 4,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  modelName: {
    fontSize: 14,
    color: '#ffd700',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  label: {
    fontSize: 15,
    color: '#cccccc',
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  statusBadge: {
    fontSize: 14,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  statusReady: {
    color: '#4ade80',
    backgroundColor: 'rgba(74, 222, 128, 0.15)',
  },
  statusDownloading: {
    color: '#38bdf8',
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  statusMissing: {
    color: '#fbbf24',
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
  },
  progressContainer: {
    marginTop: 12,
    gap: 6,
  },
  progressBarTrack: {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ffd700',
    borderRadius: 5,
  },
  progressText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  fileText: {
    color: '#aaaaaa',
    fontSize: 11,
    textAlign: 'center',
  },
  buttonRow: {
    marginTop: 16,
  },
  readyContainer: {
    gap: 10,
    alignItems: 'center',
  },
  diskText: {
    color: '#aaaaaa',
    fontSize: 13,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  downloadButton: {
    backgroundColor: '#ffd700',
  },
  downloadButtonText: {
    color: '#121216',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.8)',
  },
  deleteButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.6)',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});

