import { useState } from 'react';
import {
  StyleSheet,
  View,
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
      <View style={styles.container}>
        <Text style={styles.title}>Create</Text>

        <TouchableOpacity style={styles.button} onPress={pickImage} activeOpacity={0.8}>
          <Text style={styles.buttonText}>📷 Choose a Photo</Text>
        </TouchableOpacity>

        {imageUri ? (
          <View style={styles.imageCard}>
            <Image source={{ uri: imageUri }} style={styles.preview} resizeMode="contain" />
          </View>
        ) : (
          <View style={styles.placeholderCard}>
            <Text style={styles.hintEmoji}>🖼️</Text>
            <Text style={styles.hintText}>Your selected photo will appear here</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#8b0000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#8b0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  imageCard: {
    width: '100%',
    height: 320,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
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
    borderColor: '#e9ecef',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    padding: 20,
  },
  hintEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  hintText: {
    color: '#888',
    fontSize: 15,
    textAlign: 'center',
  },
});
