import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NFIL3D_CATEGORIES, NFIL3D_PRODUCTS } from '../data/nfil3dData';
import { wooService } from '../services/woocommerceApi';

export default function ShopScreen({ onAddToCart, cartItems, onOpenGuide }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState(NFIL3D_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLiveConnected, setIsLiveConnected] = useState(false);
  const [addedId, setAddedId] = useState(null);

  const handleAddPress = (e, item) => {
    if (e && e.stopPropagation) e.stopPropagation();
    onAddToCart(item);
    setAddedId(item.id);
    setTimeout(() => {
      setAddedId((current) => (current === item.id ? null : current));
    }, 1500);
  };

  useEffect(() => {
    async function loadData() {
      const res = await wooService.getProducts();
      setProducts(res.data);
      setIsLiveConnected(res.isLive);
    }
    loadData();
  }, []);

  const filteredProducts = products.filter((item) => {
    const lower = item.name.toLowerCase();
    // Strictly exclude any 3D models, digital files or papercrafts
    if (
      lower.includes('sonic') ||
      lower.includes('origami') ||
      lower.includes('papercraft') ||
      lower.includes('printable models')
    ) {
      return false;
    }
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subCategory && item.subCategory.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />

      {/* Apple Navigation Header with Official NFIL3D Logo */}
      <View style={styles.navHeader}>
        <View style={styles.navTopRow}>
          <View style={styles.brandContainer}>
            <Image
              source={require('../../assets/logo/ICON_ONLY.png')}
              style={styles.brandIcon}
              resizeMode="contain"
            />
            <View style={styles.brandTextCol}>
              <View style={styles.brandTitleRow}>
                <Text style={styles.largeTitle}>N-FIL</Text>
                <View style={styles.orange3DTag}>
                  <Text style={styles.orange3DText}>3D</Text>
                </View>
              </View>
              <Text style={styles.subTitleCaption}>Precision 3D Polymers & Hardware</Text>
            </View>
          </View>

          <View style={styles.headerRightBadge}>
            {isLiveConnected ? (
              <View style={styles.liveSyncBadge}>
                <View style={styles.greenDot} />
                <Text style={styles.liveSyncText}>Live Store</Text>
              </View>
            ) : (
              <View style={styles.officialPill}>
                <Text style={styles.officialPillText}>Official</Text>
              </View>
            )}
          </View>
        </View>

        {/* Apple iOS Search Field */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={17} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search PLA+, PETG, 3D Printers, Pens..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={17} color="#8E8E93" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Apple Style Featured Showcase Card with Real NFIL3D Spool */}
        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            <View style={styles.madeInIndiaBadge}>
              <Text style={styles.madeInIndiaText}>MADE IN INDIA • 100% AUTHENTIC</Text>
            </View>
            <Text style={styles.heroTitle}>HS PLA+ Bright Rainbow</Text>
            <Text style={styles.heroDesc}>
              1.75mm 1kg High-Speed Filament with vibrant multi-color gradient. ₹1,337 (Sale).
            </Text>
            <TouchableOpacity
              style={styles.heroButton}
              activeOpacity={0.8}
              onPress={() => onOpenGuide && onOpenGuide()}
            >
              <Text style={styles.heroButtonText}>Material Guide</Text>
              <Ionicons name="chevron-forward" size={14} color="#FF6A00" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Horizontal Category Filter Pills (Apple Segmented Look) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContent}
        >
          {NFIL3D_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryPill, isSelected && styles.categoryPillSelected]}
                onPress={() => setSelectedCategory(cat.id)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.categoryPillText,
                    isSelected && styles.categoryPillTextSelected,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all'
              ? 'Featured Catalog'
              : NFIL3D_CATEGORIES.find((c) => c.id === selectedCategory)?.name}
          </Text>
          <Text style={styles.sectionCount}>{filteredProducts.length} items</Text>
        </View>

        {/* Apple 2-Column Product Grid */}
        <View style={styles.productGrid}>
          {filteredProducts.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.88}
              onPress={() => setSelectedProduct(item)}
            >
              {item.tag && (
                <View style={styles.tagPill}>
                  <Text style={styles.tagText}>{item.tag}</Text>
                </View>
              )}
              <Image
                source={{ uri: item.image }}
                style={styles.cardImage}
                resizeMode="contain"
              />

              <View style={styles.cardBody}>
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {item.name}
                </Text>

                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={12} color="#FF9500" />
                  <Text style={styles.ratingScore}>{item.rating}</Text>
                  <Text style={styles.ratingCount}>({item.reviewsCount})</Text>
                </View>

                <View style={styles.priceRow}>
                  <Text style={styles.cardPrice}>₹{item.price}</Text>
                  {item.originalPrice > item.price && (
                    <Text style={styles.cardOriginalPrice}>
                      ₹{item.originalPrice}
                    </Text>
                  )}
                </View>

                {/* NFIL3D Orange Button */}
                <TouchableOpacity
                  style={[
                    styles.addButton,
                    addedId === item.id && styles.addButtonSuccess,
                  ]}
                  activeOpacity={0.8}
                  onPress={(e) => handleAddPress(e, item)}
                >
                  <Ionicons
                    name={addedId === item.id ? 'checkmark' : 'add'}
                    size={16}
                    color="#FFFFFF"
                  />
                  <Text style={styles.addButtonText}>
                    {addedId === item.id ? 'Added' : 'Add'}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Apple iOS Bottom Sheet Modal */}
      {selectedProduct && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedProduct}
          onRequestClose={() => setSelectedProduct(null)}
        >
          <View style={styles.sheetOverlay}>
            <View style={styles.sheetContainer}>
              <View style={styles.grabberHandle} />

              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle} numberOfLines={1}>
                  {selectedProduct.name}
                </Text>
                <TouchableOpacity
                  style={styles.closeCircle}
                  onPress={() => setSelectedProduct(null)}
                >
                  <Ionicons name="close" size={18} color="#8E8E93" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                  source={{ uri: selectedProduct.image }}
                  style={styles.sheetImage}
                  resizeMode="contain"
                />

                <View style={styles.sheetPriceRow}>
                  <Text style={styles.sheetPrice}>₹{selectedProduct.price}</Text>
                  <Text style={styles.sheetOriginalPrice}>
                    ₹{selectedProduct.originalPrice}
                  </Text>
                  <View style={styles.sheetStockBadge}>
                    <Text style={styles.sheetStockText}>In Stock</Text>
                  </View>
                </View>

                <Text style={styles.sheetDesc}>{selectedProduct.description}</Text>

                {/* Technical Settings */}
                {selectedProduct.specs && (
                  <View style={styles.groupedList}>
                    <Text style={styles.groupHeader}>RECOMMENDED PRINTER SETTINGS</Text>
                    {selectedProduct.specs.nozzleTemp && (
                      <View style={styles.listRow}>
                        <Text style={styles.listLabel}>Nozzle Temperature</Text>
                        <Text style={styles.listValue}>{selectedProduct.specs.nozzleTemp}</Text>
                      </View>
                    )}
                    {selectedProduct.specs.bedTemp && (
                      <View style={styles.listRow}>
                        <Text style={styles.listLabel}>Bed Temperature</Text>
                        <Text style={styles.listValue}>{selectedProduct.specs.bedTemp}</Text>
                      </View>
                    )}
                    {selectedProduct.specs.printSpeed && (
                      <View style={[styles.listRow, { borderBottomWidth: 0 }]}>
                        <Text style={styles.listLabel}>Print Speed</Text>
                        <Text style={styles.listValue}>{selectedProduct.specs.printSpeed}</Text>
                      </View>
                    )}
                  </View>
                )}

                {/* Color Swatches */}
                {selectedProduct.colors && (
                  <View style={[styles.groupedList, { marginTop: 12 }]}>
                    <Text style={styles.groupHeader}>AVAILABLE VARIATIONS</Text>
                    <View style={styles.colorPillsWrap}>
                      {selectedProduct.colors.map((c, i) => (
                        <View key={i} style={styles.appleColorPill}>
                          <Text style={styles.appleColorText}>{c}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </ScrollView>

              {/* Orange Call-To-Action Button */}
              <TouchableOpacity
                style={styles.sheetActionButton}
                activeOpacity={0.85}
                onPress={() => {
                  onAddToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
              >
                <Text style={styles.sheetActionText}>
                  Add to Bag • ₹{selectedProduct.price}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(60, 60, 67, 0.12)',
  },
  navTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandIcon: {
    width: 38,
    height: 38,
    borderRadius: 8,
    marginRight: 9,
  },
  brandTextCol: {
    justifyContent: 'center',
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  largeTitle: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 22,
    fontWeight: '800',
    color: '#1C1C1E',
    letterSpacing: -0.6,
  },
  orange3DTag: {
    backgroundColor: '#FF6A00',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
    marginLeft: 5,
  },
  orange3DText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  subTitleCaption: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 11,
    color: '#8E8E93',
    fontWeight: '500',
    marginTop: 1,
    letterSpacing: -0.2,
  },
  headerRightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveSyncBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 199, 89, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34C759',
    marginRight: 5,
  },
  liveSyncText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 11,
    fontWeight: '600',
    color: '#34C759',
  },
  officialPill: {
    backgroundColor: 'rgba(255, 106, 0, 0.12)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
  },
  officialPillText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 11,
    fontWeight: '700',
    color: '#FF6A00',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 38,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 14,
    color: '#1C1C1E',
    letterSpacing: -0.24,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  heroCard: {
    backgroundColor: '#1C1C20',
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#26262A',
  },
  heroContent: {
    zIndex: 1,
  },
  madeInIndiaBadge: {
    backgroundColor: 'rgba(255, 106, 0, 0.25)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 8,
  },
  madeInIndiaText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FF6A00',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  heroDesc: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    color: '#8E8E93',
    lineHeight: 18,
    marginBottom: 14,
  },
  heroButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  heroButtonText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FF6A00',
    fontSize: 13,
    fontWeight: '700',
    marginRight: 4,
  },
  categoryScroll: {
    paddingHorizontal: 16,
    marginTop: 14,
    marginBottom: 8,
  },
  categoryContent: {
    gap: 8,
    paddingRight: 16,
  },
  categoryPill: {
    backgroundColor: '#202024',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  categoryPillSelected: {
    backgroundColor: '#FF6A00',
  },
  categoryPillText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    letterSpacing: -0.2,
  },
  categoryPillTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.4,
  },
  sectionCount: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '500',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#1C1C20',
    borderRadius: 18,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#26262A',
    position: 'relative',
  },
  tagPill: {
    position: 'absolute',
    top: 8,
    left: 8,
    zIndex: 2,
    backgroundColor: '#FF6A00',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  cardImage: {
    width: '100%',
    height: 145,
    backgroundColor: '#FFFFFF',
    padding: 6,
  },
  cardBody: {
    padding: 10,
  },
  cardTitle: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    height: 36,
    lineHeight: 18,
    letterSpacing: -0.2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 6,
  },
  ratingScore: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 12,
    fontWeight: '600',
    color: '#C7C7CC',
    marginLeft: 3,
  },
  ratingCount: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 11,
    color: '#8E8E93',
    marginLeft: 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  cardPrice: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  cardOriginalPrice: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 12,
    color: '#8E8E93',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },
  addButton: {
    backgroundColor: '#FF6A00', // NFIL3D Orange
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    borderRadius: 20,
    gap: 4,
  },
  addButtonSuccess: {
    backgroundColor: '#34C759', // Apple Green for added confirmation
  },
  addButtonText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center', // Centers modal on desktop
  },
  sheetContainer: {
    backgroundColor: '#F2F2F7',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    width: '100%',
    maxWidth: 430, // Keep strictly within mobile frame!
    maxHeight: '90%',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.1)',
  },
  grabberHandle: {
    width: 36,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#C7C7CC',
    alignSelf: 'center',
    marginBottom: 12,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sheetTitle: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 18,
    fontWeight: '700',
    color: '#1C1C1E',
    flex: 1,
    marginRight: 10,
    letterSpacing: -0.3,
  },
  closeCircle: {
    backgroundColor: '#E5E5EA',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetImage: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 14,
    backgroundColor: '#FFFFFF',
  },
  sheetPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sheetPrice: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 24,
    fontWeight: '800',
    color: '#1C1C1E',
  },
  sheetOriginalPrice: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 16,
    color: '#8E8E93',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  sheetStockBadge: {
    backgroundColor: 'rgba(52, 199, 89, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 'auto',
  },
  sheetStockText: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#34C759',
    fontSize: 12,
    fontWeight: '600',
  },
  sheetDesc: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 14,
    color: '#3A3A3C',
    lineHeight: 20,
    marginBottom: 14,
  },
  groupedList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
  },
  groupHeader: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 11,
    fontWeight: '700',
    color: '#8E8E93',
    letterSpacing: 0.5,
    marginTop: 6,
    marginBottom: 8,
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  listLabel: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 14,
    color: '#3A3A3C',
  },
  listValue: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  colorPillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  appleColorPill: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  appleColorText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 12,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  sheetActionButton: {
    backgroundColor: '#FF6A00', // NFIL3D Orange
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  sheetActionText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});
