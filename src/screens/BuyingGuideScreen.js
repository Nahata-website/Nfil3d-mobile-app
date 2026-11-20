import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MATERIALS_GUIDE } from '../data/nfil3dData';

export default function BuyingGuideScreen({ onSelectProduct }) {
  const [activeTab, setActiveTab] = useState('wizard'); // 'wizard' | 'compare' | 'pens'

  // Wizard state
  const [useCase, setUseCase] = useState('everyday');
  const [enclosure, setEnclosure] = useState('open');
  const [priority, setPriority] = useState('ease');

  const getRecommendation = () => {
    if (useCase === 'flexible') {
      return {
        material: 'NFIL3D Ultra-Flexible TPU 95A',
        matchScore: '99% Match',
        reason: 'Engineered for shock absorption, bending, phone cases, and rubber-like parts.',
        nozzleTemp: '210°C - 235°C',
        bedTemp: '40°C - 60°C',
        proTip: 'Print slowly (20-30 mm/s) with direct-drive extruder.',
      };
    }
    if (useCase === 'highTemp' || useCase === 'outdoor') {
      if (enclosure === 'enclosed') {
        return {
          material: 'NFIL3D HI ABS+ / ASA',
          matchScore: '98% Match',
          reason: 'Withstands up to 95°C and UV sunlight. Perfect for automotive and outdoor functional parts.',
          nozzleTemp: '240°C - 265°C',
          bedTemp: '95°C - 110°C',
          proTip: 'Your enclosed printer will prevent corner warping.',
        };
      }
      return {
        material: 'NFIL3D High-Strength PETG',
        matchScore: '96% Match',
        reason: 'Weatherproof, heat resistant up to 75°C, and prints easily without an enclosure.',
        nozzleTemp: '225°C - 250°C',
        bedTemp: '70°C - 85°C',
        proTip: 'Keep bed clean with Isopropyl alcohol for perfect bed adhesion.',
      };
    }
    if (priority === 'stiff') {
      return {
        material: 'NFIL3D Carbon Fiber Infused PLA',
        matchScore: '97% Match',
        reason: 'Chopped carbon fibers provide extreme dimensional rigidity with a matte texture.',
        nozzleTemp: '215°C - 240°C',
        bedTemp: '55°C - 65°C',
        proTip: 'Use a hardened steel nozzle to avoid wear on brass.',
      };
    }
    return {
      material: 'NFIL3D Turbo-Finish PLA+',
      matchScore: '100% Match',
      reason: 'Easiest to print, zero odor, fast speed up to 600mm/s, and excellent smooth surface quality.',
      nozzleTemp: '190°C - 225°C',
      bedTemp: '50°C - 60°C',
      proTip: 'Free universal filament filter included in the box keeps dust off your nozzle.',
    };
  };

  const rec = getRecommendation();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Apple Header with NFIL3D Typography */}
      <View style={styles.navHeader}>
        <Text style={styles.largeTitle}>Buying Guide</Text>
        <Text style={styles.subTitleCaption}>Material Intelligence & Selector</Text>

        {/* Apple Segmented Control */}
        <View style={styles.segmentedControl}>
          {[
            { id: 'wizard', label: 'Finder' },
            { id: 'compare', label: 'Matrix' },
            { id: 'pens', label: '3D Pens' },
          ].map((seg) => {
            const isActive = activeTab === seg.id;
            return (
              <TouchableOpacity
                key={seg.id}
                style={[styles.segmentItem, isActive && styles.segmentItemActive]}
                onPress={() => setActiveTab(seg.id)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.segmentText,
                    isActive && styles.segmentTextActive,
                  ]}
                >
                  {seg.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {/* --- TAB 1: SMART FILAMENT WIZARD --- */}
        {activeTab === 'wizard' && (
          <View>
            {/* Q1: Use Case */}
            <View style={styles.insetCard}>
              <Text style={styles.cardSectionLabel}>1. WHAT ARE YOU BUILDING?</Text>
              <View style={styles.optionsWrap}>
                {[
                  { id: 'everyday', label: 'Everyday / Toys / Figurines', icon: 'cube-outline' },
                  { id: 'mechanical', label: 'Mechanical & Structural Parts', icon: 'construct-outline' },
                  { id: 'flexible', label: 'Flexible Grips / Phone Cases', icon: 'shield-outline' },
                  { id: 'outdoor', label: 'Outdoor / Weather Exposed', icon: 'sunny-outline' },
                  { id: 'highTemp', label: 'Automotive / High Heat (>80°C)', icon: 'flame-outline' },
                ].map((opt) => {
                  const isPicked = useCase === opt.id;
                  return (
                    <TouchableOpacity
                      key={opt.id}
                      style={[styles.optionRow, isPicked && styles.optionRowPicked]}
                      onPress={() => setUseCase(opt.id)}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={opt.icon}
                        size={18}
                        color={isPicked ? '#FF6A00' : '#8E8E93'}
                      />
                      <Text
                        style={[
                          styles.optionRowText,
                          isPicked && styles.optionRowTextPicked,
                        ]}
                      >
                        {opt.label}
                      </Text>
                      {isPicked && (
                        <Ionicons
                          name="checkmark"
                          size={18}
                          color="#FF6A00"
                          style={{ marginLeft: 'auto' }}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Q2: Enclosure */}
            <View style={styles.insetCard}>
              <Text style={styles.cardSectionLabel}>2. PRINTER ENCLOSURE</Text>
              <View style={styles.optionsWrap}>
                {[
                  { id: 'open', label: 'Open Frame (Ender 3, A1 Mini, etc.)' },
                  { id: 'enclosed', label: 'Enclosed (P1S, X1C, Voron, etc.)' },
                ].map((opt) => {
                  const isPicked = enclosure === opt.id;
                  return (
                    <TouchableOpacity
                      key={opt.id}
                      style={[styles.optionRow, isPicked && styles.optionRowPicked]}
                      onPress={() => setEnclosure(opt.id)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.optionRowText,
                          isPicked && styles.optionRowTextPicked,
                        ]}
                      >
                        {opt.label}
                      </Text>
                      {isPicked && (
                        <Ionicons
                          name="checkmark"
                          size={18}
                          color="#FF6A00"
                          style={{ marginLeft: 'auto' }}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Recommendation Result Card (Apple Highlight Card) */}
            <View style={styles.appleRecommendationCard}>
              <View style={styles.recHeaderRow}>
                <View style={styles.matchScorePill}>
                  <Text style={styles.matchScoreText}>{rec.matchScore}</Text>
                </View>
                <Text style={styles.recTopLabel}>BEST NFIL3D MATCH</Text>
              </View>

              <Text style={styles.recMatTitle}>{rec.material}</Text>
              <Text style={styles.recReasonText}>{rec.reason}</Text>

              <View style={styles.specsGlassRow}>
                <View style={styles.specColumn}>
                  <Text style={styles.specSmallLabel}>Nozzle Temp</Text>
                  <Text style={styles.specBigValue}>{rec.nozzleTemp}</Text>
                </View>
                <View style={styles.specDivider} />
                <View style={styles.specColumn}>
                  <Text style={styles.specSmallLabel}>Bed Temp</Text>
                  <Text style={styles.specBigValue}>{rec.bedTemp}</Text>
                </View>
              </View>

              <View style={styles.proTipRow}>
                <Ionicons name="sparkles" size={14} color="#FF9500" />
                <Text style={styles.proTipMsg}>{rec.proTip}</Text>
              </View>
            </View>
          </View>
        )}

        {/* --- TAB 2: MATERIAL COMPARISON MATRIX --- */}
        {activeTab === 'compare' && (
          <View>
            {MATERIALS_GUIDE.map((mat, i) => (
              <View key={i} style={styles.insetCard}>
                <Text style={styles.matCardTitle}>{mat.name}</Text>
                <Text style={styles.matCardSubtitle}>{mat.tagline}</Text>

                <View style={styles.appleTable}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>Ease of Print</Text>
                    <Text style={styles.tableValue}>{mat.easeOfPrint}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>Mechanical Strength</Text>
                    <Text style={styles.tableValue}>{mat.strength}</Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableLabel}>Flexibility</Text>
                    <Text style={styles.tableValue}>{mat.flexibility}</Text>
                  </View>
                  <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
                    <Text style={styles.tableLabel}>Heat Deflection</Text>
                    <Text style={styles.tableValue}>{mat.heatResistance}</Text>
                  </View>
                </View>

                <View style={styles.usageGuideBox}>
                  <Text style={styles.bestForLabel}>
                    <Text style={{ fontWeight: '700', color: '#34C759' }}>Best for: </Text>
                    {mat.bestFor}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* --- TAB 3: 3D PEN STARTER GUIDE --- */}
        {activeTab === 'pens' && (
          <View>
            {[
              {
                title: '1. Transparent Stencil Technique',
                body: 'Place a clear PVC heat-resistant sheet on top of 2D stencils. Draw each piece flat, wait 5 seconds to solidify, then weld corners together.',
              },
              {
                title: '2. Speed Control Precision',
                body: 'Use slow speed (1-2) for upward vertical drawing in air. Use fast speed (4-6) to fill large surface planes quickly.',
              },
              {
                title: '3. Filament Safety (PCL vs PLA)',
                body: 'PCL melts at low temp (60-70°C) - safe for young kids. PLA operates at 190°C for rigid display structures.',
              },
            ].map((tip, idx) => (
              <View key={idx} style={styles.insetCard}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipBody}>{tip.body}</Text>
              </View>
            ))}
          </View>
        )}
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
    fontWeight: '500',
    marginTop: 1,
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    borderRadius: 9,
    padding: 2,
    height: 32,
  },
  segmentItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  segmentItemActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
  },
  segmentText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  segmentTextActive: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontWeight: '700',
    color: '#FF6A00',
  },
  container: {
    padding: 16,
    paddingBottom: 36,
  },
  insetCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  cardSectionLabel: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 11,
    fontWeight: '700',
    color: '#8E8E93',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  optionsWrap: {
    gap: 6,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#F2F2F7',
  },
  optionRowPicked: {
    backgroundColor: 'rgba(255, 106, 0, 0.12)',
  },
  optionRowText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    color: '#1C1C1E',
    marginLeft: 10,
    fontWeight: '500',
  },
  optionRowTextPicked: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FF6A00',
    fontWeight: '700',
  },
  appleRecommendationCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    padding: 18,
    marginTop: 6,
  },
  recHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  matchScorePill: {
    backgroundColor: '#FF6A00', // NFIL3D Orange
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 8,
  },
  matchScoreText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  recTopLabel: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#8E8E93',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  recMatTitle: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  recReasonText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    color: '#AEAEC2',
    lineHeight: 18,
    marginBottom: 14,
  },
  specsGlassRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  specColumn: {
    flex: 1,
  },
  specSmallLabel: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 11,
    color: '#8E8E93',
  },
  specBigValue: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 2,
  },
  specDivider: {
    width: 0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginHorizontal: 12,
  },
  proTipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  proTipMsg: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 12,
    color: '#FF9500',
    flex: 1,
    lineHeight: 16,
  },
  matCardTitle: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 17,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  matCardSubtitle: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
    marginBottom: 10,
  },
  appleTable: {
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(60, 60, 67, 0.1)',
  },
  tableLabel: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    color: '#3A3A3C',
  },
  tableValue: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 13,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  usageGuideBox: {
    paddingTop: 2,
  },
  bestForLabel: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 12,
    color: '#3A3A3C',
    lineHeight: 17,
  },
  tipTitle: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  tipBody: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    color: '#3A3A3C',
    lineHeight: 18,
  },
});
