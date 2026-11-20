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
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MeScreen({
  onOpenStore,
  onOpenAuth,
  onNavigateToPrinters,
  user,
}) {
  const [activeModal, setActiveModal] = useState(null); // 'orders' | 'wishlist' | 'addresses' | 'rewards' | 'filaments' | 'help' | 'settings' | 'about'

  // Saved filament library state
  const [filaments, setFilaments] = useState([
    {
      id: 'f1',
      name: 'HS PLA+ Bright Rainbow 1.75mm',
      remaining: '780g',
      color: '#FF6A00',
      type: 'PLA+',
    },
    {
      id: 'f2',
      name: 'Carbon Fiber PLA+ Black',
      remaining: '420g',
      color: '#1C1C1E',
      type: 'CF-PLA',
    },
    {
      id: 'f3',
      name: 'High-Impact ABS+ Raven Black',
      remaining: '1000g (New)',
      color: '#2C2C2E',
      type: 'ABS+',
    },
    {
      id: 'f4',
      name: 'High-Strength PETG Transparent',
      remaining: '650g',
      color: '#007AFF',
      type: 'PETG',
    },
  ]);

  // Saved addresses
  const [addresses, setAddresses] = useState([
    {
      id: 'a1',
      name: 'Headquarters / Lab',
      address: 'NFIL3D Tech Labs, RIICO Industrial Area, Mansarovar',
      city: 'Jaipur, Rajasthan – 302020',
      phone: '+91 91166 69966',
      isDefault: true,
    },
  ]);

  // Orders
  const [orders, setOrders] = useState([
    {
      id: 'NFIL-8492',
      date: '20 Nov 2026',
      status: 'Out for Delivery',
      total: '₹2,674',
      items: [
        'NFIL3D HS PLA+ Bright Rainbow (1kg)',
        'Carbon Fiber PLA+ Black (1kg)',
      ],
      trackingStage: 3, // 1: Placed, 2: Dispatched, 3: Out for Delivery, 4: Delivered
    },
    {
      id: 'NFIL-8104',
      date: '14 Nov 2026',
      status: 'Delivered',
      total: '₹34,999',
      items: ['NFIL3D N1 High-Speed 3D Printer'],
      trackingStage: 4,
    },
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header matching Page 8 */}
      <View style={styles.topHeader}>
        <Text style={styles.screenTitle}>My Account</Text>

        <View style={styles.headerRightIcons}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => Alert.alert('Notifications', 'All orders and print alerts are normal.')}
          >
            <Ionicons name="notifications-outline" size={22} color="#FF6A00" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setActiveModal('settings')}
          >
            <Ionicons name="settings-outline" size={22} color="#FF6A00" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Profile Card matching Page 8 */}
        <View style={styles.profileCard}>
          <View style={styles.profileLeft}>
            <View style={styles.waveformAvatarCircle}>
              <Ionicons name="pulse" size={26} color="#FFFFFF" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileTitle}>
                {user ? user.name || user.email : 'Welcome to NFIL3D'}
              </Text>
              <Text style={styles.profileSub}>
                {user ? user.email : 'Sign in to manage your account'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.signInPill}
            activeOpacity={0.85}
            onPress={onOpenAuth}
          >
            <Text style={styles.signInPillText}>
              {user ? 'Account >' : 'Sign In / Sign Up >'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 4-Item Quick Grid matching Page 8 */}
        <View style={styles.quickGridCard}>
          <TouchableOpacity
            style={styles.gridItem}
            activeOpacity={0.7}
            onPress={() => setActiveModal('orders')}
          >
            <View style={styles.gridIconWrap}>
              <Ionicons name="cube-outline" size={24} color="#FF6A00" />
            </View>
            <Text style={styles.gridLabel}>Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            activeOpacity={0.7}
            onPress={() => setActiveModal('wishlist')}
          >
            <View style={styles.gridIconWrap}>
              <Ionicons name="heart-outline" size={24} color="#FF6A00" />
            </View>
            <Text style={styles.gridLabel}>Wishlist</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            activeOpacity={0.7}
            onPress={() => setActiveModal('addresses')}
          >
            <View style={styles.gridIconWrap}>
              <Ionicons name="location-outline" size={24} color="#FF6A00" />
            </View>
            <Text style={styles.gridLabel}>Addresses</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            activeOpacity={0.7}
            onPress={() => setActiveModal('rewards')}
          >
            <View style={styles.gridIconWrap}>
              <Ionicons name="ribbon-outline" size={24} color="#FF6A00" />
            </View>
            <Text style={styles.gridLabel}>Rewards</Text>
          </TouchableOpacity>
        </View>

        {/* Promo Store Banner matching Page 8 */}
        <TouchableOpacity
          style={styles.storeBannerCard}
          activeOpacity={0.9}
          onPress={onOpenStore}
        >
          <View style={styles.bannerTextSide}>
            <Text style={styles.bannerHeading}>NFIL3D Store</Text>
            <Text style={styles.bannerSub}>3D Printers, Filaments & More</Text>
            <View style={styles.shopNowRow}>
              <Text style={styles.shopNowText}>Shop Now</Text>
              <Ionicons name="arrow-forward" size={15} color="#FF6A00" />
            </View>
          </View>
          <View style={styles.bannerImageSide}>
            <Image
              source={require('../../assets/printers/N1.webp')}
              style={styles.bannerPrinterImg}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>

        {/* Grouped Settings Menu List matching Page 8 */}
        <View style={styles.menuGroupCard}>
          {/* 1. My Filament Library */}
          <TouchableOpacity
            style={styles.menuRow}
            activeOpacity={0.7}
            onPress={() => setActiveModal('filaments')}
          >
            <View style={styles.menuIconCircle}>
              <Ionicons name="disc-outline" size={20} color="#FF6A00" />
            </View>
            <Text style={styles.menuLabel}>My Filament Library</Text>
            <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          {/* 2. My Printers */}
          <TouchableOpacity
            style={styles.menuRow}
            activeOpacity={0.7}
            onPress={onNavigateToPrinters}
          >
            <View style={styles.menuIconCircle}>
              <Ionicons name="hardware-chip-outline" size={20} color="#FF6A00" />
            </View>
            <Text style={styles.menuLabel}>My Printers</Text>
            <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          {/* 3. Learning Hub */}
          <TouchableOpacity
            style={styles.menuRow}
            activeOpacity={0.7}
            onPress={() => setActiveModal('learning')}
          >
            <View style={styles.menuIconCircle}>
              <Ionicons name="book-outline" size={20} color="#FF6A00" />
            </View>
            <Text style={styles.menuLabel}>Learning Hub</Text>
            <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          {/* 4. Help & Support */}
          <TouchableOpacity
            style={styles.menuRow}
            activeOpacity={0.7}
            onPress={() => setActiveModal('help')}
          >
            <View style={styles.menuIconCircle}>
              <Ionicons name="help-circle-outline" size={20} color="#FF6A00" />
            </View>
            <Text style={styles.menuLabel}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          {/* 5. App Settings */}
          <TouchableOpacity
            style={styles.menuRow}
            activeOpacity={0.7}
            onPress={() => setActiveModal('settings')}
          >
            <View style={styles.menuIconCircle}>
              <Ionicons name="settings-outline" size={20} color="#FF6A00" />
            </View>
            <Text style={styles.menuLabel}>App Settings</Text>
            <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
          </TouchableOpacity>
        </View>

        {/* About NFIL3D Link */}
        <TouchableOpacity
          style={styles.aboutPill}
          activeOpacity={0.7}
          onPress={() => setActiveModal('about')}
        >
          <Text style={styles.aboutPillText}>About NFIL3D • Made with Pride in India</Text>
        </TouchableOpacity>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* 1. ORDERS MODAL */}
      <Modal
        visible={activeModal === 'orders'}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalSafe}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeading}>My Orders</Text>
                <TouchableOpacity onPress={() => setActiveModal(null)}>
                  <Ionicons name="close" size={24} color="#8E8E93" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalScroll}>
                {orders.map((ord) => (
                  <View key={ord.id} style={styles.orderCard}>
                    <View style={styles.orderTopRow}>
                      <Text style={styles.orderNumber}>{ord.id}</Text>
                      <View style={styles.orderStatusPill}>
                        <Text style={styles.orderStatusText}>{ord.status}</Text>
                      </View>
                    </View>
                    <Text style={styles.orderDate}>Ordered on {ord.date}</Text>

                    {ord.items.map((it, idx) => (
                      <Text key={idx} style={styles.orderItemName}>
                        • {it}
                      </Text>
                    ))}

                    <View style={styles.orderTimeline}>
                      {['Placed', 'Dispatched', 'Out for Delivery', 'Delivered'].map(
                        (stage, idx) => (
                          <View key={stage} style={styles.stageItem}>
                            <View
                              style={[
                                styles.stageDot,
                                idx + 1 <= ord.trackingStage && styles.stageDotActive,
                              ]}
                            />
                            <Text style={styles.stageLabel}>{stage}</Text>
                          </View>
                        )
                      )}
                    </View>

                    <View style={styles.orderBottomRow}>
                      <Text style={styles.orderTotal}>Total: {ord.total}</Text>
                      <TouchableOpacity
                        style={styles.trackBtn}
                        onPress={() =>
                          Alert.alert('Live Tracking', `Tracking ID: DELHIVERY-${ord.id}\nDriver: Ramesh (+91 98xxx xxxx)\nExpected Delivery: Today by 6 PM.`)
                        }
                      >
                        <Text style={styles.trackBtnText}>Track Order</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      </Modal>

      {/* 2. FILAMENT LIBRARY MODAL */}
      <Modal
        visible={activeModal === 'filaments'}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalSafe}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeading}>My Filament Spool Library</Text>
                <TouchableOpacity onPress={() => setActiveModal(null)}>
                  <Ionicons name="close" size={24} color="#8E8E93" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalScroll}>
                <Text style={styles.modalDesc}>
                  Track your remaining filament weights, RFID tags, and auto-reorder before running out.
                </Text>

                {filaments.map((f) => (
                  <View key={f.id} style={styles.filamentCard}>
                    <View style={[styles.spoolColorPill, { backgroundColor: f.color }]} />
                    <View style={styles.filamentInfo}>
                      <Text style={styles.filamentName}>{f.name}</Text>
                      <Text style={styles.filamentRemaining}>
                        Estimated: <Text style={{ color: '#FF6A00', fontWeight: '700' }}>{f.remaining}</Text>
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.reorderBtn}
                      onPress={onOpenStore}
                    >
                      <Text style={styles.reorderText}>Reorder</Text>
                    </TouchableOpacity>
                  </View>
                ))}

                <TouchableOpacity
                  style={styles.addSpoolBtn}
                  onPress={() => Alert.alert('NFC / QR Scan', 'Tap phone against official NFIL3D spool NFC tag to auto-register.')}
                >
                  <Ionicons name="add-circle" size={18} color="#FF6A00" style={{ marginRight: 6 }} />
                  <Text style={styles.addSpoolText}>Register New NFIL3D Spool</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      </Modal>

      {/* 3. HELP & SUPPORT MODAL */}
      <Modal
        visible={activeModal === 'help'}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalSafe}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeading}>NFIL3D Help & Support</Text>
                <TouchableOpacity onPress={() => setActiveModal(null)}>
                  <Ionicons name="close" size={24} color="#8E8E93" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalScroll}>
                <View style={styles.supportChannelCard}>
                  <Ionicons name="logo-whatsapp" size={28} color="#25D366" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.channelTitle}>WhatsApp Support</Text>
                    <Text style={styles.channelSub}>Official Helpline: +91 91166 69966</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.channelBtn}
                    onPress={() => Alert.alert('WhatsApp', 'Opening WhatsApp chat with NFIL3D Engineering Support...')}
                  >
                    <Text style={styles.channelBtnText}>Chat Now</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.supportChannelCard}>
                  <Ionicons name="mail" size={28} color="#FF6A00" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.channelTitle}>Email Support</Text>
                    <Text style={styles.channelSub}>support@nfil3d.com</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.channelBtn}
                    onPress={() => Alert.alert('Email Sent', 'Your ticket has been logged with NFIL3D Support team.')}
                  >
                    <Text style={styles.channelBtnText}>Email</Text>
                  </TouchableOpacity>
                </View>

                <Text style={styles.faqSectionHeading}>Frequently Asked Questions</Text>
                <View style={styles.faqItem}>
                  <Text style={styles.faqQuestion}>How fast can NFIL3D HS PLA+ print?</Text>
                  <Text style={styles.faqAnswer}>
                    Our High-Speed PLA+ is certified for speeds up to 600 mm/s with rapid flow melting and no extrusion skipping.
                  </Text>
                </View>
                <View style={styles.faqItem}>
                  <Text style={styles.faqQuestion}>Where are NFIL3D products manufactured?</Text>
                  <Text style={styles.faqAnswer}>
                    All NFIL3D filaments and customized machines are manufactured at our ISO 9001 certified advanced polymer facility in Jaipur, Rajasthan, India.
                  </Text>
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      </Modal>

      {/* 4. ABOUT MODAL */}
      <Modal
        visible={activeModal === 'about'}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalSafe}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeading}>About NFIL3D</Text>
                <TouchableOpacity onPress={() => setActiveModal(null)}>
                  <Ionicons name="close" size={24} color="#8E8E93" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalScroll}>
                <View style={styles.aboutLogoHero}>
                  <Image
                    source={require('../../assets/logo/ICON_ONLY.png')}
                    style={{ width: 80, height: 80 }}
                    resizeMode="contain"
                  />
                  <Text style={styles.aboutHeroTitle}>N-FIL3D Technologies</Text>
                  <Text style={styles.aboutHeroSub}>India's Leading 3D Printing & Polymer Innovation</Text>
                </View>

                <Text style={styles.aboutParagraph}>
                  Founded in Jaipur, Rajasthan, NFIL3D manufactures world-class precision 3D printing filaments, engineering polymers, and high-speed desktop 3D printers.
                </Text>

                <View style={styles.aboutPillarRow}>
                  <View style={styles.pillarCard}>
                    <Text style={styles.pillarValue}>±0.02mm</Text>
                    <Text style={styles.pillarLabel}>Laser Diameter Tolerance</Text>
                  </View>
                  <View style={styles.pillarCard}>
                    <Text style={styles.pillarValue}>100%</Text>
                    <Text style={styles.pillarLabel}>Made in India</Text>
                  </View>
                </View>

                <Text style={styles.aboutParagraph}>
                  Every spool is dry-vacuum packed with desiccant and verified for consistent flow across Bambu Lab, Creality, NFIL3D, and all open-source 3D printers.
                </Text>

                <Text style={styles.versionText}>App Version 2.4.0 (Build 2026.11) • Apple Minimal Edition</Text>
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      </Modal>

      {/* 5. WISHLIST MODAL */}
      <Modal
        visible={activeModal === 'wishlist'}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalSafe}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeading}>My Wishlist</Text>
                <TouchableOpacity onPress={() => setActiveModal(null)}>
                  <Ionicons name="close" size={24} color="#8E8E93" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalScroll}>
                <View style={styles.wishlistItem}>
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80' }}
                    style={styles.wishlistImg}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.wishlistTitle}>Design Headphone Stand "Swing"</Text>
                    <Text style={styles.wishlistSub}>By Deltaprints • 8.5K Likes</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.wishlistActionBtn}
                    onPress={() => {
                      setActiveModal(null);
                      if (onNavigateToPrinters) onNavigateToPrinters();
                    }}
                  >
                    <Text style={styles.wishlistActionText}>Print</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.wishlistItem}>
                  <Image
                    source={require('../../assets/printers/N1.webp')}
                    style={styles.wishlistImg}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.wishlistTitle}>NFIL3D N1 High-Speed 3D Printer</Text>
                    <Text style={styles.wishlistSub}>₹34,999 • In Stock</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.wishlistActionBtn}
                    onPress={() => {
                      setActiveModal(null);
                      onOpenStore();
                    }}
                  >
                    <Text style={styles.wishlistActionText}>Buy</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      </Modal>

      {/* 6. REWARDS MODAL */}
      <Modal
        visible={activeModal === 'rewards'}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalSafe}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeading}>NFIL3D Rewards</Text>
                <TouchableOpacity onPress={() => setActiveModal(null)}>
                  <Ionicons name="close" size={24} color="#8E8E93" />
                </TouchableOpacity>
              </View>

              <View style={styles.rewardsHero}>
                <Ionicons name="trophy" size={44} color="#FF6A00" />
                <Text style={styles.rewardPoints}>450 Points</Text>
                <Text style={styles.rewardPointsSub}>Earn points on every 3D print and spool purchase</Text>
              </View>

              <View style={styles.couponCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.couponTitle}>₹200 OFF Next Filament Spool</Text>
                  <Text style={styles.couponSub}>Use code: NFIL200 on cart</Text>
                </View>
                <TouchableOpacity
                  style={styles.copyCouponBtn}
                  onPress={() => Alert.alert('Copied!', 'Coupon NFIL200 copied to clipboard!')}
                >
                  <Text style={styles.copyCouponText}>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </Modal>

      {/* 7. SETTINGS MODAL */}
      <Modal
        visible={activeModal === 'settings'}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setActiveModal(null)}
      >
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalSafe}>
            <View style={styles.modalCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeading}>App Settings</Text>
                <TouchableOpacity onPress={() => setActiveModal(null)}>
                  <Ionicons name="close" size={24} color="#8E8E93" />
                </TouchableOpacity>
              </View>

              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Theme</Text>
                <Text style={styles.settingVal}>Apple Minimal Light</Text>
              </View>
              <View style={styles.menuDivider} />
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Currency</Text>
                <Text style={styles.settingVal}>INR (₹)</Text>
              </View>
              <View style={styles.menuDivider} />
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Push Notifications</Text>
                <Text style={styles.settingVal}>Enabled</Text>
              </View>
              <View style={styles.menuDivider} />
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Data Telemetry</Text>
                <Text style={styles.settingVal}>Local LAN Only</Text>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  screenTitle: {
    fontSize: 22,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '800',
    color: '#1C1C1E',
  },
  headerRightIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF0E5',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#FF3B30',
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  waveformAvatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileTitle: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '700',
    color: '#1C1C1E',
  },
  profileSub: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    marginTop: 2,
  },
  signInPill: {
    backgroundColor: '#FF6A00',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  signInPillText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
  },
  quickGridCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  gridItem: {
    alignItems: 'center',
    flex: 1,
  },
  gridIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF0E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  gridLabel: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '600',
    color: '#1C1C1E',
  },
  storeBannerCard: {
    backgroundColor: '#FFF5EB',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFE0CC',
    overflow: 'hidden',
  },
  bannerTextSide: {
    flex: 1,
  },
  bannerHeading: {
    fontSize: 20,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '800',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  bannerSub: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    marginBottom: 10,
  },
  shopNowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  shopNowText: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
    color: '#FF6A00',
  },
  bannerImageSide: {
    width: 100,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerPrinterImg: {
    width: '100%',
    height: '100%',
  },
  menuGroupCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF0E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'SF-Pro-Regular',
    color: '#1C1C1E',
    fontWeight: '500',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F2F2F7',
    marginLeft: 44,
  },
  aboutPill: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  aboutPillText: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
  },

  // MODAL STYLES
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalSafe: {
    width: '100%',
    alignItems: 'center',
  },
  modalCard: {
    width: '100%',
    maxWidth: 520,
    maxHeight: '85%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  modalHeading: {
    fontSize: 20,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '800',
    color: '#1C1C1E',
  },
  modalScroll: {
    paddingVertical: 6,
  },
  modalDesc: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    lineHeight: 18,
    marginBottom: 14,
  },
  orderCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  orderTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  orderNumber: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
    color: '#1C1C1E',
  },
  orderStatusPill: {
    backgroundColor: '#E5F9EB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  orderStatusText: {
    color: '#34C759',
    fontSize: 12,
    fontWeight: '700',
  },
  orderDate: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 8,
  },
  orderItemName: {
    fontSize: 13,
    color: '#1C1C1E',
    marginBottom: 2,
  },
  orderTimeline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  stageItem: {
    alignItems: 'center',
    flex: 1,
  },
  stageDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5E5EA',
    marginBottom: 4,
  },
  stageDotActive: {
    backgroundColor: '#FF6A00',
  },
  stageLabel: {
    fontSize: 9,
    color: '#8E8E93',
    textAlign: 'center',
  },
  orderBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  orderTotal: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  trackBtn: {
    backgroundColor: '#FF6A00',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  trackBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  filamentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    gap: 12,
  },
  spoolColorPill: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  filamentInfo: {
    flex: 1,
  },
  filamentName: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
    color: '#1C1C1E',
  },
  filamentRemaining: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  reorderBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: '#FFF0E5',
  },
  reorderText: {
    fontSize: 12,
    color: '#FF6A00',
    fontWeight: '700',
  },
  addSpoolBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#FF6A00',
    borderStyle: 'dashed',
    marginTop: 8,
    marginBottom: 20,
  },
  addSpoolText: {
    color: '#FF6A00',
    fontSize: 14,
    fontWeight: '700',
  },
  supportChannelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 14,
    gap: 12,
    marginBottom: 12,
  },
  channelTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  channelSub: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  channelBtn: {
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
  },
  channelBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  faqSectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
    marginTop: 12,
    marginBottom: 8,
  },
  faqItem: {
    marginBottom: 12,
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  faqAnswer: {
    fontSize: 12,
    color: '#8E8E93',
    lineHeight: 17,
  },
  aboutLogoHero: {
    alignItems: 'center',
    marginBottom: 16,
  },
  aboutHeroTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1C1C1E',
    marginTop: 10,
  },
  aboutHeroSub: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 3,
  },
  aboutParagraph: {
    fontSize: 13,
    color: '#3A3A3C',
    lineHeight: 19,
    marginBottom: 12,
  },
  aboutPillarRow: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
  },
  pillarCard: {
    flex: 1,
    backgroundColor: '#FFF0E5',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
  },
  pillarValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FF6A00',
  },
  pillarLabel: {
    fontSize: 11,
    color: '#8E8E93',
    marginTop: 2,
    textAlign: 'center',
  },
  versionText: {
    fontSize: 11,
    color: '#C7C7CC',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  wishlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    gap: 12,
  },
  wishlistImg: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  wishlistTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  wishlistSub: {
    fontSize: 11,
    color: '#8E8E93',
    marginTop: 2,
  },
  wishlistActionBtn: {
    backgroundColor: '#FF6A00',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
  },
  wishlistActionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  rewardsHero: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFF0E5',
    borderRadius: 18,
    marginBottom: 16,
  },
  rewardPoints: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FF6A00',
    marginTop: 6,
  },
  rewardPointsSub: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 3,
  },
  couponCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  couponTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  couponSub: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  copyCouponBtn: {
    backgroundColor: '#FF6A00',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  copyCouponText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  settingLabel: {
    fontSize: 15,
    color: '#1C1C1E',
  },
  settingVal: {
    fontSize: 14,
    color: '#FF6A00',
    fontWeight: '600',
  },
});
