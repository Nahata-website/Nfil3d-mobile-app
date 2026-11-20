import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MeScreen({ onOpenStore, onOpenAuth }) {
  const [user, setUser] = useState(null);

  const handleAction = (title) => {
    Alert.alert(title, `Opening ${title}...`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header Icons */}
      <View style={styles.topHeader}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={styles.headerIconBtn}
          onPress={() => Alert.alert('Scan QR', 'Opening camera scanner for device binding or model sharing...')}
        >
          <Ionicons name="scan-outline" size={22} color="#1C1C1E" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerIconBtn}
          onPress={() => Alert.alert('Notifications', 'No unread messages.')}
        >
          <Ionicons name="notifications-outline" size={22} color="#1C1C1E" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* User Profile Card */}
        <TouchableOpacity
          style={styles.profileRow}
          activeOpacity={0.8}
          onPress={onOpenAuth}
        >
          <View style={styles.avatarCircle}>
            <Ionicons name="hardware-chip" size={32} color="#FF6A00" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileTitle}>
              {user ? user.email : 'Sign In / Sign Up'}
            </Text>
            <Text style={styles.profileSub}>Connect to N-FIL3D Maker Account</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
        </TouchableOpacity>

        {/* 4-Item Quick Grid */}
        <View style={styles.quickGridCard}>
          <View style={styles.gridRow}>
            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => handleAction('Printing History')}
            >
              <Ionicons name="time-outline" size={24} color="#1C1C1E" />
              <Text style={styles.gridLabel}>Printing{'\n'}History</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => handleAction('Print Queue')}
            >
              <Ionicons name="list-outline" size={24} color="#1C1C1E" />
              <Text style={styles.gridLabel}>Print{'\n'}Queue</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => handleAction('Browsing History')}
            >
              <Ionicons name="eye-outline" size={24} color="#1C1C1E" />
              <Text style={styles.gridLabel}>Browsing{'\n'}History</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => handleAction('Ratings')}
            >
              <Ionicons name="star-outline" size={24} color="#1C1C1E" />
              <Text style={styles.gridLabel}>Ratings</Text>
            </TouchableOpacity>
          </View>

          {/* Pagination dots */}
          <View style={styles.dotsRow}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* NFIL3D Store Prominent Banner */}
        <TouchableOpacity
          style={styles.storeBannerCard}
          activeOpacity={0.85}
          onPress={onOpenStore}
        >
          <View style={styles.storeBannerContent}>
            <View style={styles.storeTitleRow}>
              <Text style={styles.storeTitle}>NFIL3D Store</Text>
              <View style={styles.officialPill}>
                <Text style={styles.officialText}>Official</Text>
              </View>
            </View>
            <Text style={styles.storeSubtitle}>
              3D Printers, Filaments & Accessories.
            </Text>
          </View>
          <Image
            source={require('../../assets/logo/ICON_ONLY.png')}
            style={styles.storeBannerThumb}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Menu List Inset */}
        <View style={styles.menuGroupCard}>
          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => onOpenStore()}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="color-palette-outline" size={20} color="#FF6A00" style={styles.menuIcon} />
              <Text style={styles.menuText}>Filament Library</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => handleAction('Learning & Tutorials')}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="book-outline" size={20} color="#1C1C1E" style={styles.menuIcon} />
              <Text style={styles.menuText}>Learning</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => handleAction('Support Center')}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="help-circle-outline" size={20} color="#1C1C1E" style={styles.menuIcon} />
              <Text style={styles.menuText}>Support Center</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => handleAction('App Feature Lab')}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="flask-outline" size={20} color="#1C1C1E" style={styles.menuIcon} />
              <Text style={styles.menuText}>App Feature Lab</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => handleAction('Settings')}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <Ionicons name="settings-outline" size={20} color="#1C1C1E" style={styles.menuIcon} />
              <Text style={styles.menuText}>Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 14,
    paddingBottom: 8,
    gap: 16,
  },
  headerIconBtn: {
    padding: 4,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    marginBottom: 10,
  },
  avatarCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.12)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  profileInfo: {
    flex: 1,
  },
  profileTitle: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, -apple-system',
    color: '#1C1C1E',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  profileSub: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#8E8E93',
    fontSize: 12,
    marginTop: 2,
  },
  quickGridCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    marginBottom: 14,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  gridItem: {
    alignItems: 'center',
    width: '24%',
  },
  gridLabel: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#3A3A3C',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 14,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    gap: 4,
  },
  dot: {
    width: 12,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#E5E5EA',
  },
  dotActive: {
    backgroundColor: '#FF6A00',
  },
  storeBannerCard: {
    backgroundColor: '#FFF8F2', // Subtle warm brand tint
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 106, 0, 0.25)',
    shadowColor: '#FF6A00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  storeBannerContent: {
    flex: 1,
  },
  storeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  storeTitle: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, -apple-system',
    color: '#1C1C1E',
    fontSize: 18,
    fontWeight: '800',
  },
  officialPill: {
    backgroundColor: 'rgba(255, 106, 0, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  officialText: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#FF6A00',
    fontSize: 10,
    fontWeight: '700',
  },
  storeSubtitle: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#8E8E93',
    fontSize: 12,
  },
  storeBannerThumb: {
    width: 48,
    height: 48,
    borderRadius: 10,
    marginLeft: 10,
  },
  menuGroupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 14,
  },
  menuText: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#1C1C1E',
    fontSize: 15,
    fontWeight: '500',
  },
  divider: {
    height: 0.5,
    backgroundColor: '#E5E5EA',
    marginLeft: 50,
  },
});
