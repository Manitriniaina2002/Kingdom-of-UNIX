/**
 * Signup Screen - New user registration
 * Supports username, display name, password, and avatar selection
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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { useResponsive, clickable } from '../../utils/responsive';
import { useLanguage } from '../../i18n';

const AVATARS = ['🧙', '🧝', '🧛', '🧚', '🦊', '🐉', '🦅', '🐺', '🌟', '⚔️', '🛡️', '🗡️'];

export default function SignupScreen({ navigation }) {
  const { signup } = useAuth();
  const { layout, fonts, spacing, isTablet, isDesktop } = useResponsive();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();

  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🧙');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError('');

    if (!username.trim()) {
      setError(t('auth.usernameIsRequired'));
      return;
    }
    if (username.trim().length < 3) {
      setError(t('auth.usernameTooShort'));
      return;
    }
    if (!password) {
      setError(t('auth.passwordIsRequired'));
      return;
    }
    if (password.length < 4) {
      setError(t('auth.passwordTooShort'));
      return;
    }
    if (password !== confirmPassword) {
      setError(t('auth.passwordsNoMatch'));
      return;
    }

    setLoading(true);
    try {
      await signup(
        username.trim(),
        password,
        displayName.trim() || username.trim(),
        selectedAvatar
      );
    } catch (e) {
      setError(e.message || t('auth.signupFailed'));
    } finally {
      setLoading(false);
    }
  };

  const cardMaxWidth = isDesktop ? 480 : isTablet ? 440 : '100%';

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
          <Text style={[styles.title, { fontSize: fonts.xxl }]}>{t('auth.createAccount')}</Text>
          <Text style={[styles.subtitle, { fontSize: fonts.md }]}>
            {t('auth.beginAdventure')}
          </Text>
        </View>

        {/* Signup Card */}
        <View style={[styles.card, { maxWidth: cardMaxWidth, alignSelf: 'center', width: '100%' }]}>
          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Avatar Selection */}
          <Text style={[styles.label, { fontSize: fonts.sm }]}>{t('auth.chooseAvatar')}</Text>
          <View style={styles.avatarGrid}>
            {AVATARS.map((avatar) => (
              <TouchableOpacity
                key={avatar}
                style={[
                  styles.avatarOption,
                  selectedAvatar === avatar && styles.avatarSelected,
                  clickable(),
                ]}
                onPress={() => setSelectedAvatar(avatar)}
              >
                <Text style={styles.avatarText}>{avatar}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { fontSize: fonts.sm }]}>{t('auth.usernameRequired')}</Text>
            <TextInput
              style={[styles.input, { fontSize: fonts.md }]}
              placeholder={t('auth.chooseUsername')}
              placeholderTextColor={COLORS.textMuted}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { fontSize: fonts.sm }]}>{t('auth.displayName')}</Text>
            <TextInput
              style={[styles.input, { fontSize: fonts.md }]}
              placeholder={t('auth.displayNameOptional')}
              placeholderTextColor={COLORS.textMuted}
              value={displayName}
              onChangeText={setDisplayName}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { fontSize: fonts.sm }]}>{t('auth.passwordRequired')}</Text>
            <TextInput
              style={[styles.input, { fontSize: fonts.md }]}
              placeholder={t('auth.choosePassword')}
              placeholderTextColor={COLORS.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { fontSize: fonts.sm }]}>{t('auth.confirmPassword')}</Text>
            <TextInput
              style={[styles.input, { fontSize: fonts.md }]}
              placeholder={t('auth.confirmYourPassword')}
              placeholderTextColor={COLORS.textMuted}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              editable={!loading}
              onSubmitEditing={handleSignup}
            />
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, loading && styles.buttonDisabled, clickable()]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.background} size="small" />
            ) : (
              <Text style={[styles.primaryButtonText, { fontSize: fonts.lg }]}>
                {t('auth.createAccount')}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.backButton, clickable()]}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={[styles.backButtonText, { fontSize: fonts.md }]}>
              {t('auth.alreadyHaveAccount')}
            </Text>
          </TouchableOpacity>
        </View>
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
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
    marginTop: SPACING.sm,
  },
  avatarOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  avatarSelected: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(0, 182, 3, 0.15)',
  },
  avatarText: {
    fontSize: 24,
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
  backButton: {
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  backButtonText: {
    color: COLORS.primary,
    fontWeight: FONTS.weights.medium,
  },
});
