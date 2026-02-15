import React, { useEffect, useMemo, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, useWindowDimensions } from 'react-native';
import { COLORS } from '../../constants/theme';

const AnimatedBackground = () => {
  const { width, height } = useWindowDimensions();
  const pulse = useRef(new Animated.Value(0)).current;
  const drift = useRef(new Animated.Value(0)).current;
  const scan = useRef(new Animated.Value(0)).current;

  const stars = useMemo(() => new Array(50).fill(0).map((_, i) => ({
    key: `bg-star-${i}`,
    size: Math.random() * 2 + 1,
    top: Math.random() * height,
    left: Math.random() * width,
    opacity: Math.random() * 0.5 + 0.2,
  })), [width, height]);

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 7000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 7000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    pulseLoop.start();
    return () => pulseLoop.stop();
  }, [pulse]);

  useEffect(() => {
    const driftLoop = Animated.loop(
      Animated.timing(drift, {
        toValue: 1,
        duration: 16000,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    );
    driftLoop.start();
    return () => driftLoop.stop();
  }, [drift]);

  useEffect(() => {
    const scanLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(scan, {
          toValue: 1,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scan, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );
    scanLoop.start();
    return () => scanLoop.stop();
  }, [scan]);

  const blobScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const blobTranslate = drift.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.1, width * 0.1],
  });

  const scanTranslate = scan.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height],
  });

  return (
    <View style={styles.wrapper} pointerEvents="none">
      <Animated.View
        style={[
          styles.blob,
          {
            width: width * 1.4,
            height: width * 1.4,
            top: -width * 0.25,
            left: -width * 0.2,
            backgroundColor: 'rgba(34, 211, 238, 0.2)',
            transform: [{ translateX: blobTranslate }, { scale: blobScale }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.blob,
          {
            width: width * 1.1,
            height: width * 1.1,
            bottom: -width * 0.25,
            right: -width * 0.25,
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            transform: [{ translateX: Animated.multiply(blobTranslate, -1) }, { scale: blobScale }],
          },
        ]}
      />

      <View style={StyleSheet.absoluteFill}>
        {stars.map((star) => (
          <View
            key={star.key}
            style={{
              position: 'absolute',
              width: star.size,
              height: star.size,
              borderRadius: star.size / 2,
              backgroundColor: '#FFFFFF',
              opacity: star.opacity,
              top: star.top,
              left: star.left,
            }}
          />
        ))}
      </View>

      <Animated.View
        style={[
          styles.scan,
          { transform: [{ translateY: scanTranslate }] },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    opacity: 0.35,
  },
  blob: {
    position: 'absolute',
    borderRadius: 900,
  },
  scan: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: 'rgba(34, 211, 238, 0.25)',
  },
});

export default AnimatedBackground;
