import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  useWindowDimensions,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

import MakerWorldScreen from './src/screens/MakerWorldScreen';
import DevicesScreen from './src/screens/DevicesScreen';
import ShopScreen from './src/screens/ShopScreen';
import MeScreen from './src/screens/MeScreen';
import CartScreen from './src/screens/CartScreen';
import SideDrawerModal from './src/components/SideDrawerModal';
import AuthModal from './src/components/AuthModal';
import SplashScreen from './src/components/SplashScreen';

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [currentTab, setCurrentTab] = useState('models'); // 'models' | 'devices' | 'store' | 'me'
  const [isBagModalOpen, setIsBagModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [cart, setCart] = useState([
    {
      id: 2033,
      name: 'NFIL3D HS PLA+ Bright Rainbow Filament 1.75mm – 1kg',
      price: 1337,
      quantity: 1,
      image: 'https://nfil3d.com/wp-content/uploads/2026/11/nfil3d-bright-rainbow-1kg.jpg',
    },
  ]);

  const [fontsLoaded] = useFonts({
    'SF-Pro': require('./assets/fonts/SF-Pro.ttf'),
    'SF-Pro-Regular': require('./assets/fonts/SF-Pro-Text-Regular.otf'),
    'SF-Pro-Bold': require('./assets/fonts/SF-Pro-Text-Bold.otf'),
    'SF-Pro-Display-Bold': require('./assets/fonts/SF-Pro-Display-Bold.otf'),
  });

  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === 'web' && width > 540;

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.outerCanvas}>
      <StatusBar style="dark" />
      <View style={[styles.appContainer, isDesktop && styles.desktopFramedContainer]}>
        {/* Animated App Splash Screen on Launch */}
        {isSplashVisible && (
          <SplashScreen onFinish={() => setIsSplashVisible(false)} />
        )}

        {/* Floating Top Bag Shortcut */}
        <TouchableOpacity
          style={styles.floatingBagPill}
          activeOpacity={0.85}
          onPress={() => setIsBagModalOpen(true)}
        >
          <Ionicons name="bag" size={15} color="#FFFFFF" />
          <Text style={styles.floatingBagText}>Bag ({totalCartCount})</Text>
        </TouchableOpacity>

        {/* Screen Content */}
        <View style={styles.screenContent}>
          {currentTab === 'models' && (
            <MakerWorldScreen
              onOpenDrawer={() => setIsDrawerOpen(true)}
              onStartPrintJob={() => setCurrentTab('devices')}
            />
          )}

          {currentTab === 'devices' && (
            <DevicesScreen onNavigateToStore={() => setCurrentTab('store')} />
          )}

          {currentTab === 'store' && (
            <ShopScreen onAddToCart={addToCart} cartItems={cart} />
          )}

          {currentTab === 'me' && (
            <MeScreen
              onOpenStore={() => setCurrentTab('store')}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          )}
        </View>

        {/* Apple Minimal Tab Bar */}
        <View style={styles.appleTabBar}>
          {/* 1. Models (MakerWorld) */}
          <TouchableOpacity
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => setCurrentTab('models')}
          >
            <Ionicons
              name={currentTab === 'models' ? 'grid' : 'grid-outline'}
              size={22}
              color={currentTab === 'models' ? '#FF6A00' : '#8E8E93'}
            />
            <Text
              style={[
                styles.tabLabel,
                currentTab === 'models' && styles.tabLabelActive,
              ]}
            >
              Models
            </Text>
          </TouchableOpacity>

          {/* 2. Devices (Printers & Live Camera) */}
          <TouchableOpacity
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => setCurrentTab('devices')}
          >
            <Ionicons
              name={currentTab === 'devices' ? 'hardware-chip' : 'hardware-chip-outline'}
              size={23}
              color={currentTab === 'devices' ? '#FF6A00' : '#8E8E93'}
            />
            <Text
              style={[
                styles.tabLabel,
                currentTab === 'devices' && styles.tabLabelActive,
              ]}
            >
              Devices
            </Text>
          </TouchableOpacity>

          {/* 3. Official Store */}
          <TouchableOpacity
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => setCurrentTab('store')}
          >
            <Ionicons
              name={currentTab === 'store' ? 'cart' : 'cart-outline'}
              size={23}
              color={currentTab === 'store' ? '#FF6A00' : '#8E8E93'}
            />
            <Text
              style={[
                styles.tabLabel,
                currentTab === 'store' && styles.tabLabelActive,
              ]}
            >
              Store
            </Text>
          </TouchableOpacity>

          {/* 4. Me (User Hub & Filament Library) */}
          <TouchableOpacity
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => setCurrentTab('me')}
          >
            <Ionicons
              name={currentTab === 'me' ? 'person' : 'person-outline'}
              size={22}
              color={currentTab === 'me' ? '#FF6A00' : '#8E8E93'}
            />
            <Text
              style={[
                styles.tabLabel,
                currentTab === 'me' && styles.tabLabelActive,
              ]}
            >
              Me
            </Text>
          </TouchableOpacity>
        </View>

        {/* Side Drawer Modal */}
        <SideDrawerModal
          visible={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onSelectOption={(opt) => {
            if (opt === 'makerlab') setCurrentTab('models');
            if (opt === 'history') setCurrentTab('me');
          }}
        />

        {/* Auth / Onboarding Modal */}
        <AuthModal
          visible={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccessLogin={(email) => {
            // Logged in
          }}
        />

        {/* Slide-Up Bag / Checkout Modal */}
        <Modal
          visible={isBagModalOpen}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsBagModalOpen(false)}
        >
          <View style={styles.bagModalOverlay}>
            <View style={styles.bagModalContainer}>
              <View style={styles.bagModalHeader}>
                <View style={styles.bagGrabber} />
                <TouchableOpacity
                  style={styles.bagCloseBtn}
                  onPress={() => setIsBagModalOpen(false)}
                >
                  <Ionicons name="close-circle" size={28} color="#8E8E93" />
                </TouchableOpacity>
              </View>

              <CartScreen
                cart={cart}
                onUpdateQty={updateQuantity}
                onRemove={removeFromCart}
                onClearCart={clearCart}
                onClose={() => setIsBagModalOpen(false)}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerCanvas: {
    flex: 1,
    backgroundColor: '#E5E5EA', // Apple Light canvas
    alignItems: 'center',
    justifyContent: 'center',
  },
  appContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F2F2F7', // Apple System Grouped Background
    position: 'relative',
    overflow: 'hidden',
  },
  desktopFramedContainer: {
    maxWidth: 430,
    height: '96%',
    maxHeight: 932,
    borderRadius: 44,
    borderWidth: 9,
    borderColor: '#D1D1D6', // Sleek natural titanium frame
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.14,
    shadowRadius: 30,
  },
  floatingBagPill: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 44 : 14,
    right: 14,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6A00', // Signature NFIL3D Orange
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 18,
    gap: 5,
    shadowColor: '#FF6A00',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  floatingBagText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  screenContent: {
    flex: 1,
  },
  appleTabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF', // Clean Apple white tab bar
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(60, 60, 67, 0.12)',
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    minWidth: 64,
  },
  tabLabel: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 10,
    fontWeight: '500',
    color: '#8E8E93',
    marginTop: 3,
  },
  tabLabelActive: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FF6A00',
    fontWeight: '700',
  },
  bagModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bagModalContainer: {
    backgroundColor: '#F2F2F7',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    width: '100%',
    maxWidth: 430,
    height: '92%',
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.1)',
  },
  bagModalHeader: {
    position: 'relative',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
  },
  bagGrabber: {
    width: 36,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#C7C7CC',
  },
  bagCloseBtn: {
    position: 'absolute',
    right: 16,
    top: 6,
    zIndex: 10,
  },
});
