import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MAKER_MODELS = [
  {
    id: 'm1',
    title: 'Articulated Crystal Dragon',
    author: 'Cinderwing3D',
    category: 'Multi-Color',
    colorsCount: 4,
    printTime: '4h 12m',
    filamentWeight: '118g',
    recommendedSpool: 'NFIL3D HS Bright Rainbow PLA+',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    likes: '14.2K',
    downloads: '58.9K',
    amsReady: true,
    description: 'Ultra popular print-in-place articulated dragon. Fully articulated with crystal spines. No supports required. Ready for 1-Step multi-color printing.',
  },
  {
    id: 'm2',
    title: 'Minimalist Desk Cable Organizer',
    author: 'MakerDesign',
    category: 'Functional',
    colorsCount: 1,
    printTime: '1h 05m',
    filamentWeight: '38g',
    recommendedSpool: 'NFIL3D Matte Black PLA+',
    image: 'https://images.unsplash.com/photo-1581291518655-9523c932deb4?w=600&auto=format&fit=crop&q=80',
    likes: '9.8K',
    downloads: '32.1K',
    amsReady: false,
    description: 'Magnetic snap-in cable guide for 5 cables. Clean snap design with counter-sunk mounting holes.',
  },
  {
    id: 'm3',
    title: 'Low-Poly Geometric Planter',
    author: 'PolyStudio',
    category: 'Home & Decor',
    colorsCount: 2,
    printTime: '2h 45m',
    filamentWeight: '84g',
    recommendedSpool: 'NFIL3D High-Strength PETG',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&auto=format&fit=crop&q=80',
    likes: '12.5K',
    downloads: '45.0K',
    amsReady: true,
    description: 'Self-watering modular planter pot with drainage tray. Leakproof PETG recommended.',
  },
  {
    id: 'm4',
    title: 'Heavy Duty Drone Motor Arm (Carbon)',
    author: 'AeroMaker',
    category: 'Mechanical',
    colorsCount: 1,
    printTime: '1h 35m',
    filamentWeight: '45g',
    recommendedSpool: 'NFIL3D Carbon Fiber PLA+ Black',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format&fit=crop&q=80',
    likes: '6.4K',
    downloads: '18.7K',
    amsReady: false,
    description: 'High rigidity 5-inch FPV quadcopter arm replacement. Maximum stiffness with chopped carbon fiber.',
  },
];

