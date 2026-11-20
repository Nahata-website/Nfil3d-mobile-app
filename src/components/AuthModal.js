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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AuthModal({ visible, onClose, onSuccessLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Required', 'Please enter your email and password.');
      return;
    }
    Alert.alert('Signed In', `Welcome back, ${email.split('@')[0]}! Connected to N-FIL3D Cloud.`);
    if (onSuccessLogin) onSuccessLogin(email);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Header Close */}
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color="#8E8E93" />
          </TouchableOpacity>

          <Text style={styles.title}>Easy Printing on the Go</Text>
          <Text style={styles.subtitle}>Print with one tap and monitor from anywhere</Text>

          {/* Benchy Graphic Card */}
          <View style={styles.benchyCard}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1631557567889-411db18c219f?w=600&auto=format&fit=crop&q=80',
              }}
              style={styles.benchyBg}
            />
            <View style={styles.benchyOverlay}>
              <View style={styles.benchyInfoPill}>
                <Ionicons name="boat" size={20} color="#FFD60A" style={{ marginRight: 8 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.benchyTitle}>3D Benchy Speedrun</Text>
                  <View style={styles.benchyProgressRow}>
                    <View style={styles.benchyBar}>
                      <View style={styles.benchyBarFill} />
                    </View>
                    <Text style={styles.benchyPercent}>60%</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.startPrintBadge} activeOpacity={0.8}>
                <Text style={styles.startPrintBadgeText}>Start Print</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Inputs */}
          <View style={styles.inputWrap}>
            <Ionicons name="mail-outline" size={18} color="#8E8E93" style={styles.inputIcon} />
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

          <View style={styles.inputWrap}>
            <Ionicons name="lock-closed-outline" size={18} color="#8E8E93" style={styles.inputIcon} />
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
                size={18}
                color="#8E8E93"
              />
            </TouchableOpacity>
          </View>

          {/* Log in button */}
          <TouchableOpacity
            style={styles.loginBtn}
            activeOpacity={0.85}
            onPress={handleLogin}
          >
            <Text style={styles.loginBtnText}>Log in now</Text>
          </TouchableOpacity>

          {/* Helper Links */}
          <View style={styles.helperRow}>
            <TouchableOpacity onPress={() => Alert.alert('Register', 'Creating a new N-FIL3D account...')}>
              <Text style={styles.helperGreen}>Create an account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Password reset instructions sent.')}>
              <Text style={styles.helperGreen}>Forgot password</Text>
            </TouchableOpacity>
          </View>

          {/* Social Icons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialCircle}>
              <Ionicons name="logo-google" size={18} color="#1C1C1E" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialCircle}>
              <Ionicons name="logo-facebook" size={18} color="#1C1C1E" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialCircle}>
              <Ionicons name="logo-apple" size={18} color="#1C1C1E" />
            </TouchableOpacity>
          </View>

          {/* Terms checkbox */}
          <TouchableOpacity
            style={styles.termsRow}
            activeOpacity={0.7}
            onPress={() => setAgreeTerms(!agreeTerms)}
          >
            <Ionicons
              name={agreeTerms ? 'checkmark-circle' : 'ellipse-outline'}
              size={18}
              color={agreeTerms ? '#FF6A00' : '#8E8E93'}
              style={{ marginRight: 8, marginTop: 2 }}
            />
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.termsGreen}>Terms of Use</Text>,{' '}
              <Text style={styles.termsGreen}>Terms of Sales</Text> and{' '}
              <Text style={styles.termsGreen}>Terms of Use of MakerWorld</Text>.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: 400,
    borderRadius: 28,
    padding: 24,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.12)',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  closeBtn: {
    position: 'absolute',
    top: 18,
    left: 20,
    zIndex: 5,
  },
  title: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, -apple-system',
    fontSize: 22,
    fontWeight: '800',
    color: '#1C1C1E',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 4,
    marginBottom: 16,
    textAlign: 'center',
  },
  benchyCard: {
    width: '100%',
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 18,
    position: 'relative',
    backgroundColor: '#000000',
  },
  benchyBg: {
    width: '100%',
    height: '100%',
    opacity: 0.75,
  },
  benchyOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  benchyInfoPill: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 12,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  benchyTitle: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    fontSize: 12,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  benchyProgressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 6,
  },
  benchyBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 2,
    overflow: 'hidden',
  },
  benchyBarFill: {
    width: '60%',
    height: '100%',
    backgroundColor: '#FF6A00',
  },
  benchyPercent: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    fontSize: 10,
    color: '#FF6A00',
    fontWeight: '700',
  },
  startPrintBadge: {
    backgroundColor: '#FF6A00',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  startPrintBadgeText: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  inputWrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
    marginBottom: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#1C1C1E',
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 14,
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#FF6A00',
    borderRadius: 14,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 12,
  },
  loginBtnText: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  helperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  helperGreen: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#FF6A00',
    fontSize: 13,
    fontWeight: '600',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  socialCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  termsText: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#8E8E93',
    fontSize: 11,
    lineHeight: 15,
    flex: 1,
  },
  termsGreen: {
    color: '#FF6A00',
  },
});
