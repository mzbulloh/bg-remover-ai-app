import { useState } from 'react';
import {
  StyleSheet,
  View as RNView,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import TartanBackground from '@/components/TartanBackground';

export default function CreateScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission needed',
        'Please allow access to your photo library in Settings so you can pick a photo.',
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <TartanBackground />

      <RNView style={styles.container}>
        {/* Title Header Box with Gold Accent Stroke */}
        <RNView style={styles.titleCard}>
          <Text style={styles.title}>[Mad's Bg Remover]'s App</Text>
        </RNView>

        {/* Action Button */}
        <TouchableOpacity style={styles.button} onPress={pickImage} activeOpacity={0.8}>
          <Text style={styles.buttonText}>📷 Choose a Photo</Text>
        </TouchableOpacity>

        {/* Selected Image or Placeholder Box */}
        {imageUri ? (
          <RNView style={styles.imageCard}>
            <Image source={{ uri: imageUri }} style={styles.preview} resizeMode="contain" />
          </RNView>
        ) : (
          <RNView style={styles.placeholderCard}>
            <Text style={styles.hintEmoji}>🖼️</Text>
            <Text style={styles.hintText}>Your selected photo will appear here</Text>
          </RNView>
        )}
      </RNView>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    zIndex: 1,
  },
  titleCard: {
    width: '100%',
    backgroundColor: 'rgba(15, 15, 20, 0.92)',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: 20,
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
  },
  preview: {
    width: '100%',
    height: '100%',
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
});
