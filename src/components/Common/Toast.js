/**
 * Toast & ConfirmModal - Custom notification and confirmation components
 * Replaces Alert.alert() which hangs on some Android APK builds
 */

import React, { useState, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';

// ─────────────────── Toast Context ───────────────────

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

// ─────────────────── Toast Notification ───────────────────

const ToastNotification = ({ message, type = 'info', visible, onHide }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
          Animated.timing(translateY, { toValue: -50, duration: 300, useNativeDriver: true }),
        ]).start(() => onHide());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const bgColor = {
    success: '#2ecc71',
    error: '#e74c3c',
    warning: '#f39c12',
    info: COLORS.primary,
  }[type] || COLORS.primary;

  const icon = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  }[type] || 'ℹ️';

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        { backgroundColor: bgColor, opacity, transform: [{ translateY }] },
      ]}
    >
      <Text style={styles.toastIcon}>{icon}</Text>
      <Text style={styles.toastMessage}>{message}</Text>
    </Animated.View>
  );
};

// ─────────────────── Confirm Modal ───────────────────

const ConfirmModal = ({ visible, title, message, confirmText, cancelText, onConfirm, onCancel, destructive }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Title */}
          <Text style={styles.modalTitle}>{title}</Text>

          {/* Message */}
          <Text style={styles.modalMessage}>{message}</Text>

          {/* Buttons */}
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>{cancelText || 'Cancel'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modalButton,
                destructive ? styles.destructiveButton : styles.confirmButton,
              ]}
              onPress={onConfirm}
            >
              <Text style={styles.confirmButtonText}>{confirmText || 'Confirm'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ─────────────────── Toast Provider ───────────────────

export function ToastProvider({ children }) {
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });
  const [confirm, setConfirm] = useState({
    visible: false,
    title: '',
    message: '',
    confirmText: '',
    cancelText: '',
    destructive: false,
    onConfirm: null,
  });

  const showToast = useCallback((message, type = 'info') => {
    setToast({ visible: true, message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  const showConfirm = useCallback(({ title, message, confirmText, cancelText, destructive = false }) => {
    return new Promise((resolve) => {
      setConfirm({
        visible: true,
        title,
        message,
        confirmText,
        cancelText,
        destructive,
        onConfirm: () => {
          setConfirm(prev => ({ ...prev, visible: false }));
          resolve(true);
        },
      });
    });
  }, []);

  const hideConfirm = useCallback(() => {
    setConfirm(prev => ({ ...prev, visible: false }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, showConfirm }}>
      {children}
      <ToastNotification
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onHide={hideToast}
      />
      <ConfirmModal
        visible={confirm.visible}
        title={confirm.title}
        message={confirm.message}
        confirmText={confirm.confirmText}
        cancelText={confirm.cancelText}
        destructive={confirm.destructive}
        onConfirm={confirm.onConfirm || hideConfirm}
        onCancel={hideConfirm}
      />
    </ToastContext.Provider>
  );
}

// ─────────────────── Styles ───────────────────

const styles = StyleSheet.create({
  // Toast
  toastContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm + 2,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    zIndex: 9999,
    elevation: 10,
    ...SHADOWS.large,
  },
  toastIcon: {
    fontSize: 18,
    marginRight: SPACING.sm,
  },
  toastMessage: {
    color: '#fff',
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.medium,
    flex: 1,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  modalContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.large,
  },
  modalTitle: {
    color: COLORS.text,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  modalMessage: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    lineHeight: 22,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  modalButton: {
    flex: 1,
    paddingVertical: SPACING.sm + 2,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semiBold,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
  },
  destructiveButton: {
    backgroundColor: '#e74c3c',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.semiBold,
  },
});

export default { ToastProvider, useToast };
