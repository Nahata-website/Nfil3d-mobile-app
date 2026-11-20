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
import {
  MAKERWORLD_CATEGORIES,
  CREATORS_TO_FOLLOW,
  CATEGORY_MODELS,
} from '../data/makerWorldData';

export default function MakerWorldScreen({ onOpenDrawer, onStartPrintJob }) {
  const [selectedCat, setSelectedCat] = useState('for_you');
  const [search, setSearch] = useState('');
  const [followedIds, setFollowedIds] = useState({});
  const [activeModel, setActiveModel] = useState(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const toggleFollow = (creatorId) => {
    setFollowedIds((prev) => ({
      ...prev,
      [creatorId]: !prev[creatorId],
    }));
  };

  const handleModelPress = (model) => {
    setActiveModel(model);
    setIsPrintModalOpen(true);
  };

  const confirmOneStepPrint = () => {
    setIsPrintModalOpen(false);
    Alert.alert(
      '🚀 1-Step Print Started!',
      `Auto-sliced & transmitted to N1 High-Speed Printer. Chamber Liveview active! You earned +50 Maker Points.`
    );
  };

  const modelsList = CATEGORY_MODELS[selectedCat] || CATEGORY_MODELS['for_you'];
  const filteredModels = modelsList.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header Bar */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={onOpenDrawer}
          activeOpacity={0.7}
        >
          <Ionicons name="menu-outline" size={26} color="#1C1C1E" />
        </TouchableOpacity>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={17} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search MakerWorld"
            placeholderTextColor="#8E8E93"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TouchableOpacity
          style={styles.iconBtn}
          activeOpacity={0.7}
          onPress={() => Alert.alert('Notifications', 'No new notifications right now.')}
        >
          <Ionicons name="notifications-outline" size={22} color="#1C1C1E" />
        </TouchableOpacity>
      </View>

      {/* Horizontal Category Navigation Bar */}
      <View style={styles.catBarWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catScrollContent}
        >
          {MAKERWORLD_CATEGORIES.map((cat) => {
            const isActive = selectedCat === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={styles.catTabItem}
                onPress={() => setSelectedCat(cat.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.catTabText, isActive && styles.catTabTextActive]}>
                  {cat.label}
                </Text>
                {isActive && <View style={styles.activeIndicatorLine} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <TouchableOpacity style={styles.dropdownBtn}>
          <Ionicons name="chevron-down" size={16} color="#8E8E93" />
        </TouchableOpacity>
      </View>

      {/* Body Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {selectedCat === 'following' ? (
          /* Following Screen View */
          <View style={styles.followingWrap}>
            <View style={styles.emptyFollowBox}>
              <Text style={styles.emptyFollowTitle}>Not following anyone yet</Text>
              <Text style={styles.emptyFollowSub}>
                Follow creators you like to see their latest models here.
              </Text>
            </View>

            <Text style={styles.sectionHeaderTitle}>Discover creators</Text>

            {CREATORS_TO_FOLLOW.map((creator) => {
              const isFollowing = !!followedIds[creator.id];
              return (
                <View key={creator.id} style={styles.creatorCard}>
                  {/* Creator Header */}
                  <View style={styles.creatorHeader}>
                    <View style={styles.avatarWrap}>
                      <Image source={{ uri: creator.avatar }} style={styles.creatorAvatar} />
                      <View style={styles.levelTag}>
                        <Text style={styles.levelTagText}>LV {creator.level}</Text>
                      </View>
                    </View>

                    <View style={styles.creatorInfoCol}>
                      <Text style={styles.creatorName}>{creator.name}</Text>
                      <Text style={styles.creatorBio} numberOfLines={1}>
                        {creator.bio}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.followBtn,
                        isFollowing && styles.followBtnActive,
                      ]}
                      onPress={() => toggleFollow(creator.id)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.followBtnText}>
                        {isFollowing ? 'Following' : 'Follow'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Horizontal 4-Model Thumbnails */}
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.creatorModelsScroll}
                  >
                    {creator.models.map((cm) => (
                      <View key={cm.id} style={styles.thumbCard}>
                        <Image source={{ uri: cm.image }} style={styles.thumbImg} />
                        {cm.noAms && (
                          <View style={styles.noAmsPill}>
                            <Text style={styles.noAmsPillText}>No AMS</Text>
                          </View>
                        )}
                      </View>
                    ))}
                  </ScrollView>

                  {/* Stats Footer */}
                  <Text style={styles.creatorStats}>
                    {creator.followers} Followers • {creator.likes} Likes
                  </Text>
                </View>
              );
            })}
          </View>
        ) : (
          /* Models Grid View */
          <View style={styles.modelsFeedWrap}>
            {/* Top Promo Banner for 'for_you' */}
            {selectedCat === 'for_you' && (
              <View style={styles.promoBanner}>
                <View style={styles.promoLeft}>
                  <View style={styles.brandRow}>
                    <Ionicons name="cube" size={14} color="#FF6A00" />
                    <Text style={styles.promoBrand}>N-FIL3D Maker</Text>
                  </View>
                  <Text style={styles.promoTitle}>MakerKids Is live!</Text>
                  <TouchableOpacity style={styles.explorePill} activeOpacity={0.8}>
                    <Text style={styles.explorePillText}>Explore Now</Text>
                  </TouchableOpacity>
                </View>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=300&auto=format&fit=crop&q=80',
                  }}
                  style={styles.promoImage}
                />
              </View>
            )}

            {/* 2-Column Masonry Grid */}
            <View style={styles.twoColGrid}>
              {filteredModels.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.modelCard}
                  activeOpacity={0.85}
                  onPress={() => handleModelPress(item)}
                >
                  <View style={styles.modelImgWrapper}>
                    <Image source={{ uri: item.image }} style={styles.modelCardImg} />
                    {item.hasAms && (
                      <View style={styles.amsSquareBadge}>
                        <Ionicons name="grid" size={13} color="#FFFFFF" />
                      </View>
                    )}
                  </View>

                  <View style={styles.cardDetails}>
                    <Text style={styles.modelCardTitle} numberOfLines={2}>
                      {item.title}
                    </Text>

                    <View style={styles.authorRow}>
                      <View style={styles.authorLeft}>
                        <View style={styles.miniAvatar}>
                          <Text style={styles.miniAvatarText}>
                            {item.author.charAt(0)}
                          </Text>
                        </View>
                        <Text style={styles.authorName} numberOfLines={1}>
                          {item.author}
                        </Text>
                        {item.isVerified && (
                          <Ionicons
                            name="checkmark-circle"
                            size={13}
                            color="#34C759"
                            style={{ marginLeft: 3 }}
                          />
                        )}
                      </View>

                      <View style={styles.likesPill}>
                        <Ionicons name="thumbs-up-outline" size={12} color="#8E8E93" />
                        <Text style={styles.likesText}>{item.likes}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* 1-Step Print Modal Sheet */}
      {activeModel && (
        <Modal
          visible={isPrintModalOpen}
          transparent
          animationType="slide"
          onRequestClose={() => setIsPrintModalOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.sheetContainer}>
              <View style={styles.grabberHandle} />

              <View style={styles.sheetHeader}>
                <View>
                  <Text style={styles.sheetTitle}>One-Step Printing</Text>
                  <Text style={styles.sheetSub}>
                    Lowering technical barriers for seamless 3D printing
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setIsPrintModalOpen(false)}>
                  <Ionicons name="close-circle" size={26} color="#8E8E93" />
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
                  <Text style={styles.sliceVal}>NFIL3D N1 / Bambu (LAN)</Text>
                </View>
                <View style={styles.sliceRow}>
                  <Text style={styles.sliceLabel}>Recommended Filament</Text>
                  <Text style={styles.sliceValOrange}>
                    {activeModel.recommendedSpool}
                  </Text>
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
                onPress={confirmOneStepPrint}
              >
                <Ionicons name="paper-plane" size={18} color="#FFFFFF" />
                <Text style={styles.confirmPrintBtnText}>Start Print (+50 Pts)</Text>
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
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: Platform.OS === 'ios' ? 10 : 12,
    paddingBottom: 10,
    backgroundColor: '#F2F2F7',
    gap: 10,
  },
  iconBtn: {
    padding: 4,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(118, 118, 128, 0.12)', // Apple Standard Light Search
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 38,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    color: '#1C1C1E',
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 14,
  },
  catBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(60, 60, 67, 0.12)',
    backgroundColor: '#FFFFFF',
  },
  catScrollContent: {
    paddingHorizontal: 14,
    gap: 18,
  },
  catTabItem: {
    paddingVertical: 10,
    position: 'relative',
  },
  catTabText: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    fontSize: 15,
    color: '#8E8E93',
    fontWeight: '600',
  },
  catTabTextActive: {
    color: '#1C1C1E',
    fontWeight: '700',
  },
  activeIndicatorLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#FF6A00', // NFIL3D Orange brand accent
    borderRadius: 1.5,
  },
  dropdownBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  followingWrap: {
    paddingHorizontal: 14,
    paddingTop: 16,
  },
  emptyFollowBox: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyFollowTitle: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#1C1C1E',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptyFollowSub: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#8E8E93',
    fontSize: 13,
    textAlign: 'center',
  },
  sectionHeaderTitle: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#1C1C1E',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  creatorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  creatorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarWrap: {
    position: 'relative',
    marginRight: 10,
  },
  creatorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  levelTag: {
    position: 'absolute',
    bottom: -2,
    right: -4,
    backgroundColor: '#FF9500',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  levelTagText: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
  },
  creatorInfoCol: {
    flex: 1,
  },
  creatorName: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#1C1C1E',
    fontSize: 15,
    fontWeight: '700',
  },
  creatorBio: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#8E8E93',
    fontSize: 12,
    marginTop: 2,
  },
  followBtn: {
    backgroundColor: '#FF6A00',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 16,
  },
  followBtnActive: {
    backgroundColor: '#E5E5EA',
  },
  followBtnText: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  creatorModelsScroll: {
    gap: 8,
    marginBottom: 10,
  },
  thumbCard: {
    width: 72,
    height: 72,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#E5E5EA',
  },
  thumbImg: {
    width: '100%',
    height: '100%',
  },
  noAmsPill: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: 'rgba(255,59,48,0.9)',
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 3,
  },
  noAmsPillText: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
  },
  creatorStats: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#8E8E93',
    fontSize: 12,
  },
  modelsFeedWrap: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  promoBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  promoLeft: {
    flex: 1,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  promoBrand: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#FF6A00',
    fontSize: 11,
    fontWeight: '700',
  },
  promoTitle: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, -apple-system',
    color: '#1C1C1E',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
  },
  explorePill: {
    backgroundColor: '#FF6A00',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  explorePillText: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  promoImage: {
    width: 80,
    height: 80,
    borderRadius: 14,
  },
  twoColGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modelCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  modelImgWrapper: {
    width: '100%',
    height: 155,
    position: 'relative',
    backgroundColor: '#F2F2F7',
  },
  modelCardImg: {
    width: '100%',
    height: '100%',
  },
  amsSquareBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardDetails: {
    padding: 10,
  },
  modelCardTitle: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#1C1C1E',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 17,
    marginBottom: 8,
  },
  authorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 4,
  },
  miniAvatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF6A00',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  miniAvatarText: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  authorName: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#8E8E93',
    fontSize: 11,
    maxWidth: 70,
  },
  likesPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  likesText: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#8E8E93',
    fontSize: 11,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
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
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, -apple-system',
    fontSize: 18,
    fontWeight: '800',
    color: '#1C1C1E',
  },
  sheetSub: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 11,
    color: '#8E8E93',
    marginTop: 1,
  },
  modalModelImg: {
    width: '100%',
    height: 180,
    borderRadius: 14,
    marginBottom: 12,
  },
  modalModelTitle: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, -apple-system',
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
    borderColor: 'rgba(60, 60, 67, 0.08)',
    marginVertical: 10,
  },
  sliceBoxHeader: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
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
    color: '#8E8E93',
  },
  sliceVal: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    fontSize: 13,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  sliceValOrange: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
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
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