export default function ModelsScreen({ onStartPrintJob }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [activeModel, setActiveModel] = useState(null);
  const [isPrintingModal, setIsPrintingModal] = useState(false);

  const categories = ['All', 'Multi-Color', 'Functional', 'Home & Decor', 'Mechanical'];

  const filtered = MAKER_MODELS.filter((m) => {
    const matchCat = selectedCategory === 'All' || m.category === selectedCategory;
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOneStepPrint = (model) => {
    setActiveModel(model);
    setIsPrintingModal(true);
  };

  const confirmSendToPrinter = () => {
    setIsPrintingModal(false);
    Alert.alert(
      '🚀 1-Step Print Started!',
      `Auto-sliced & transmitted to N1 Printer. Auto Timelapse is enabled! You earned +50 N-FIL Points.`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.navHeader}>
        <View style={styles.topRow}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.largeTitle}>MakerWorld</Text>
              <View style={styles.makerWorldPill}>
                <Text style={styles.makerWorldPillText}>MODELS</Text>
              </View>
            </View>
            <Text style={styles.subTitleCaption}>Massive High-Quality Models • Multi-Color</Text>
          </View>
          <View style={styles.pointsPill}>
            <Ionicons name="sparkles" size={13} color="#FF6A00" />
            <Text style={styles.pointsPillText}>+50 Pts</Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={17} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search multi-color models, gadgets, art..."
            placeholderTextColor="#8E8E93"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.catScroll}
          contentContainerStyle={styles.catContent}
        >
          {categories.map((cat) => {
            const isPicked = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.catPill, isPicked && styles.catPillPicked]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.7}
              >
                <Text style={[styles.catText, isPicked && styles.catTextPicked]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Models Grid */}
        <View style={styles.modelsGrid}>
          {filtered.map((item) => (
            <View key={item.id} style={styles.modelCard}>
              <View style={styles.imageWrapper}>
                <Image source={{ uri: item.image }} style={styles.modelImg} />
                {item.amsReady && (
                  <View style={styles.amsBadge}>
                    <Text style={styles.amsBadgeText}>Multi-Color ({item.colorsCount})</Text>
                  </View>
                )}
                <View style={styles.statsBadge}>
                  <Ionicons name="heart" size={11} color="#FF3B30" />
                  <Text style={styles.statsText}>{item.likes}</Text>
                </View>
              </View>

              <View style={styles.cardInfo}>
                <Text style={styles.modelTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.modelAuthor}>by {item.author}</Text>

                <View style={styles.specChipsRow}>
                  <View style={styles.specChip}>
                    <Ionicons name="time-outline" size={12} color="#8E8E93" />
                    <Text style={styles.specChipText}>{item.printTime}</Text>
                  </View>
                  <View style={styles.specChip}>
                    <Ionicons name="scale-outline" size={12} color="#8E8E93" />
                    <Text style={styles.specChipText}>{item.filamentWeight}</Text>
                  </View>
                </View>

                {/* 1-Step Print Button */}
                <TouchableOpacity
                  style={styles.oneStepBtn}
                  activeOpacity={0.85}
                  onPress={() => handleOneStepPrint(item)}
                >
                  <Ionicons name="print" size={16} color="#FFFFFF" />
                  <Text style={styles.oneStepBtnText}>1-Step Print</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 1-Step Print Confirmation Sheet */}
      {activeModel && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isPrintingModal}
          onRequestClose={() => setIsPrintingModal(false)}
        >
          <View style={styles.sheetOverlay}>
            <View style={styles.sheetContainer}>
              <View style={styles.grabberHandle} />

              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>1-Step Cloud Printing</Text>
                <TouchableOpacity onPress={() => setIsPrintingModal(false)}>
                  <Ionicons name="close-circle" size={24} color="#8E8E93" />
                </TouchableOpacity>
              </View>

              <Image source={{ uri: activeModel.image }} style={styles.modalModelImg} />

              <Text style={styles.modalModelTitle}>{activeModel.title}</Text>
              <Text style={styles.modalModelDesc}>{activeModel.description}</Text>

              {/* Automatic Slicing Parameters */}
              <View style={styles.autoSliceBox}>
                <Text style={styles.sliceBoxHeader}>AUTOMATIC SLICING PROFILE</Text>
                <View style={styles.sliceRow}>
                  <Text style={styles.sliceLabel}>Target Printer</Text>
                  <Text style={styles.sliceVal}>N1 High-Speed (LAN)</Text>
                </View>
                <View style={styles.sliceRow}>
                  <Text style={styles.sliceLabel}>Recommended Filament</Text>
                  <Text style={styles.sliceValOrange}>{activeModel.recommendedSpool}</Text>
                </View>
                <View style={styles.sliceRow}>
                  <Text style={styles.sliceLabel}>Layer Height</Text>
                  <Text style={styles.sliceVal}>0.16mm Optimal Quality</Text>
                </View>
                <View style={[styles.sliceRow, { borderBottomWidth: 0 }]}>
                  <Text style={styles.sliceLabel}>Print Duration / Weight</Text>
                  <Text style={styles.sliceVal}>
                    {activeModel.printTime} • {activeModel.filamentWeight}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.confirmPrintBtn}
                activeOpacity={0.85}
                onPress={confirmSendToPrinter}
              >
                <Ionicons name="paper-plane" size={18} color="#FFFFFF" />
                <Text style={styles.confirmPrintBtnText}>Start Printing Now</Text>
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
    backgroundColor: 'rgba(242, 242, 247, 0.96)',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 14,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(60, 60, 67, 0.14)',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  largeTitle: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 26,
    fontWeight: '800',
    color: '#1C1C1E',
    letterSpacing: -0.6,
  },
  makerWorldPill: {
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  makerWorldPillText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FF6A00',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  subTitleCaption: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 1,
  },
  pointsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 106, 0, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 4,
  },
  pointsPillText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FF6A00',
    fontSize: 12,
    fontWeight: '700',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 36,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 14,
    color: '#1C1C1E',
  },
  container: {
    padding: 16,
    paddingBottom: 36,
  },
  catScroll: {
    marginBottom: 14,
  },
  catContent: {
    gap: 8,
  },
  catPill: {
    backgroundColor: 'rgba(142, 142, 147, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
  },
  catPillPicked: {
    backgroundColor: '#FF6A00',
  },
  catText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    fontWeight: '600',
    color: '#3A3A3C',
  },
  catTextPicked: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  modelsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modelCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  imageWrapper: {
    position: 'relative',
    width: '100%',
    height: 145,
    backgroundColor: '#E5E5EA',
  },
  modelImg: {
    width: '100%',
    height: '100%',
  },
  amsBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  amsBadgeText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FF6A00',
    fontSize: 9,
    fontWeight: '700',
  },
  statsBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3,
  },
  statsText: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  cardInfo: {
    padding: 10,
  },
  modelTitle: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 13,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  modelAuthor: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 11,
    color: '#8E8E93',
    marginTop: 1,
    marginBottom: 6,
  },
  specChipsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  specChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  specChipText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 10,
    color: '#8E8E93',
    fontWeight: '500',
  },
  oneStepBtn: {
    backgroundColor: '#FF6A00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 14,
    gap: 5,
  },
  oneStepBtnText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
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
    maxHeight: '90%',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
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
  },
  modalModelImg: {
    width: '100%',
    height: 180,
    borderRadius: 14,
    marginBottom: 12,
  },
  modalModelTitle: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 18,
    fontWeight: '800',
    color: '#1C1C1E',
  },
  modalModelDesc: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    color: '#3A3A3C',
    lineHeight: 18,
    marginVertical: 6,
  },
  autoSliceBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.1)',
    marginVertical: 10,
  },
  sliceBoxHeader: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 10,
    fontWeight: '700',
    color: '#8E8E93',
    letterSpacing: 0.5,
    marginTop: 6,
    marginBottom: 6,
  },
  sliceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  sliceLabel: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    color: '#3A3A3C',
  },
  sliceVal: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 13,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  sliceValOrange: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 13,
    fontWeight: '700',
    color: '#FF6A00',
  },
  confirmPrintBtn: {
    backgroundColor: '#FF6A00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 16,
    gap: 8,
    marginTop: 6,
  },
  confirmPrintBtnText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
