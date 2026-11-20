import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';

export default function SplashScreen({ onFinish }) {
  const exitFade = useRef(new Animated.Value(1)).current;
  const hasFinishedRef = useRef(false);

  const handleFinish = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    Animated.timing(exitFade, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      if (onFinish) onFinish();
    });
  };

  useEffect(() => {
    // Safety fallback: auto-advance after 5 seconds if video playback is delayed
    const timer = setTimeout(() => {
      handleFinish();
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  const videoSource = require('../../assets/video/splash.mp4');

  return (
    <Animated.View style={[styles.splashContainer, { opacity: exitFade }]}>
      <SafeAreaView style={styles.safeArea}>
        {/* Skip button in top-right */}
        <TouchableOpacity
          style={styles.skipButton}
          activeOpacity={0.8}
          onPress={handleFinish}
        >
          <Text style={styles.skipText}>Skip</Text>
          <Ionicons name="chevron-forward" size={14} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Video Player (Web uses HTML5 video for guaranteed instant autoplay; Native uses expo-av) */}
        <View style={styles.videoWrapper}>
          {Platform.OS === 'web' ? (
            <video
              src={videoSource}
              autoPlay
              muted
              playsInline
              onEnded={handleFinish}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                backgroundColor: '#000000',
              }}
            />
          ) : (
            <Video
              source={videoSource}
              rate={1.0}
              volume={1.0}
              isMuted={true}
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay
              isLooping={false}
              onPlaybackStatusUpdate={(status) => {
                if (status.didJustFinish) {
                  handleFinish();
                }
              }}
              style={styles.nativeVideo}
            />
          )}
        </View>

        {/* Bottom Tagline */}
        <View style={styles.bottomBrand}>
          <Text style={styles.brandTitle}>N-FIL3D</Text>
          <Text style={styles.brandSub}>Precision Polymers & 3D Printing Ecosystem</Text>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    zIndex: 99999,
  },
  safeArea: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    right: 20,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  skipText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  videoWrapper: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  nativeVideo: {
    width: '100%',
    height: '100%',
  },
  bottomBrand: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 36 : 20,
    alignItems: 'center',
  },
  brandTitle: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  brandSub: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#8E8E93',
    fontSize: 11,
    marginTop: 2,
  },
});
