import { StyleSheet, View } from 'react-native';

export default function TartanBackground() {
  return (
    <View style={styles.tartanBase} pointerEvents="none">
      {/* Dark green thick vertical & horizontal stripes */}
      <View style={[styles.stripeV, { left: '15%', width: 44, backgroundColor: 'rgba(12, 68, 28, 0.75)' }]} />
      <View style={[styles.stripeV, { left: '65%', width: 44, backgroundColor: 'rgba(12, 68, 28, 0.75)' }]} />
      <View style={[styles.stripeH, { top: '15%', height: 44, backgroundColor: 'rgba(12, 68, 28, 0.75)' }]} />
      <View style={[styles.stripeH, { top: '65%', height: 44, backgroundColor: 'rgba(12, 68, 28, 0.75)' }]} />

      {/* Navy blue medium stripes */}
      <View style={[styles.stripeV, { left: '35%', width: 28, backgroundColor: 'rgba(14, 28, 80, 0.75)' }]} />
      <View style={[styles.stripeV, { left: '85%', width: 28, backgroundColor: 'rgba(14, 28, 80, 0.75)' }]} />
      <View style={[styles.stripeH, { top: '35%', height: 28, backgroundColor: 'rgba(14, 28, 80, 0.75)' }]} />
      <View style={[styles.stripeH, { top: '85%', height: 28, backgroundColor: 'rgba(14, 28, 80, 0.75)' }]} />

      {/* Black thin stripes */}
      <View style={[styles.stripeV, { left: '10%', width: 12, backgroundColor: 'rgba(0, 0, 0, 0.85)' }]} />
      <View style={[styles.stripeV, { left: '60%', width: 12, backgroundColor: 'rgba(0, 0, 0, 0.85)' }]} />
      <View style={[styles.stripeH, { top: '10%', height: 12, backgroundColor: 'rgba(0, 0, 0, 0.85)' }]} />
      <View style={[styles.stripeH, { top: '60%', height: 12, backgroundColor: 'rgba(0, 0, 0, 0.85)' }]} />

      {/* Yellow & white fine accent lines */}
      <View style={[styles.stripeV, { left: '25%', width: 4, backgroundColor: '#ffd700' }]} />
      <View style={[styles.stripeV, { left: '75%', width: 4, backgroundColor: '#ffd700' }]} />
      <View style={[styles.stripeH, { top: '25%', height: 4, backgroundColor: '#ffd700' }]} />
      <View style={[styles.stripeH, { top: '75%', height: 4, backgroundColor: '#ffd700' }]} />

      <View style={[styles.stripeV, { left: '50%', width: 3, backgroundColor: '#ffffff' }]} />
      <View style={[styles.stripeH, { top: '50%', height: 3, backgroundColor: '#ffffff' }]} />

      {/* Subtle dimming overlay for max contrast & readability */}
      <View style={styles.overlay} />
    </View>
  );
}

const styles = StyleSheet.create({
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
});
