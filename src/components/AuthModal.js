import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  Alert,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AuthModal({ visible, onClose, onSuccessLogin }) {
  const [authView, setAuthView] = useState('login'); // 'login' | 'register' | 'forgot'
  const [flavor, setFlavor] = useState('printer'); // 'printer' (Page 3) | 'community' (Page 4)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Required', 'Please enter your email and password.');
      return;
    }
    if (!agreeTerms) {
      Alert.alert('Terms Agreement', 'Please agree to the Terms of Service and Privacy Policy.');
      return;
    }
    Alert.alert('Signed In', `Welcome back, ${email.split('@')[0]}! Connected to NFIL3D Cloud.`);
    if (onSuccessLogin) onSuccessLogin(email);
    onClose();
  };

  const handleRegister = () => {
    if (!email || !password || !fullName) {
      Alert.alert('Required', 'Please fill all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Mismatch', 'Passwords do not match.');
      return;
    }
    Alert.alert('Account Created', `Welcome to NFIL3D, ${fullName}! A verification email has been sent to ${email}.`);
    if (onSuccessLogin) onSuccessLogin(email);
    onClose();
  };

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert('Email Required', 'Please enter your registered email address.');
      return;
    }
    Alert.alert('Password Reset', `A secure reset link has been dispatched to ${email}. Please check your inbox.`);
    setAuthView('login');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.modalCard}>
            {/* Top Close Button & View Switcher */}
            <View style={styles.modalHeaderRow}>
              <View style={styles.flavorSwitcher}>
                <TouchableOpacity
                  style={[styles.flavorPill, flavor === 'printer' && styles.flavorPillActive]}
                  onPress={() => setFlavor('printer')}
                >
                  <Text style={[styles.flavorText, flavor === 'printer' && styles.flavorTextActive]}>
                    Print Smarter
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.flavorPill, flavor === 'community' && styles.flavorPillActive]}
                  onPress={() => setFlavor('community')}
                >
                  <Text style={[styles.flavorText, flavor === 'community' && styles.flavorTextActive]}>
                    Creator Community
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Ionicons name="close" size={22} color="#8E8E93" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
              {/* Header Branding matching Page 3 or Page 4 */}
              {flavor === 'printer' ? (
                /* Page 3 Header */
                <View style={styles.centerHeader}>
                  <View style={styles.waveformCircle}>
                    <Ionicons name="pulse" size={24} color="#FFFFFF" />
                  </View>
                  <Text style={styles.mainTitle}>Print Smarter with NFIL3D</Text>
                  <Text style={styles.subTitle}>Your 3D printing world, in your pocket.</Text>

                  {/* 3D Printer Hero Card */}
                  <View style={styles.printerHeroCard}>
                    <Image
                      source={require('../../assets/printers/N1.webp')}
                      style={styles.printerHeroImage}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              ) : (
                /* Page 4 Header */
                <View style={styles.centerHeader}>
                  <Text style={styles.mainTitle}>NFIL3D Creator Community</Text>
                  <Text style={styles.subTitle}>Discover, Share & Print Amazing 3D Models</Text>

                  {/* Creator Community Multi-Card Graphic */}
                  <View style={styles.communityCardsRow}>
                    <View style={styles.communityCardItem}>
                      <Image
                        source={{
                          uri: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=300&auto=format&fit=crop&q=80',
                        }}
                        style={styles.communityCardImg}
                      />
                      <Text style={styles.communityCardLabel}>Off-Road Explorer ⭐4.9</Text>
                    </View>
                    <View style={styles.communityCardItemSmall}>
                      <Image
                        source={{
                          uri: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=300&auto=format&fit=crop&q=80',
                        }}
                        style={styles.communityCardImg}
                      />
                    </View>
                  </View>
                </View>
              )}

              {/* Form Views */}
              {authView === 'login' && (
                <View style={styles.formContainer}>
                  {/* Email Input */}
                  <View style={styles.inputWrap}>
                    <Ionicons name="mail-outline" size={20} color="#8E8E93" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor="#8E8E93"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>

                  {/* Password Input */}
                  <View style={styles.inputWrap}>
                    <Ionicons name="lock-closed-outline" size={20} color="#8E8E93" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor="#8E8E93"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={hidePassword}
                    />
                    <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                      <Ionicons
                        name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="#8E8E93"
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Main Action Button */}
                  <TouchableOpacity
                    style={styles.primaryBtn}
                    activeOpacity={0.85}
                    onPress={handleLogin}
                  >
                    <Text style={styles.primaryBtnText}>Log In</Text>
                  </TouchableOpacity>

                  {/* Create Account & Forgot Password Links matching Page 3 */}
                  <View style={styles.linksRow}>
                    <TouchableOpacity onPress={() => setAuthView('register')}>
                      <Text style={styles.orangeLink}>Create an account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setAuthView('forgot')}>
                      <Text style={styles.orangeLink}>Forgot password?</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Social Login Strip */}
                  <View style={styles.dividerRow}>
                    <View style={styles.line} />
                    <Text style={styles.dividerText}>or continue with</Text>
                    <View style={styles.line} />
                  </View>

                  <View style={styles.socialRow}>
                    <TouchableOpacity
                      style={styles.socialBtn}
                      onPress={() => {
                        Alert.alert('Google Sign-In', 'Authenticating with Google Account...');
                        if (onSuccessLogin) onSuccessLogin('google.user@nfil3d.com');
                        onClose();
                      }}
                    >
                      <Ionicons name="logo-google" size={22} color="#EA4335" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.socialBtn}
                      onPress={() => {
                        Alert.alert('Apple ID', 'Authenticating with Apple ID...');
                        if (onSuccessLogin) onSuccessLogin('apple.user@icloud.com');
                        onClose();
                      }}
                    >
                      <Ionicons name="logo-apple" size={24} color="#000000" />
                    </TouchableOpacity>
                  </View>

                  {/* Terms Checkbox */}
                  <TouchableOpacity
                    style={styles.agreeRow}
                    activeOpacity={0.8}
                    onPress={() => setAgreeTerms(!agreeTerms)}
                  >
                    <View style={[styles.agreeCheckbox, agreeTerms && styles.agreeCheckboxActive]}>
                      {agreeTerms && <Ionicons name="checkmark" size={13} color="#FFFFFF" />}
                    </View>
                    <Text style={styles.agreeText}>
                      I agree to the{' '}
                      <Text style={styles.termsOrange}>Terms of Service</Text> and{' '}
                      <Text style={styles.termsOrange}>Privacy Policy</Text>.
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {authView === 'register' && (
                <View style={styles.formContainer}>
                  <Text style={styles.formTitle}>Create NFIL3D Account</Text>

                  <View style={styles.inputWrap}>
                    <Ionicons name="person-outline" size={20} color="#8E8E93" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Full Name"
                      placeholderTextColor="#8E8E93"
                      value={fullName}
                      onChangeText={setFullName}
                    />
                  </View>

                  <View style={styles.inputWrap}>
                    <Ionicons name="mail-outline" size={20} color="#8E8E93" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Email Address"
                      placeholderTextColor="#8E8E93"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>

                  <View style={styles.inputWrap}>
                    <Ionicons name="lock-closed-outline" size={20} color="#8E8E93" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor="#8E8E93"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={hidePassword}
                    />
                  </View>

                  <View style={styles.inputWrap}>
                    <Ionicons name="shield-checkmark-outline" size={20} color="#8E8E93" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Confirm Password"
                      placeholderTextColor="#8E8E93"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry={hidePassword}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.primaryBtn}
                    activeOpacity={0.85}
                    onPress={handleRegister}
                  >
                    <Text style={styles.primaryBtnText}>Sign Up & Get 100 Reward Points</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.backLinkWrap}
                    onPress={() => setAuthView('login')}
                  >
                    <Text style={styles.grayLinkText}>
                      Already have an account? <Text style={styles.orangeLink}>Log In</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {authView === 'forgot' && (
                <View style={styles.formContainer}>
                  <Text style={styles.formTitle}>Reset Password</Text>
                  <Text style={styles.formSubtitle}>
                    Enter your email address and we will send you instructions to reset your password.
                  </Text>

                  <View style={styles.inputWrap}>
                    <Ionicons name="mail-outline" size={20} color="#8E8E93" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Registered Email"
                      placeholderTextColor="#8E8E93"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.primaryBtn}
                    activeOpacity={0.85}
                    onPress={handleForgotPassword}
                  >
                    <Text style={styles.primaryBtnText}>Send Reset Link</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.backLinkWrap}
                    onPress={() => setAuthView('login')}
                  >
                    <Text style={styles.orangeLink}>Back to Log In</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  safeContainer: {
    width: '100%',
    alignItems: 'center',
  },
  modalCard: {
    width: '100%',
    maxWidth: 540,
    maxHeight: '92%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -4 },
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  flavorSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    padding: 3,
  },
  flavorPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
  },
  flavorPillActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  flavorText: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    fontWeight: '500',
  },
  flavorTextActive: {
    color: '#FF6A00',
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  centerHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  waveformCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  mainTitle: {
    fontSize: 22,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '800',
    color: '#1C1C1E',
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 14,
  },
  printerHeroCard: {
    width: '100%',
    height: 160,
    borderRadius: 18,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    padding: 12,
  },
  printerHeroImage: {
    width: '100%',
    height: '100%',
  },
  communityCardsRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    height: 140,
    marginBottom: 8,
  },
  communityCardItem: {
    flex: 2,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFF0E5',
    position: 'relative',
  },
  communityCardItemSmall: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFF0E5',
  },
  communityCardImg: {
    width: '100%',
    height: '100%',
  },
  communityCardLabel: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(255,255,255,0.92)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    fontSize: 11,
    fontFamily: 'SF-Pro-Bold',
    color: '#1C1C1E',
  },
  formContainer: {
    marginTop: 6,
  },
  formTitle: {
    fontSize: 18,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    lineHeight: 18,
    marginBottom: 16,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'SF-Pro-Regular',
    color: '#1C1C1E',
    outlineStyle: 'none',
  },
  primaryBtn: {
    backgroundColor: '#FF6A00',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 14,
    shadowColor: '#FF6A00',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  orangeLink: {
    color: '#FF6A00',
    fontSize: 14,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5EA',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 13,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 18,
  },
  socialBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  agreeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    gap: 8,
  },
  agreeCheckbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#C7C7CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  agreeCheckboxActive: {
    backgroundColor: '#FF6A00',
    borderColor: '#FF6A00',
  },
  agreeText: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
  },
  termsOrange: {
    color: '#FF6A00',
    fontWeight: '600',
  },
  backLinkWrap: {
    alignItems: 'center',
    marginTop: 12,
  },
  grayLinkText: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
  },
});
