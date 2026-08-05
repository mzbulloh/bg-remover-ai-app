import { StyleSheet, View as RNView } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
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

      {/* Readable Content Card */}
      <RNView style={styles.card}>
        <Text style={styles.title}>[Mad's Bg Remover]'s App</Text>
        <View style={styles.separator} lightColor="rgba(255,255,255,0.3)" darkColor="rgba(255,255,255,0.3)" />
        <EditScreenInfo path="app/(tabs)/index.tsx" />
      </RNView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
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
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.78)',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
