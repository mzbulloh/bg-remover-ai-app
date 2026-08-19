import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

interface CheckerboardProps extends ViewProps {
  size?: number;
  color1?: string;
  color2?: string;
}

export default function Checkerboard({
  children,
  style,
  size = 16,
  color1 = '#ffffff',
  color2 = '#d0d0d5',
  ...props
}: CheckerboardProps) {
  return (
    <View style={[styles.container, { backgroundColor: color1 }, style]} {...props}>
      <View style={styles.gridOverlay} pointerEvents="none">
        {Array.from({ length: 25 }).map((_, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {Array.from({ length: 25 }).map((_, colIndex) => {
              const isDark = (rowIndex + colIndex) % 2 === 1;
              return (
                <View
                  key={colIndex}
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: isDark ? color2 : color1,
                  }}
                />
              );
            })}
          </View>
        ))}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
});
