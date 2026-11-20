import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen({ cart, onUpdateQty, onRemove, onClearCart, onExplore }) {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'NFIL10') {
      setDiscountPercent(10);
      Alert.alert('Coupon Applied', '10% discount has been applied to your bag.');
    } else {
      Alert.alert('Invalid Promo Code', 'Try code "NFIL10" for 10% off.');
    }
  };

  const handlePlaceOrder = () => {
    if (!name || !phone || !address) {
      Alert.alert('Incomplete Address', 'Please provide your Full Name, Mobile Number, and Delivery Address.');
      return;
    }
    setIsSuccess(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navHeader}>
        <View style={styles.headerRow}>
          <Text style={styles.largeTitle}>Bag</Text>
          <Text style={styles.itemCount}>
            {cart.reduce((total, i) => total + i.quantity, 0)} items
          </Text>
        </View>
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="bag-outline" size={72} color="#C7C7CC" />
          <Text style={styles.emptyTitle}>Your Bag is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Explore NFIL3D high-speed filaments, 3D printers, and accessories.
          </Text>
          <TouchableOpacity style={styles.applePillBtn} onPress={onExplore}>
            <Text style={styles.applePillBtnText}>Explore Store</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
          {/* Free Delivery Bar (Apple Inset Card with Orange Accents) */}
          <View style={styles.deliveryBadgeCard}>
            <Ionicons name="cube" size={17} color="#FF6A00" />
            <Text style={styles.deliveryBadgeText}>
              {subtotal >= 999
                ? 'Free Standard Delivery Unlocked across India'
                : `Add ₹${999 - subtotal} more to unlock Free Delivery`}
            </Text>
          </View>

          {/* Bag Items (Apple Inset Grouped) */}
          <View style={styles.groupedCard}>
            {cart.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.cartRow,
                  index === cart.length - 1 && { borderBottomWidth: 0 },
                ]}
              >
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemTitle} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>

                  {/* Apple Stepper Control */}
                  <View style={styles.stepperRow}>
                    <View style={styles.appleStepper}>
                      <TouchableOpacity
                        style={styles.stepperAction}
                        onPress={() => onUpdateQty(item.id, item.quantity - 1)}
                      >
                        <Ionicons name="remove" size={14} color="#1C1C1E" />
                      </TouchableOpacity>
                      <Text style={styles.stepperCount}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.stepperAction}
                        onPress={() => onUpdateQty(item.id, item.quantity + 1)}
                      >
                        <Ionicons name="add" size={14} color="#1C1C1E" />
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={styles.trashBtn}
                      onPress={() => onRemove(item.id)}
                    >
                      <Ionicons name="trash-outline" size={16} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Promo Code Field */}
          <View style={styles.promoFieldWrap}>
            <TextInput
              style={styles.promoInput}
              placeholder="Promo Code (e.g. NFIL10)"
              placeholderTextColor="#8E8E93"
              value={couponCode}
              onChangeText={setCouponCode}
              autoCapitalize="characters"
            />
            <TouchableOpacity style={styles.promoApplyBtn} onPress={applyCoupon}>
              <Text style={styles.promoApplyText}>Apply</Text>
            </TouchableOpacity>
          </View>

          {/* Bill Summary (Apple Table) */}
          <View style={styles.groupedCard}>
            <Text style={styles.summaryHeading}>ORDER SUMMARY</Text>
            <View style={styles.summaryLine}>
              <Text style={styles.lineLabel}>Subtotal</Text>
              <Text style={styles.lineValue}>₹{subtotal}</Text>
            </View>

            {discountAmount > 0 && (
              <View style={styles.summaryLine}>
                <Text style={[styles.lineLabel, { color: '#34C759' }]}>
                  Coupon Savings (10%)
                </Text>
                <Text style={[styles.lineValue, { color: '#34C759' }]}>
                  -₹{discountAmount}
                </Text>
              </View>
            )}

            <View style={styles.summaryLine}>
              <Text style={styles.lineLabel}>Standard Shipping</Text>
              <Text style={styles.lineValue}>
                {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
              </Text>
            </View>

            <View style={styles.hairlineDivider} />

            <View style={[styles.summaryLine, { paddingVertical: 10 }]}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalPrice}>₹{grandTotal}</Text>
            </View>
          </View>

          {/* Orange Checkout Action Button */}
          <TouchableOpacity
            style={styles.appleCheckoutBtn}
            activeOpacity={0.85}
            onPress={() => setShowCheckoutModal(true)}
          >
            <Text style={styles.appleCheckoutText}>Checkout • ₹{grandTotal}</Text>
            <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* Checkout Sheet Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCheckoutModal}
        onRequestClose={() => setShowCheckoutModal(false)}
      >
        <View style={styles.sheetOverlay}>
          <View style={styles.sheetContainer}>
            <View style={styles.grabberHandle} />

            {isSuccess ? (
              <View style={styles.successState}>
                <Ionicons name="checkmark-circle" size={60} color="#34C759" />
                <Text style={styles.successHeading}>Order Confirmed</Text>
                <Text style={styles.successText}>
                  Thank you for ordering with NFIL3D. We will prepare your spools with protective vacuum packaging and complimentary dust filters.
                </Text>
                <TouchableOpacity
                  style={styles.appleDoneBtn}
                  onPress={() => {
                    setShowCheckoutModal(false);
                    setIsSuccess(false);
                    onClearCart();
                    onExplore();
                  }}
                >
                  <Text style={styles.appleDoneText}>Return to Store</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <View style={styles.sheetHeader}>
                  <Text style={styles.sheetTitle}>Shipping Details</Text>
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setShowCheckoutModal(false)}
                  >
                    <Ionicons name="close" size={18} color="#8E8E93" />
                  </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.formLabel}>FULL NAME</Text>
                  <TextInput
                    style={styles.appleInput}
                    placeholder="e.g. Rahul Sharma"
                    placeholderTextColor="#8E8E93"
                    value={name}
                    onChangeText={setName}
                  />

                  <Text style={styles.formLabel}>CONTACT NUMBER</Text>
                  <TextInput
                    style={styles.appleInput}
                    placeholder="10-digit mobile number"
                    placeholderTextColor="#8E8E93"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />

                  <Text style={styles.formLabel}>SHIPPING ADDRESS</Text>
                  <TextInput
                    style={[styles.appleInput, { height: 70, textAlignVertical: 'top' }]}
                    placeholder="House/Plot no, Street, City, State, PIN"
                    placeholderTextColor="#8E8E93"
                    multiline
                    value={address}
                    onChangeText={setAddress}
                  />

                  <View style={styles.securityPill}>
                    <Ionicons name="lock-closed" size={14} color="#34C759" />
                    <Text style={styles.securityText}>
                      256-Bit Encrypted Payment Processing
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.confirmBtn}
                    activeOpacity={0.85}
                    onPress={handlePlaceOrder}
                  >
                    <Text style={styles.confirmBtnText}>
                      Place Order • ₹{grandTotal}
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            )}
          </View>
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
  navHeader: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 14,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(60, 60, 67, 0.12)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  largeTitle: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 24,
    fontWeight: '800',
    color: '#1C1C1E',
    letterSpacing: -0.6,
  },
  itemCount: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
    marginTop: 16,
  },
  emptySubtitle: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
    marginBottom: 20,
  },
  applePillBtn: {
    backgroundColor: '#FF6A00', // NFIL3D Orange
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 22,
  },
  applePillBtnText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  container: {
    padding: 16,
    paddingBottom: 36,
  },
  deliveryBadgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 106, 0, 0.12)',
    padding: 11,
    borderRadius: 12,
    marginBottom: 12,
    gap: 8,
  },
  deliveryBadgeText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 12,
    color: '#FF6A00',
    fontWeight: '700',
    flex: 1,
  },
  groupedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    marginBottom: 12,
  },
  cartRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  itemImage: {
    width: 65,
    height: 65,
    borderRadius: 12,
    backgroundColor: '#E5E5EA',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    fontWeight: '600',
    color: '#1C1C1E',
    lineHeight: 17,
  },
  itemPrice: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 15,
    fontWeight: '700',
    color: '#FF6A00',
    marginTop: 3,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  appleStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  stepperAction: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperCount: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 13,
    fontWeight: '700',
    color: '#1C1C1E',
    paddingHorizontal: 8,
  },
  trashBtn: {
    marginLeft: 'auto',
    padding: 4,
  },
  promoFieldWrap: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
  },
  promoInput: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 13,
    color: '#1C1C1E',
    fontFamily: 'SF-Pro, -apple-system',
    fontWeight: '500',
  },
  promoApplyBtn: {
    backgroundColor: '#FF6A00',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 9,
  },
  promoApplyText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  summaryHeading: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 11,
    fontWeight: '700',
    color: '#8E8E93',
    letterSpacing: 0.5,
    marginTop: 6,
    marginBottom: 8,
  },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
  },
  summaryLabel: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    color: '#8E8E93',
  },
  summaryValue: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 13,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  lineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  lineLabel: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 14,
    color: '#3A3A3C',
  },
  lineValue: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  hairlineDivider: {
    height: 0.5,
    backgroundColor: '#E5E5EA',
    marginVertical: 6,
  },
  totalText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  totalPrice: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 18,
    fontWeight: '900',
    color: '#FF6A00', // NFIL3D Orange
  },
  appleCheckoutBtn: {
    backgroundColor: '#FF6A00', // NFIL3D Orange
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 16,
    gap: 6,
    marginTop: 4,
  },
  appleCheckoutText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  sheetContainer: {
    backgroundColor: '#F2F2F7',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    width: '100%',
    maxWidth: 430,
    maxHeight: '85%',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
  },
  grabberHandle: {
    width: 36,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#C7C7CC',
    alignSelf: 'center',
    marginBottom: 14,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sheetTitle: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    letterSpacing: -0.3,
  },
  closeBtn: {
    backgroundColor: '#E5E5EA',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formLabel: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 11,
    fontWeight: '700',
    color: '#8E8E93',
    letterSpacing: 0.5,
    marginTop: 8,
    marginBottom: 4,
  },
  appleInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1C1C1E',
    fontFamily: 'SF-Pro, -apple-system',
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.12)',
  },
  securityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
    gap: 6,
  },
  securityText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 12,
    color: '#34C759',
    fontWeight: '500',
  },
  confirmBtn: {
    backgroundColor: '#34C759',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  successState: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  successHeading: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 20,
    fontWeight: '800',
    color: '#1C1C1E',
    marginTop: 12,
  },
  successText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
    marginBottom: 20,
  },
  appleDoneBtn: {
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 24,
    paddingVertical: 11,
    borderRadius: 20,
  },
  appleDoneText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
