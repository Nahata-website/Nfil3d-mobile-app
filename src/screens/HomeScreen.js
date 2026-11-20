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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({
  onNavigateToModels,
  onNavigateToStore,
  onOpenNotifications,
  onOpenModelDetails,
}) {
  const [activeCategory, setActiveCategory] = useState('for_you');
  const [searchQuery, setSearchQuery] = useState('');
  const [followedCreators, setFollowedCreators] = useState({});

  const categories = [
    { id: 'for_you', label: 'For You' },
    { id: 'following', label: 'Following' },
    { id: 'trending', label: 'Trending' },
    { id: 'functional', label: 'Functional' },
    { id: 'household', label: 'Household' },
    { id: 'art', label: 'Art' },
  ];

  const popularCreators = [
    {
      id: 'c_layercraft',
      name: 'LayerCraft Studio',
      bio: 'Functional models for everyday life',
      iconColor: '#FF6A00',
      iconBg: '#FFF0E5',
      iconName: 'cube',
      previewModels: [
        {
          id: 'lc_1',
          title: 'Cable Clip Organizer',
          image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
          filament: 'NFIL3D High-Speed PLA+ Orange',
        },
        {
          id: 'lc_2',
          title: 'Honeycomb Pen Stand',
          image: 'https://images.unsplash.com/photo-1581291518655-9523c932deb4?w=400&auto=format&fit=crop&q=80',
          filament: 'NFIL3D Matte Black PLA+',
        },
        {
          id: 'lc_3',
          title: 'Mechanical Gear Box',
          image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&auto=format&fit=crop&q=80',
          filament: 'NFIL3D Carbon Fiber PLA+',
        },
      ],
    },
    {
      id: 'c_miniform',
      name: 'MiniForm Lab',
      bio: 'Playful prints and creative ideas',
      iconColor: '#007AFF',
      iconBg: '#E5F2FF',
      iconName: 'shapes',
      previewModels: [
        {
          id: 'mf_1',
          title: 'Articulated Dragon',
          image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80',
          filament: 'NFIL3D Silk Sky Blue',
        },
        {
          id: 'mf_2',
          title: 'Spiral Geometry Vase',
          image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=400&auto=format&fit=crop&q=80',
          filament: 'NFIL3D Silk Bronze Rainbow',
        },
        {
          id: 'mf_3',
          title: 'Winter Alpine Cottage',
          image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&auto=format&fit=crop&q=80',
          filament: 'NFIL3D High-Gloss White PLA',
        },
      ],
    },
  ];

  const toggleFollow = (creatorId) => {
    setFollowedCreators((prev) => ({
      ...prev,
      [creatorId]: !prev[creatorId],
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header Bar matching Page 5 */}
      <View style={styles.topHeader}>
        <View style={styles.brandLogoRow}>
          <Text style={styles.brandLogoOrange}>NFIL</Text>
          <Text style={styles.brandLogoDark}>3D</Text>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={17} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search models, creators..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity
          style={styles.iconBtn}
          activeOpacity={0.7}
          onPress={onOpenNotifications || (() => Alert.alert('Notifications', 'No unread alerts.'))}
        >
          <Ionicons name="notifications-outline" size={23} color="#FF6A00" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      {/* Horizontal Category Tabs matching Page 5 */}
      <View style={styles.catBarWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catScrollContent}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={styles.catTabItem}
                onPress={() => {
                  setActiveCategory(cat.id);
                  if (cat.id === 'trending' || cat.id === 'functional') {
                    if (onNavigateToModels) onNavigateToModels(cat.id);
                  }
                }}
                activeOpacity={0.7}
              >
                <Text style={[styles.catTabText, isActive && styles.catTabTextActive]}>
                  {cat.label}
                </Text>
                {isActive && <View style={styles.catActiveIndicator} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          style={styles.catChevronBtn}
          onPress={() => {
            if (onNavigateToModels) onNavigateToModels('trending');
          }}
        >
          <Ionicons name="chevron-forward" size={18} color="#8E8E93" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Section Headline */}
        <View style={styles.headlineRow}>
          <Text style={styles.mainTitle}>Discover what makers are creating</Text>
          <Text style={styles.subTitle}>Fresh ideas for your next 3D print</Text>
        </View>

        {/* Featured Hero Banner Card matching Page 5 */}
        <TouchableOpacity
          style={styles.featuredCard}
          activeOpacity={0.9}
          onPress={() => {
            if (onNavigateToModels) onNavigateToModels('trending');
          }}
        >
          <View style={styles.featuredContent}>
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>Featured</Text>
            </View>
            <Text style={styles.featuredTitle}>Made to Inspire</Text>
            <View style={styles.exploreRow}>
              <Text style={styles.exploreText}>Explore Models</Text>
              <Ionicons name="arrow-forward" size={16} color="#FF6A00" />
            </View>
          </View>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1581291518655-9523c932deb4?w=600&auto=format&fit=crop&q=80',
            }}
            style={styles.featuredImage}
            resizeMode="cover"
          />
        </TouchableOpacity>

        {/* Popular Creators Section Header */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Popular Creators</Text>
          <TouchableOpacity
            onPress={() => {
              if (onNavigateToModels) onNavigateToModels('following');
            }}
          >
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Creators List */}
        {popularCreators.map((creator) => {
          const isFollowed = followedCreators[creator.id];
          return (
            <View key={creator.id} style={styles.creatorCard}>
              {/* Creator Header */}
              <View style={styles.creatorHeader}>
                <View style={[styles.creatorAvatar, { backgroundColor: creator.iconBg }]}>
                  <Ionicons name={creator.iconName} size={22} color={creator.iconColor} />
                </View>
                <View style={styles.creatorInfo}>
                  <Text style={styles.creatorName}>{creator.name}</Text>
                  <Text style={styles.creatorBio}>{creator.bio}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.followBtn, isFollowed && styles.followBtnActive]}
                  onPress={() => toggleFollow(creator.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.followBtnText, isFollowed && styles.followBtnTextActive]}>
                    {isFollowed ? 'Following' : 'Follow'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* 3 Model Preview Thumbnails */}
              <View style={styles.previewGrid}>
                {creator.previewModels.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.previewItem}
                    activeOpacity={0.85}
                    onPress={() => {
                      if (onOpenModelDetails) onOpenModelDetails(item);
                      else if (onNavigateToModels) onNavigateToModels('for_you');
                    }}
                  >
                    <Image source={{ uri: item.image }} style={styles.previewImage} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}

        {/* Quick Official Store Discovery Strip */}
        <TouchableOpacity
          style={styles.storeStripCard}
          activeOpacity={0.9}
          onPress={onNavigateToStore}
        >
          <View style={styles.storeStripIconWrap}>
            <Ionicons name="bag-handle" size={24} color="#FF6A00" />
          </View>
          <View style={styles.storeStripTextWrap}>
            <Text style={styles.storeStripTitle}>Need Filament for Printing?</Text>
            <Text style={styles.storeStripSub}>Get 100% Genuine NFIL3D Spools with fast dispatch</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#FF6A00" />
        </TouchableOpacity>

        <View style={{ height: 110 }} />
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    gap: 12,
  },
  brandLogoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  brandLogoOrange: {
    fontSize: 22,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '900',
    color: '#FF6A00',
    letterSpacing: -0.5,
  },
  brandLogoDark: {
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
    backgroundColor: '#F2F2F7',
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
    fontWeight: '500',
    color: '#8E8E93',
  },
  catTabTextActive: {
    color: '#FF6A00',
    fontWeight: '700',
    fontFamily: 'SF-Pro-Bold',
  },
  catActiveIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#FF6A00',
    borderRadius: 1.5,
  },
  catChevronBtn: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#F2F2F7',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headlineRow: {
    marginBottom: 14,
  },
  mainTitle: {
    fontSize: 22,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '800',
    color: '#1C1C1E',
    letterSpacing: -0.4,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    marginTop: 3,
  },
  featuredCard: {
    backgroundColor: '#FFF7F0',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FFE0CC',
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  featuredContent: {
    padding: 16,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF6A00',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  featuredBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
  },
  featuredTitle: {
    fontSize: 24,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '800',
    color: '#1C1C1E',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  exploreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  exploreText: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
    color: '#FF6A00',
  },
  featuredImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#FFE9DC',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '700',
    color: '#1C1C1E',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Bold',
    color: '#FF6A00',
    fontWeight: '600',
  },
  creatorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    elevation: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  creatorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  creatorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  creatorInfo: {
    flex: 1,
  },
  creatorName: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '700',
    color: '#1C1C1E',
  },
  creatorBio: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    marginTop: 2,
  },
  followBtn: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#FF6A00',
    backgroundColor: '#FFFFFF',
  },
  followBtnActive: {
    backgroundColor: '#FF6A00',
  },
  followBtnText: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
    color: '#FF6A00',
  },
  followBtnTextActive: {
    color: '#FFFFFF',
  },
  previewGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  previewItem: {
    flex: 1,
    height: 90,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F2F2F7',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  storeStripCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    gap: 12,
  },
  storeStripIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF0E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeStripTextWrap: {
    flex: 1,
  },
  storeStripTitle: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
    color: '#1C1C1E',
  },
  storeStripSub: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    marginTop: 2,
  },
});
