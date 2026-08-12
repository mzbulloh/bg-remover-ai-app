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
      {/* Scottish Tartan Background */}
      <RNView style={styles.tartanBase} pointerEvents="none">
        {/* Dark green thick vertical & horizontal stripes */}
        <RNView style={[styles.stripeV, { left: '15%', width: 44, backgroundColor: 'rgba(12, 68, 28, 0.75)' }]} />
        <RNView style={[styles.stripeV, { left: '65%', width: 44, backgroundColor: 'rgba(12, 68, 28, 0.75)' }]} />
        <RNView style={[styles.stripeH, { top: '15%', height: 44, backgroundColor: 'rgba(12, 68, 28, 0.75)' }]} />
        <RNView style={[styles.stripeH, { top: '65%', height: 44, backgroundColor: 'rgba(12, 68, 28, 0.75)' }]} />

        {/* Navy blue medium stripes */}
        <RNView style={[styles.stripeV, { left: '35%', width: 28, backgroundColor: 'rgba(14, 28, 80, 0.75)' }]} />
        <RNView style={[styles.stripeV, { left: '85%', width: 28, backgroundColor: 'rgba(14, 28, 80, 0.75)' }]} />
        <RNView style={[styles.stripeH, { top: '35%', height: 28, backgroundColor: 'rgba(14, 28, 80, 0.75)' }]} />
        <RNView style={[styles.stripeH, { top: '85%', height: 28, backgroundColor: 'rgba(14, 28, 80, 0.75)' }]} />

        {/* Black thin stripes */}
        <RNView style={[styles.stripeV, { left: '10%', width: 12, backgroundColor: 'rgba(0, 0, 0, 0.85)' }]} />
        <RNView style={[styles.stripeV, { left: '60%', width: 12, backgroundColor: 'rgba(0, 0, 0, 0.85)' }]} />
        <RNView style={[styles.stripeH, { top: '10%', height: 12, backgroundColor: 'rgba(0, 0, 0, 0.85)' }]} />
        <RNView style={[styles.stripeH, { top: '60%', height: 12, backgroundColor: 'rgba(0, 0, 0, 0.85)' }]} />

        {/* Yellow & white fine accent lines */}
        <RNView style={[styles.stripeV, { left: '25%', width: 4, backgroundColor: '#ffd700' }]} />
        <RNView style={[styles.stripeV, { left: '75%', width: 4, backgroundColor: '#ffd700' }]} />
        <RNView style={[styles.stripeH, { top: '25%', height: 4, backgroundColor: '#ffd700' }]} />
        <RNView style={[styles.stripeH, { top: '75%', height: 4, backgroundColor: '#ffd700' }]} />

        <RNView style={[styles.stripeV, { left: '50%', width: 3, backgroundColor: '#ffffff' }]} />
        <RNView style={[styles.stripeH, { top: '50%', height: 3, backgroundColor: '#ffffff' }]} />
      </RNView>

      {/* Content Container */}
      <RNView style={styles.container}>
        <Text style={styles.title}>[Mad's Bg Remover]'s App</Text>

        <TouchableOpacity style={styles.button} onPress={pickImage} activeOpacity={0.8}>
          <Text style={styles.buttonText}>📷 Choose a Photo</Text>
        </TouchableOpacity>

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
  tartanBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#8b0000',
  },
  stripeV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  stripeH: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  imageCard: {
    width: '100%',
    height: 320,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  placeholderCard: {
    width: '100%',
    height: 240,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    padding: 20,
  },
  hintEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  hintText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 15,
    textAlign: 'center',
  },
});
