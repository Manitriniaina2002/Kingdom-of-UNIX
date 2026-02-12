/**
 * Dialog Box Component - NPC conversations and story elements
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  Image,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

const DialogBox = ({
  visible = false,
  character = '',
  characterImage = null,
  characterName = 'Manitriniaina',
  message = '',
  messages = [], // Array of messages for multi-step dialog
  onClose,
  onComplete,
  showContinue = true,
  continueText = 'Continue',
  closeText = 'Close',
  typewriterEffect = true,
  typewriterSpeed = 30,
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  // Get the current message
  const allMessages = messages.length > 0 ? messages : [message];
  const currentMessage = allMessages[currentMessageIndex] || '';
  const isLastMessage = currentMessageIndex >= allMessages.length - 1;

  // Animation on open
  useEffect(() => {
    if (visible) {
      setCurrentMessageIndex(0);
      setDisplayedText('');
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(50);
    }
  }, [visible]);

  // Typewriter effect
  useEffect(() => {
    if (!visible || !currentMessage) return;

    if (typewriterEffect) {
      setIsTyping(true);
      setDisplayedText('');
      let index = 0;
      
      const timer = setInterval(() => {
        if (index < currentMessage.length) {
          setDisplayedText(currentMessage.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, typewriterSpeed);

      return () => clearInterval(timer);
    } else {
      setDisplayedText(currentMessage);
    }
  }, [currentMessage, visible, typewriterEffect]);

  const handleContinue = () => {
    if (isTyping) {
      // Skip typewriter effect
      setDisplayedText(currentMessage);
      setIsTyping(false);
      return;
    }

    if (isLastMessage) {
      onComplete?.();
      onClose?.();
    } else {
      setCurrentMessageIndex(prev => prev + 1);
    }
  };

  const handleClose = () => {
    onClose?.();
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Animated.View 
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Character Avatar */}
          <View style={styles.characterContainer}>
            <View style={styles.characterAvatar}>
              {characterImage ? (
                <Image source={characterImage} style={styles.characterImageStyle} />
              ) : (
                <Text style={styles.characterEmoji}>{character}</Text>
              )}
            </View>
            <View style={styles.characterNameBadge}>
              <Text style={styles.characterName}>{characterName}</Text>
            </View>
          </View>

          {/* Message Box */}
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>{displayedText}</Text>
            
            {isTyping && (
              <Text style={styles.typingIndicator}>▌</Text>
            )}
          </View>

          {/* Progress Dots */}
          {allMessages.length > 1 && (
            <View style={styles.progressDots}>
              {allMessages.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentMessageIndex && styles.dotActive,
                    index < currentMessageIndex && styles.dotCompleted,
                  ]}
                />
              ))}
            </View>
          )}

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.skipButton}
              onPress={handleClose}
            >
              <Text style={styles.skipButtonText}>{closeText}</Text>
            </TouchableOpacity>

            {showContinue && (
              <TouchableOpacity 
                style={styles.continueButton}
                onPress={handleContinue}
              >
                <Text style={styles.continueButtonText}>
                  {isTyping ? 'Skip' : (isLastMessage ? 'Got it!' : `${continueText}`)}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
    padding: SPACING.lg,
  },
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOWS.large,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  characterContainer: {
    alignItems: 'center',
    marginTop: -60,
    marginBottom: SPACING.md,
  },
  characterAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.primary,
    ...SHADOWS.medium,
  },
  characterEmoji: {
    fontSize: 40,
  },
  characterImageStyle: {
    width: 74,
    height: 74,
    borderRadius: 37,
  },
  characterNameBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.round,
    marginTop: -SPACING.sm,
  },
  characterName: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
  },
  messageBox: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    minHeight: 100,
  },
  messageText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    lineHeight: 24,
  },
  typingIndicator: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.lg,
    position: 'absolute',
    right: SPACING.lg,
    bottom: SPACING.lg,
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.textMuted,
    marginHorizontal: SPACING.xs,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    width: 24,
  },
  dotCompleted: {
    backgroundColor: COLORS.success,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
  },
  skipButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  skipButtonText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.lg,
  },
  continueButtonText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
  },
});

export default DialogBox;
