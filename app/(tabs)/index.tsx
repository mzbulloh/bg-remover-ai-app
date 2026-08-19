import { useState } from 'react';
import {
  StyleSheet,
  View as RNView,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import TartanBackground from '@/components/TartanBackground';
import Checkerboard from '@/components/Checkerboard';
import { useEngine, ProcessResult } from '@/src/lib/engine';
import { prepareForInference, PickedImage } from '@/src/lib/imagePrep';

function getStatusHint(state: string, modelMissing: boolean): string {
  if (modelMissing) return 'model not downloaded — go to Settings';
  switch (state) {
    case 'downloading':
      return 'downloading the model…';
    case 'initializing':
      return 'starting the engine…';
    case 'warming':
      return 'engine warming up…';
    case 'processing':
      return 'already working';
    case 'engine_failed':
    case 'inference_failed':
    case 'inference_timeout':
      return 'engine needs a restart — see Settings';
    case 'cold':
      return 'model not downloaded — go to Settings';
    default:
      return 'engine warming up…';
  }
}

export default function CreateScreen() {
  const engine = useEngine();
  const [pickedImage, setPickedImage] = useState<PickedImage | null>(null);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const modelMissing = engine.modelStatus ? engine.modelStatus.phase !== 'ready' : true;
  const isReady = engine.state === 'ready' && !modelMissing;
  const processing = engine.state === 'processing' || isProcessing;
  const canRemove = isReady && !!pickedImage && !processing;

  const statusHint = getStatusHint(engine.state, modelMissing);

  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission needed',
        'Please allow access to your photo library in Settings so you can pick a photo.',
      );
      return;
    }

    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 1,
    });

    if (!res.canceled && res.assets && res.assets.length > 0) {
      const asset = res.assets[0];
      setPickedImage({
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
      });
      setResult(null);
      setErrorMessage(null);
    }
  }

  async function handleRemoveBackground() {
    if (!pickedImage || !canRemove) return;
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const prepared = await prepareForInference(pickedImage);
      const outcome = await engine.process(prepared.base64, prepared.mimeType);
      setResult(outcome);
    } catch (err) {
      console.error(err);
      setErrorMessage(err instanceof Error ? err.message : 'Failed to process image');
    } finally {
      setIsProcessing(false);
    }
  }

  function reset() {
    setPickedImage(null);
    setResult(null);
    setErrorMessage(null);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <TartanBackground />

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Title Header Box with Gold Accent Stroke */}
        <RNView style={styles.titleCard}>
          <Text style={styles.title}>[Mad's Bg Remover]'s App</Text>
        </RNView>

        {/* Action Button: Choose Photo */}
        <TouchableOpacity style={styles.button} onPress={pickImage} activeOpacity={0.8}>
          <Text style={styles.buttonText}>📷 Choose a Photo</Text>
        </TouchableOpacity>

        {/* Selected Image / Cutout Result / Placeholder */}
        {result ? (
          <RNView style={styles.workArea}>
            <RNView style={styles.resultHeader}>
              <Text style={styles.resultTitle}>✨ Background Removed!</Text>
            </RNView>

            {/* Transparent PNG Output over Checkerboard */}
            <Checkerboard style={styles.imageCard}>
              <Image
                source={{ uri: `data:image/png;base64,${result.pngBase64}` }}
                style={styles.preview}
                resizeMode="contain"
              />
            </Checkerboard>

            {/* Inference timing metrics */}
            <RNView style={styles.metricsCard}>
              <Text style={styles.metricsText}>
                ⚡ Inference time: {result.inferenceMs ?? engine.lastInferenceMs ?? 0} ms ({(((result.inferenceMs ?? engine.lastInferenceMs ?? 0)) / 1000).toFixed(2)}s)
              </Text>
              <Text style={styles.metricsSubText}>
                Total processing: {result.totalMs ?? 0} ms · Output: {result.width}×{result.height}
              </Text>
            </RNView>

            {/* Reset button */}
            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={reset} activeOpacity={0.8}>
              <Text style={styles.resetButtonText}>🔄 Pick Another Photo</Text>
            </TouchableOpacity>
          </RNView>
        ) : pickedImage ? (
          <RNView style={styles.workArea}>
            {/* Selected Photo Card */}
            <RNView style={styles.imageCard}>
              <Image source={{ uri: pickedImage.uri }} style={styles.preview} resizeMode="contain" />
              {processing && (
                <RNView style={styles.processingOverlay}>
                  <ActivityIndicator size="large" color="#ffd700" />
                  <Text style={styles.processingText}>Removing background...</Text>
                  <Text style={styles.processingSubtext}>This takes about 8 seconds</Text>
                </RNView>
              )}
            </RNView>

            {/* Remove Background Action Button */}
            <TouchableOpacity
              style={[
                styles.button,
                styles.removeButton,
                !canRemove && styles.disabledButton,
              ]}
              onPress={handleRemoveBackground}
              disabled={!canRemove}
              activeOpacity={0.8}>
              {processing ? (
                <RNView style={styles.loadingRow}>
                  <ActivityIndicator color="#121216" />
                  <Text style={styles.removeButtonText}> Processing AI Cutout...</Text>
                </RNView>
              ) : (
                <Text style={[styles.removeButtonText, !canRemove && styles.disabledButtonText]}>
                  ✨ Remove Background
                </Text>
              )}
            </TouchableOpacity>

            {/* Status Hint label when disabled (Step 4: Never silent) */}
            {!canRemove && !processing && (
              <RNView style={styles.statusHintCard}>
                <Text style={styles.statusHintText}>⚠️ {statusHint}</Text>
              </RNView>
            )}

            <TouchableOpacity style={styles.ghostButton} onPress={reset} activeOpacity={0.8}>
              <Text style={styles.ghostButtonText}>Choose a different photo</Text>
            </TouchableOpacity>
          </RNView>
        ) : (
          <RNView style={styles.placeholderCard}>
            <Text style={styles.hintEmoji}>🖼️</Text>
            <Text style={styles.hintText}>Your selected photo will appear here</Text>
          </RNView>
        )}

        {/* Error notification if any */}
        {errorMessage && (
          <RNView style={styles.errorCard}>
            <Text style={styles.errorText}>⚠️ {errorMessage}</Text>
          </RNView>
        )}
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
    alignItems: 'center',
  },
  titleCard: {
    width: '100%',
    backgroundColor: 'rgba(15, 15, 20, 0.92)',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 215, 0, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  button: {
    backgroundColor: '#121216',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#ffd700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  workArea: {
    width: '100%',
    alignItems: 'center',
  },
  resultHeader: {
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffd700',
  },
  imageCard: {
    width: '100%',
    height: 320,
    borderRadius: 18,
    backgroundColor: 'rgba(15, 15, 20, 0.94)',
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 16,
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  processingText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 14,
  },
  processingSubtext: {
    color: '#ffd700',
    fontSize: 13,
    marginTop: 6,
  },
  removeButton: {
    backgroundColor: '#ffd700',
  },
  removeButtonText: {
    color: '#121216',
    fontSize: 18,
    fontWeight: '800',
  },
  disabledButton: {
    backgroundColor: 'rgba(40, 40, 50, 0.8)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  disabledButtonText: {
    color: '#888888',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusHintCard: {
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    borderColor: 'rgba(251, 191, 36, 0.5)',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  statusHintText: {
    color: '#fbbf24',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  metricsCard: {
    backgroundColor: 'rgba(15, 15, 20, 0.92)',
    borderRadius: 14,
    padding: 14,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.4)',
  },
  metricsText: {
    color: '#4ade80',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricsSubText: {
    color: '#aaaaaa',
    fontSize: 12,
  },
  resetButton: {
    backgroundColor: '#121216',
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  ghostButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  ghostButtonText: {
    color: '#cccccc',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  placeholderCard: {
    width: '100%',
    height: 240,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.6)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(15, 15, 20, 0.92)',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  hintEmoji: {
    fontSize: 44,
    marginBottom: 12,
  },
  hintText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorCard: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderColor: 'rgba(239, 68, 68, 0.6)',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    width: '100%',
    marginTop: 12,
  },
  errorText: {
    color: '#f87171',
    fontSize: 14,
    textAlign: 'center',
  },
});

