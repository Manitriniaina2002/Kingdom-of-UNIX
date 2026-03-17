import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Easing,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../constants/theme';

const commands = [
  '$ ls -la', '#!/bin/bash', 'grep -r "pattern"',
  'chmod +x script.sh', 'cat /dev/random', 'ps aux | grep',
  'sudo systemctl', 'tar -xzvf', 'curl -X POST',
  'ssh user@host', 'vim ~/.bashrc', 'export PATH=',
  'make install', 'git commit -m', 'docker run',
];

const orbitIcons = ['terminal', 'code', 'database', 'cpu', 'server', 'hard-drive'];

const UnixUniverseLoader = ({ onFinish }) => {
  const { width, height } = useWindowDimensions();
  const logoSize = Math.min(width, height) * 0.72;
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const bgPulse = useRef(new Animated.Value(0)).current;
  const bgDrift = useRef(new Animated.Value(0)).current;

  // Progress simulation (~30s total)
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            onFinish?.();
          }, 1500);
          return 100;
        }
        return prev + 1;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [loading, onFinish]);

  // Starfield data
  const stars = useMemo(() => new Array(60).fill(0).map((_, i) => ({
    key: `star-${i}`,
    size: Math.random() * 2 + 1,
    top: Math.random() * height,
    left: Math.random() * width,
    opacity: Math.random() * 0.6 + 0.2,
  })), [width, height]);

  // Floating code snippets
  const floaters = useMemo(() => new Array(12).fill(0).map((_, i) => ({
    key: `code-${i}`,
    top: Math.random() * height * 0.9,
    duration: 14000 + Math.random() * 6000,
    delay: Math.random() * 8000,
    text: commands[i % commands.length],
  })), [height]);

  const floatAnimations = useMemo(() => floaters.map(() => new Animated.Value(-120)), [floaters]);

  useEffect(() => {
    const loops = floatAnimations.map((anim, idx) => {
      const { duration, delay } = floaters[idx];
      const loop = Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: width + 120,
            duration,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: -120,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      );
      loop.start();
      return loop;
    });

    return () => {
      loops.forEach((loop) => loop.stop());
    };
  }, [floatAnimations, floaters, width]);

  // Orbit animation
  const orbit = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(orbit, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [orbit]);

  const spin = orbit.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Scanning line animation
  const scan = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scan, {
          toValue: 1,
          duration: 4000,
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
    loop.start();
    return () => loop.stop();
  }, [scan]);

  const scanTranslate = scan.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height],
  });

  // Background pulse and drift for animated backdrop
  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(bgPulse, {
          toValue: 1,
          duration: 6000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bgPulse, {
          toValue: 0,
          duration: 6000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    pulseLoop.start();
    return () => pulseLoop.stop();
  }, [bgPulse]);

  useEffect(() => {
    const driftLoop = Animated.loop(
      Animated.timing(bgDrift, {
        toValue: 1,
        duration: 12000,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      }),
    );
    driftLoop.start();
    return () => driftLoop.stop();
  }, [bgDrift]);

  const blobScale = bgPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.25],
  });

  const blobTranslate = bgDrift.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.12, width * 0.12],
  });

  if (!loading) return null;

  return (
    <View style={styles.wrapper} pointerEvents="auto">
      {/* Animated color fields */}
      <Animated.View
        style={[
          styles.bgBlob,
          {
            width: width * 1.4,
            height: width * 1.4,
            top: -width * 0.25,
            left: -width * 0.15,
            backgroundColor: 'rgba(34, 211, 238, 0.14)',
            transform: [{ translateX: blobTranslate }, { scale: blobScale }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.bgBlob,
          {
            width: width * 1.2,
            height: width * 1.2,
            bottom: -width * 0.3,
            right: -width * 0.2,
            backgroundColor: 'rgba(74, 222, 128, 0.12)',
            transform: [{ translateX: Animated.multiply(blobTranslate, -1) }, { scale: blobScale }],
          },
        ]}
      />
      {/* Starfield */}
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

      {/* Floating code lines */}
      <View style={StyleSheet.absoluteFill}>
        {floaters.map((item, idx) => (
          <Animated.Text
            key={item.key}
            style={[
              styles.floatingCode,
              {
                top: item.top,
                transform: [{ translateX: floatAnimations[idx] }],
              },
            ]}
          >
            {item.text}
          </Animated.Text>
        ))}
      </View>

      {/* Orbiting icons */}
      <View style={styles.orbitContainer}>
        <View style={styles.orbitInner}>
          {orbitIcons.map((icon, idx) => (
            <Animated.View
              key={icon}
              style={[
                styles.orbitIcon,
                {
                  transform: [
                    { rotate: spin },
                    { rotate: `${idx * 60}deg` },
                    { translateX: 130 },
                  ],
                },
              ]}
            >
              <Feather name={icon} size={32} color="rgba(74, 222, 128, 0.6)" />
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Grid overlay */}
      <View style={styles.gridOverlay} />

      {/* Scanning line */}
      <Animated.View
        style={[
          styles.scanLine,
          { transform: [{ translateY: scanTranslate }] },
        ]}
      />

      {/* Loading panel */}
      <View style={styles.overlay}>
        <View style={styles.panel}>
          <View style={styles.logoSection}>
            <View style={[styles.logoStack, { width: logoSize, height: logoSize }]}>
              <Image
                source={require('../../../assets/unix-kingdom-logo.png')}
                style={{ width: logoSize, height: logoSize }}
                resizeMode="contain"
              />
              <View style={styles.spinnerOverlay}>
                <ActivityIndicator size="large" color="#4ade80" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    zIndex: 1000,
    overflow: 'hidden',
  },
  floatingCode: {
    position: 'absolute',
    color: 'rgba(74, 222, 128, 0.35)',
    fontFamily: FONTS.terminal,
    fontSize: 12,
  },
  orbitContainer: {
    position: 'absolute',
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitInner: {
    width: 260,
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.35,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.08,
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
  },
  bgBlob: {
    position: 'absolute',
    borderRadius: 900,
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: 'rgba(34, 211, 238, 0.35)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  panel: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
  },
  logoStack: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    // size set dynamically via inline style
  },
  spinnerOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UnixUniverseLoader;
