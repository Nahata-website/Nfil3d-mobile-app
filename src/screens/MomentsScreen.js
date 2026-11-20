import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TIMELAPSE_MOMENTS = [
  {
    id: 't1',
    author: 'Vikram Mehta',
    modelName: 'Cyberpunk Helmet 1:1 Scale',
    printTime: '18h 45m',
    filamentUsed: 'NFIL3D Carbon Fiber PLA+ Black',
    spoolWeight: '680g',
    likes: 428,
    comments: 52,
    videoThumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
    caption: 'Automatic chamber timelapse recorded by N1! The carbon fiber matte finish is immaculate. Zero warping with recommended bed temp.',
  },
  {
    id: 't2',
    author: 'Pooja Verma',
    modelName: 'Silk Rainbow Spiral Vase',
    printTime: '3h 10m',
    filamentUsed: 'NFIL3D HS PLA+ Bright Rainbow',
    spoolWeight: '94g',
    likes: 812,
    comments: 94,
    videoThumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80',
    caption: 'Vase mode at 0.8mm extrusion width. The gradual color transition on this spool is magical! ✨',
  },
];

export default function MomentsScreen() {
  const handleShare = (moment) => {
    Alert.alert(
      'Share Printing Moment',
      `Exporting 1080p Timelapse video for "${moment.modelName}". Ready to share on Instagram, WhatsApp, or MakerWorld community!`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navHeader}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.largeTitle}>Moments</Text>
            <Text style={styles.subTitleCaption}>Automatic Timelapse Videos & Community</Text>
          </View>
          <TouchableOpacity
            style={styles.recordBtn}
            onPress={() => Alert.alert('New Timelapse', 'Auto-recording is linked to your current active print job in the Control tab.')}
          >
            <Ionicons name="videocam" size={16} color="#FFFFFF" />
            <Text style={styles.recordBtnText}>Timelapse</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {TIMELAPSE_MOMENTS.map((item) => (
          <View key={item.id} style={styles.momentCard}>
            {/* Author Row */}
            <View style={styles.authorRow}>
              <View style={styles.avatarPill}>
                <Text style={styles.avatarInitial}>{item.author.charAt(0)}</Text>
              </View>
              <View>
                <Text style={styles.authorName}>{item.author}</Text>
                <Text style={styles.printTimeSub}>Printed in {item.printTime}</Text>
              </View>
              <View style={styles.badgeTimelapsePill}>
                <Ionicons name="play" size={10} color="#FF6A00" />
                <Text style={styles.badgeTimelapseText}>Timelapse</Text>
              </View>
            </View>

            {/* Video Thumbnail */}
            <View style={styles.videoThumbnailWrapper}>
              <Image source={{ uri: item.videoThumbnail }} style={styles.thumbnailImg} />
              <View style={styles.playButtonOverlay}>
                <Ionicons name="play" size={28} color="#FFFFFF" />
              </View>
              <View style={styles.timelapseDurationBadge}>
                <Text style={styles.timelapseDurationText}>0:24 HD</Text>
              </View>
            </View>

            {/* Model & Spool Info Box */}
            <View style={styles.spoolInfoBox}>
              <View style={styles.spoolBadgeRow}>
                <Ionicons name="color-palette" size={14} color="#FF6A00" />
                <Text style={styles.spoolBadgeText}>{item.filamentUsed}</Text>
                <Text style={styles.weightText}>• {item.spoolWeight}</Text>
              </View>
              <Text style={styles.captionText}>{item.caption}</Text>
            </View>

            {/* Interactions Bar */}
            <View style={styles.interactionBar}>
              <TouchableOpacity style={styles.interactBtn}>
                <Ionicons name="heart-outline" size={20} color="#1C1C1E" />
                <Text style={styles.interactText}>{item.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.interactBtn}>
                <Ionicons name="chatbubble-outline" size={19} color="#1C1C1E" />
                <Text style={styles.interactText}>{item.comments}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.interactBtn, { marginLeft: 'auto' }]}
                onPress={() => handleShare(item)}
              >
                <Ionicons name="share-outline" size={20} color="#FF6A00" />
                <Text style={[styles.interactText, { color: '#FF6A00', fontWeight: '700' }]}>
                  Share
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  largeTitle: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 28,
    fontWeight: '800',
    color: '#1C1C1E',
    letterSpacing: -0.6,
  },
  subTitleCaption: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 1,
  },
  recordBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6A00',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    gap: 4,
  },
  recordBtnText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  container: {
    padding: 16,
    paddingBottom: 36,
  },
  momentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatarPill: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 106, 0, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarInitial: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FF6A00',
    fontSize: 15,
    fontWeight: '800',
  },
  authorName: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 13,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  printTimeSub: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 11,
    color: '#8E8E93',
  },
  badgeTimelapsePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 106, 0, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginLeft: 'auto',
    gap: 3,
  },
  badgeTimelapseText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FF6A00',
    fontSize: 10,
    fontWeight: '700',
  },
  videoThumbnailWrapper: {
    position: 'relative',
    width: '100%',
    height: 200,
    backgroundColor: '#1C1C1E',
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
  },
  playButtonOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -24 }, { translateY: -24 }],
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelapseDurationBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
  },
  timelapseDurationText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  spoolInfoBox: {
    padding: 12,
  },
  spoolBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: 'flex-start',
    gap: 5,
    marginBottom: 8,
  },
  spoolBadgeText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 11,
    color: '#1C1C1E',
    fontWeight: '600',
  },
  weightText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 11,
    color: '#8E8E93',
  },
  captionText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    color: '#3A3A3C',
    lineHeight: 18,
  },
  interactionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5EA',
    gap: 16,
  },
  interactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  interactText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 12,
    color: '#3A3A3C',
    fontWeight: '500',
  },
});
