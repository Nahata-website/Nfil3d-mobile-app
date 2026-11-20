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
  const [selectedCat, setSelectedCat] = useState('for_you'); // 'for_you' | 'trending' | 'following' | 'household'
  const [search, setSearch] = useState('');
  const [followedIds, setFollowedIds] = useState({});
  const [bookmarkedIds, setBookmarkedIds] = useState({});
  const [likedIds, setLikedIds] = useState({});
  const [activeModel, setActiveModel] = useState(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const toggleFollow = (creatorId) => {
    setFollowedIds((prev) => ({
      ...prev,
      [creatorId]: !prev[creatorId],
    }));
  };

  const toggleBookmark = (modelId) => {
    setBookmarkedIds((prev) => ({
      ...prev,
      [modelId]: !prev[modelId],
    }));
  };

  const toggleLike = (modelId) => {
    setLikedIds((prev) => ({
      ...prev,
      [modelId]: !prev[modelId],
    }));
  };

  const handleModelPress = (model) => {
    setActiveModel(model);
    setIsPrintModalOpen(true);
  };

  const confirmOneStepPrint = () => {
    setIsPrintModalOpen(false);
    Alert.alert(
      '🚀 1-Step Print Dispatched!',
      `Auto-sliced model sent to NFIL3D N1 High-Speed Printer.\nBed & nozzle heating initiated.\nChamber Liveview is now active!`
    );
    if (onStartPrintJob) onStartPrintJob();
  };

  const modelsList = CATEGORY_MODELS[selectedCat] || CATEGORY_MODELS['for_you'];
  const filteredModels = modelsList.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header Bar matching Page 6 & 10 */}
      <View style={styles.topHeader}>
        <View style={styles.brandRow}>
          <Text style={styles.brandOrange}>NFIL</Text>
          <Text style={styles.brandDark}>3D</Text>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={17} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search 3D Models"
            placeholderTextColor="#8E8E93"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TouchableOpacity
          style={styles.iconBtn}
          activeOpacity={0.7}
          onPress={() => Alert.alert('Notifications', 'No unread 3D model alerts.')}
        >
          <Ionicons name="notifications-outline" size={22} color="#FF6A00" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      {/* Horizontal Category Subtabs matching Page 6 & 10 */}
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
          <Ionicons name="chevron-forward" size={16} color="#8E8E93" />
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
                      <Text style={[styles.followBtnText, isFollowing && styles.followBtnTextActive]}>
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
          /* Models Grid View (Page 6: Trending, Page 10: For You) */
          <View style={styles.modelsFeedWrap}>
            {/* Top Promo Banner matching Page 10 */}
            {selectedCat === 'for_you' && (
              <View style={styles.promoBanner}>
                <View style={styles.promoLeft}>
                  <Text style={styles.bannerSubBrand}>NFIL3D</Text>
                  <Text style={styles.promoTitle}>Create. Share.{'\n'}Inspire.</Text>
                  <TouchableOpacity
                    style={styles.explorePill}
                    activeOpacity={0.85}
                    onPress={() => setSelectedCat('trending')}
                  >
                    <Text style={styles.explorePillText}>Explore Now ➔</Text>
                  </TouchableOpacity>
                </View>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop&q=80',
                  }}
                  style={styles.promoImage}
                  resizeMode="contain"
                />
              </View>
            )}

            {/* 2-Column Grid matching Page 6 & 10 */}
            <View style={styles.twoColGrid}>
              {filteredModels.map((item) => {
                const isBookmarked = !!bookmarkedIds[item.id];
                const isLiked = !!likedIds[item.id];

                return (
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
                          <Text style={styles.amsBadgeText}>AMS</Text>
                        </View>
                      )}
                    </View>

                    <View style={styles.cardDetails}>
                      <Text style={styles.modelCardTitle} numberOfLines={1}>
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
                        </View>

                        {/* Bookmark and Heart Icons matching Page 6 & 10 */}
                        <View style={styles.cardActions}>
                          <TouchableOpacity
                            onPress={() => toggleBookmark(item.id)}
                            style={styles.actionIconBtn}
                          >
                            <Ionicons
                              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                              size={16}
                              color={isBookmarked ? '#FF6A00' : '#8E8E93'}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => toggleLike(item.id)}
                            style={styles.actionIconBtn}
                          >
                            <Ionicons
                              name={isLiked ? 'heart' : 'heart-outline'}
                              size={16}
                              color={isLiked ? '#FF3B30' : '#8E8E93'}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* 1-Step Print & Model Details Modal Sheet */}
      {activeModel && (
        <Modal
          visible={isPrintModalOpen}
          transparent
          animationType="slide"
          onRequestClose={() => setIsPrintModalOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.printSheetContainer}>
              <View style={styles.sheetHeader}>
                <View style={styles.sheetGrabber} />
                <TouchableOpacity
                  onPress={() => setIsPrintModalOpen(false)}
                  style={styles.sheetCloseBtn}
                >
                  <Ionicons name="close" size={24} color="#8E8E93" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} style={styles.sheetScroll}>
                <Image
                  source={{ uri: activeModel.image }}
                  style={styles.sheetHeroImg}
                  resizeMode="cover"
                />

                <Text style={styles.sheetTitle}>{activeModel.title}</Text>
                <Text style={styles.sheetAuthor}>By {activeModel.author}</Text>

                <View style={styles.specsRow}>
                  <View style={styles.specBox}>
                    <Ionicons name="time-outline" size={16} color="#FF6A00" />
                    <Text style={styles.specVal}>{activeModel.printTime}</Text>
                    <Text style={styles.specKey}>Print Time</Text>
                  </View>
                  <View style={styles.specBox}>
                    <Ionicons name="scale-outline" size={16} color="#FF6A00" />
                    <Text style={styles.specVal}>{activeModel.filamentWeight}</Text>
                    <Text style={styles.specKey}>Filament</Text>
                  </View>
                  <View style={styles.specBox}>
                    <Ionicons name="layers-outline" size={16} color="#FF6A00" />
                    <Text style={styles.specVal}>0.20mm</Text>
                    <Text style={styles.specKey}>Layer Height</Text>
                  </View>
                </View>

                {/* Slicing & Filament Recommendation */}
                <View style={styles.recommendedSpoolCard}>
                  <View style={styles.spoolIconCircle}>
                    <Ionicons name="disc" size={24} color="#FF6A00" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.spoolCardTitle}>Recommended Filament</Text>
                    <Text style={styles.spoolCardName}>{activeModel.recommendedSpool}</Text>
                  </View>
                </View>

                <Text style={styles.sheetDesc}>{activeModel.description}</Text>

                <TouchableOpacity
                  style={styles.oneStepPrintBtn}
                  activeOpacity={0.85}
                  onPress={confirmOneStepPrint}
                >
                  <Ionicons name="flash" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
                  <Text style={styles.oneStepPrintText}>1-Step Print to NFIL3D N1</Text>
                </TouchableOpacity>
              </ScrollView>
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
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    gap: 12,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  brandOrange: {
    fontSize: 22,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '900',
    color: '#FF6A00',
    letterSpacing: -0.5,
  },
  brandDark: {
    fontSize: 22,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '900',
    color: '#1C1C1E',
    letterSpacing: -0.5,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 18,
    paddingHorizontal: 12,
    height: 38,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'SF-Pro-Regular',
    color: '#1C1C1E',
    paddingVertical: 0,
    outlineStyle: 'none',
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFF0E5',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#FF3B30',
  },
  catBarWrapper: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    flexDirection: 'row',
    alignItems: 'center',
  },
  catScrollContent: {
    paddingHorizontal: 16,
    gap: 22,
  },
  catTabItem: {
    paddingVertical: 12,
    alignItems: 'center',
    position: 'relative',
  },
  catTabText: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    fontWeight: '500',
  },
  catTabTextActive: {
    color: '#FF6A00',
    fontWeight: '700',
    fontFamily: 'SF-Pro-Bold',
  },
  activeIndicatorLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#FF6A00',
    borderRadius: 1.5,
  },
  dropdownBtn: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#F2F2F7',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  promoBanner: {
    flexDirection: 'row',
    backgroundColor: '#FFF5EB',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFE0CC',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promoLeft: {
    flex: 1,
  },
  bannerSubBrand: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '800',
    color: '#FF6A00',
    marginBottom: 2,
  },
  promoTitle: {
    fontSize: 20,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '800',
    color: '#1C1C1E',
    lineHeight: 24,
    marginBottom: 10,
  },
  explorePill: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF6A00',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  explorePillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
  },
  promoImage: {
    width: 110,
    height: 95,
  },
  twoColGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  modelCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginBottom: 4,
    elevation: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  modelImgWrapper: {
    width: '100%',
    height: 150,
    backgroundColor: '#F8F9FA',
    position: 'relative',
  },
  modelCardImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  amsSquareBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  amsBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  cardDetails: {
    padding: 10,
  },
  modelCardTitle: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 6,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  authorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 4,
  },
  miniAvatar: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFF0E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniAvatarText: {
    fontSize: 9,
    fontFamily: 'SF-Pro-Bold',
    color: '#FF6A00',
  },
  authorName: {
    fontSize: 11,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    maxWidth: 70,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 6,
  },
  actionIconBtn: {
    padding: 2,
  },

  // FOLLOWING TAB
  followingWrap: {},
  emptyFollowBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  emptyFollowTitle: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
    color: '#1C1C1E',
  },
  emptyFollowSub: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 4,
  },
  sectionHeaderTitle: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  creatorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  creatorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    bottom: -4,
    right: -4,
    backgroundColor: '#FF6A00',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  levelTagText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
  },
  creatorInfoCol: {
    flex: 1,
  },
  creatorName: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
    color: '#1C1C1E',
  },
  creatorBio: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
  },
  followBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#FF6A00',
    backgroundColor: '#FFFFFF',
  },
  followBtnActive: {
    backgroundColor: '#FF6A00',
  },
  followBtnText: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
    color: '#FF6A00',
  },
  followBtnTextActive: {
    color: '#FFFFFF',
  },
  creatorModelsScroll: {
    gap: 8,
    paddingVertical: 6,
  },
  thumbCard: {
    width: 76,
    height: 76,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#F2F2F7',
    position: 'relative',
  },
  thumbImg: {
    width: '100%',
    height: '100%',
  },
  noAmsPill: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  noAmsPillText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
  },
  creatorStats: {
    fontSize: 11,
    color: '#8E8E93',
    marginTop: 6,
  },

  // 1-STEP PRINT SHEET
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  printSheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    maxHeight: '88%',
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sheetGrabber: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#E5E5EA',
    alignSelf: 'center',
  },
  sheetCloseBtn: {
    padding: 4,
  },
  sheetScroll: {
    paddingBottom: 20,
  },
  sheetHeroImg: {
    width: '100%',
    height: 200,
    borderRadius: 18,
    marginBottom: 14,
  },
  sheetTitle: {
    fontSize: 20,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '800',
    color: '#1C1C1E',
  },
  sheetAuthor: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    marginTop: 2,
    marginBottom: 14,
  },
  specsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  specBox: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 14,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  specVal: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
    color: '#1C1C1E',
    marginTop: 4,
  },
  specKey: {
    fontSize: 10,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    marginTop: 2,
  },
  recommendedSpoolCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0E5',
    borderRadius: 16,
    padding: 12,
    gap: 12,
    marginBottom: 14,
  },
  spoolIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spoolCardTitle: {
    fontSize: 11,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
  },
  spoolCardName: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
    color: '#1C1C1E',
  },
  sheetDesc: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Regular',
    color: '#3A3A3C',
    lineHeight: 18,
    marginBottom: 18,
  },
  oneStepPrintBtn: {
    backgroundColor: '#FF6A00',
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#FF6A00',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  oneStepPrintText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
  },
});
