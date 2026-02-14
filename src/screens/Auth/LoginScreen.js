/**
 * Login Screen - User authentication entry point
 * Supports login, quick user switch, and guest access
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { useResponsive, clickable } from '../../utils/responsive';

const AVATARS = ['🧙', '🧝', '🧛', '🧚', '🦊', '🐉', '🦅', '🐺', '🌟', '⚔️', '🛡️', '🗡️'];

export default function LoginScreen({ navigation }) {
  const { login, loginAsGuest, switchUser, users, isLoading } = useAuth();
  const { layout, fonts, spacing, isTablet, isDesktop, width } = useResponsive();
  const insets = useSafeAreaInsets();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(username.trim(), password);
    } catch (e) {
      setError(e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    setLoading(true);
    try {
      await loginAsGuest();
    } catch (e) {
      setError(e.message || 'Guest login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSwitch = async (userId) => {
    setLoading(true);
    try {
      await switchUser(userId);
    } catch (e) {
      setError(e.message || 'Switch failed');
    } finally {
      setLoading(false);
    }
  };

  const cardMaxWidth = isDesktop ? 480 : isTablet ? 440 : '100%';

  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + spacing.xl,
            paddingBottom: insets.bottom + spacing.xl,
            paddingHorizontal: layout.contentPadding,
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={[styles.logo, { fontSize: fonts.title }]}>⚔️</Text>
          <Text style={[styles.title, { fontSize: fonts.xxxl }]}>Kingdom of UNIX</Text>
          <Text style={[styles.subtitle, { fontSize: fonts.md }]}>
            Master the terminal through adventure
          </Text>
        </View>

        {/* Login Card */}
        <View style={[styles.card, { maxWidth: cardMaxWidth, alignSelf: 'center', width: '100%' }]}>
          <Text style={[styles.cardTitle, { fontSize: fonts.xl }]}>Sign In</Text>

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { fontSize: fonts.sm }]}>Username</Text>
            <TextInput
              style={[styles.input, { fontSize: fonts.md }]}
              placeholder="Enter username"
              placeholderTextColor={COLORS.textMuted}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { fontSize: fonts.sm }]}>Password</Text>
            <TextInput
              style={[styles.input, { fontSize: fonts.md }]}
              placeholder="Enter password"
              placeholderTextColor={COLORS.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
              onSubmitEditing={handleLogin}
            />
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, loading && styles.buttonDisabled, clickable()]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.background} size="small" />
            ) : (
              <Text style={[styles.primaryButtonText, { fontSize: fonts.lg }]}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, clickable()]}
            onPress={() => navigation.navigate('Signup')}
            disabled={loading}
          >
            <Text style={[styles.secondaryButtonText, { fontSize: fonts.md }]}>
              Create Account
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={[styles.dividerText, { fontSize: fonts.sm }]}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={[styles.guestButton, clickable()]}
            onPress={handleGuest}
            disabled={loading}
          >
            <Text style={[styles.guestButtonText, { fontSize: fonts.md }]}>
              Continue as Guest
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick User Switch */}
        {users.length > 0 && (
          <View style={[styles.card, { maxWidth: cardMaxWidth, alignSelf: 'center', width: '100%', marginTop: spacing.lg }]}>
            <Text style={[styles.cardTitle, { fontSize: fonts.lg }]}>Quick Switch</Text>
            <Text style={[styles.quickSwitchHint, { fontSize: fonts.sm }]}>
              Tap a user to log in directly
            </Text>
            <View style={styles.userList}>
              {users.filter(u => !u.isGuest).map((user) => (
                <TouchableOpacity
                  key={user.id}
                  style={[styles.userItem, clickable()]}
                  onPress={() => handleQuickSwitch(user.id)}
                  disabled={loading}
                >
                  <View style={styles.userAvatar}>
                    <Text style={styles.userAvatarText}>{user.avatar || '🧙'}</Text>
                  </View>
                  <View style={styles.userInfo}>
                    <Text style={[styles.userName, { fontSize: fonts.md }]}>{user.displayName}</Text>
                    <Text style={[styles.userMeta, { fontSize: fonts.xs }]}>@{user.username}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  logo: {
    marginBottom: SPACING.sm,
  },
  title: {
    color: COLORS.primary,
    fontWeight: FONTS.weights.bold,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    ...SHADOWS.medium,
  },
  cardTitle: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.lg,
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.sizes.sm,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    fontWeight: FONTS.weights.medium,
  },
  input: {
    backgroundColor: COLORS.surfaceLight,
    color: COLORS.textPrimary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  primaryButtonText: {
    color: COLORS.background,
    fontWeight: FONTS.weights.bold,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  secondaryButton: {
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontWeight: FONTS.weights.medium,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.surfaceLight,
  },
  dividerText: {
    color: COLORS.textMuted,
    marginHorizontal: SPACING.md,
  },
  guestButton: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  guestButtonText: {
    color: COLORS.textSecondary,
    fontWeight: FONTS.weights.medium,
  },
  quickSwitchHint: {
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
  },
  userList: {
    gap: SPACING.sm,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  userAvatarText: {
    fontSize: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: COLORS.textPrimary,
    fontWeight: FONTS.weights.medium,
  },
  userMeta: {
    color: COLORS.textMuted,
    marginTop: 2,
  },
});
