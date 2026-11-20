import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeConsentModal({ visible, onContinue, onNotNow }) {
  const [shareUsageData, setShareUsageData] = useState(false);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onNotNow}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeContainer}>
          {/* Top Logo */}
          <View style={styles.topLogoWrap}>
            <Image
              source={require('../../assets/logo/logo_white_.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            {/* Orange bar matching Page 2 */}
            <View style={styles.orangeBar} />
          </View>

          {/* Modal Card matching Page 2 */}
          <View style={styles.cardContainer}>
            <Text style={styles.welcomeTitle}>Welcome to NFIL3D</Text>
            <Text style={styles.welcomeDesc}>
              Before you get started, please review how we use your information.
            </Text>

            <View style={styles.divider} />

            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Text style={styles.orangeHighlight}>Terms of Service</Text> and acknowledge our{' '}
              <Text style={styles.orangeHighlight}>Privacy Policy</Text>.
            </Text>

            {/* Checkbox option */}
            <TouchableOpacity
              style={styles.checkboxRow}
              activeOpacity={0.8}
              onPress={() => setShareUsageData(!shareUsageData)}
            >
              <View style={[styles.checkbox, shareUsageData && styles.checkboxActive]}>
                {shareUsageData && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
              </View>
              <View style={styles.checkboxLabelWrap}>
                <Text style={styles.checkboxLabel}>
                  Share anonymous usage data to help us improve the app
                </Text>
                <Text style={styles.optionalTag}>Optional</Text>
              </View>
            </TouchableOpacity>

            {/* Continue Primary Button */}
            <TouchableOpacity
              style={styles.continueBtn}
              activeOpacity={0.85}
              onPress={() => onContinue && onContinue({ shareUsageData })}
            >
              <Text style={styles.continueBtnText}>Continue</Text>
            </TouchableOpacity>
          </View>

          {/* Not now secondary link */}
          <TouchableOpacity
            style={styles.notNowBtn}
            activeOpacity={0.7}
            onPress={onNotNow}
          >
            <Text style={styles.notNowText}>Not now</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeContainer: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  topLogoWrap: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoImage: {
    width: 140,
    height: 48,
  },
  orangeBar: {
    width: 36,
    height: 3,
    backgroundColor: '#FF6A00',
    borderRadius: 1.5,
    marginTop: 16,
  },
  cardContainer: {
    width: '100%',
    backgroundColor: '#1C1C1E',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#2C2C2E',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  welcomeTitle: {
    fontSize: 22,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeDesc: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#2C2C2E',
    marginVertical: 12,
  },
  termsText: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Regular',
    color: '#D1D1D6',
    lineHeight: 19,
    marginBottom: 20,
  },
  orangeHighlight: {
    color: '#FF6A00',
    fontWeight: '600',
    fontFamily: 'SF-Pro-Bold',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#636366',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: '#FF6A00',
    borderColor: '#FF6A00',
  },
  checkboxLabelWrap: {
    flex: 1,
  },
  checkboxLabel: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Regular',
    color: '#FFFFFF',
    lineHeight: 18,
  },
  optionalTag: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    marginTop: 2,
  },
  continueBtn: {
    backgroundColor: '#FF6A00',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
  },
  notNowBtn: {
    marginTop: 24,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  notNowText: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
  },
});
