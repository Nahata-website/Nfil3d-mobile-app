import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TROUBLESHOOTING_GUIDE, MATERIALS_GUIDE } from '../data/nfil3dData';

export default function PrintHubScreen() {
  const [activeSection, setActiveSection] = useState('calc'); // 'calc' | 'temps' | 'fixes'

  // Calculator State
  const [printGrams, setPrintGrams] = useState('45');
  const [spoolPrice, setSpoolPrice] = useState('899');
  const [spoolWeightGrams, setSpoolWeightGrams] = useState('1000');

  const grams = parseFloat(printGrams) || 0;
  const price = parseFloat(spoolPrice) || 0;
  const totalWeight = parseFloat(spoolWeightGrams) || 1000;

  const costPerGram = price / (totalWeight || 1);
  const totalCost = (grams * costPerGram).toFixed(2);
  const totalPrintsPossible = grams > 0 ? Math.floor(totalWeight / grams) : 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Apple Header */}
      <View style={styles.navHeader}>
        <Text style={styles.largeTitle}>Print Hub</Text>
        <Text style={styles.subTitleCaption}>Maker Tools & Troubleshooting</Text>

        {/* Apple Segmented Control */}
        <View style={styles.segmentedControl}>
          {[
            { id: 'calc', label: 'Calculator' },
            { id: 'temps', label: 'Temperatures' },
            { id: 'fixes', label: 'Troubleshoot' },
          ].map((seg) => {
            const isActive = activeSection === seg.id;
            return (
              <TouchableOpacity
                key={seg.id}
                style={[styles.segmentItem, isActive && styles.segmentItemActive]}
                onPress={() => setActiveSection(seg.id)}
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
        {/* --- SECTION 1: SPOOL COST & USAGE CALCULATOR --- */}
        {activeSection === 'calc' && (
          <View>
            <View style={styles.heroResultCard}>
              <Text style={styles.heroSubTitle}>ESTIMATED PRINT COST</Text>
              <Text style={styles.heroHugeCost}>₹{totalCost}</Text>
              <Text style={styles.heroPerGramText}>
                Based on ₹{costPerGram.toFixed(2)} per gram
              </Text>

              <View style={styles.heroDivider} />

              <View style={styles.heroBottomRow}>
                <View>
                  <Text style={styles.heroStatLabel}>Models from 1 Spool</Text>
                  <Text style={styles.heroStatValue}>~{totalPrintsPossible} prints</Text>
                </View>
                <View style={styles.badgePill}>
                  <Text style={styles.badgePillText}>{spoolWeightGrams}g Spool</Text>
                </View>
              </View>
            </View>

            {/* Apple Grouped Form Card */}
            <View style={styles.groupedFormCard}>
              <Text style={styles.formHeaderLabel}>SLICER & SPOOL PARAMETERS</Text>

              <View style={styles.inputRow}>
                <Text style={styles.rowLabel}>Sliced Weight</Text>
                <View style={styles.inputRightWrap}>
                  <TextInput
                    style={styles.rightInput}
                    keyboardType="numeric"
                    value={printGrams}
                    onChangeText={setPrintGrams}
                    placeholder="45"
                    placeholderTextColor="#8E8E93"
                  />
                  <Text style={styles.unitText}>grams</Text>
                </View>
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.rowLabel}>Spool Price</Text>
                <View style={styles.inputRightWrap}>
                  <Text style={styles.currencyPrefix}>₹</Text>
                  <TextInput
                    style={styles.rightInput}
                    keyboardType="numeric"
                    value={spoolPrice}
                    onChangeText={setSpoolPrice}
                    placeholder="899"
                    placeholderTextColor="#8E8E93"
                  />
                </View>
              </View>

              <View style={[styles.inputRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.rowLabel}>Net Weight</Text>
                <View style={styles.inputRightWrap}>
                  <TextInput
                    style={styles.rightInput}
                    keyboardType="numeric"
                    value={spoolWeightGrams}
                    onChangeText={setSpoolWeightGrams}
                    placeholder="1000"
                    placeholderTextColor="#8E8E93"
                  />
                  <Text style={styles.unitText}>g (1kg)</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* --- SECTION 2: TEMPERATURE REFERENCE --- */}
        {activeSection === 'temps' && (
          <View>
            {MATERIALS_GUIDE.map((mat, i) => (
              <View key={i} style={styles.cardItem}>
                <Text style={styles.matTitle}>{mat.name}</Text>
                <View style={styles.appleDualBadge}>
                  <View style={styles.dualBadgeCol}>
                    <Text style={styles.badgeHeading}>NOZZLE</Text>
                    <Text style={styles.badgeTemp}>{mat.nozzleTemp}</Text>
                  </View>
                  <View style={styles.dualDivider} />
                  <View style={styles.dualBadgeCol}>
                    <Text style={styles.badgeHeading}>HEATED BED</Text>
                    <Text style={styles.badgeTemp}>{mat.bedTemp}</Text>
                  </View>
                </View>
                <Text style={styles.recSpoolNotice}>
                  Official Spool: <Text style={{ fontWeight: '700', color: '#FF6A00' }}>{mat.recommendedNfil}</Text>
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* --- SECTION 3: TROUBLESHOOTING GUIDE --- */}
        {activeSection === 'fixes' && (
          <View>
            {TROUBLESHOOTING_GUIDE.map((item, i) => (
              <View key={i} style={styles.cardItem}>
                <View style={styles.issueHeader}>
                  <Ionicons name="warning" size={16} color="#FF9500" />
                  <Text style={styles.issueTitle}>{item.issue}</Text>
                </View>

                <Text style={styles.issueSymptom}>
                  <Text style={{ fontWeight: '700', color: '#1C1C1E' }}>Symptom: </Text>
                  {item.symptom}
                </Text>

                <View style={styles.appleFixCard}>
                  <Text style={styles.fixHeaderLabel}>ACTIONABLE FIX</Text>
                  <Text style={styles.fixText}>{item.solution}</Text>
                </View>
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
  heroResultCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  heroSubTitle: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 11,
    fontWeight: '700',
    color: '#8E8E93',
    letterSpacing: 0.6,
  },
  heroHugeCost: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 38,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.8,
    marginVertical: 4,
  },
  heroPerGramText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    color: '#AEAEC2',
  },
  heroDivider: {
    height: 0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginVertical: 14,
  },
  heroBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroStatLabel: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 11,
    color: '#8E8E93',
  },
  heroStatValue: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 16,
    fontWeight: '700',
    color: '#34C759',
    marginTop: 2,
  },
  badgePill: {
    backgroundColor: 'rgba(255, 106, 0, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  badgePillText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FF6A00',
    fontSize: 11,
    fontWeight: '700',
  },
  groupedFormCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
  },
  formHeaderLabel: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 11,
    fontWeight: '700',
    color: '#8E8E93',
    letterSpacing: 0.5,
    marginTop: 8,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  rowLabel: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 15,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  inputRightWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyPrefix: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C1E',
    marginRight: 2,
  },
  rightInput: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 15,
    fontWeight: '700',
    color: '#FF6A00',
    textAlign: 'right',
    minWidth: 50,
  },
  unitText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    color: '#8E8E93',
    marginLeft: 4,
  },
  cardItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
  },
  matTitle: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  appleDualBadge: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  dualBadgeCol: {
    flex: 1,
    alignItems: 'center',
  },
  badgeHeading: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 10,
    fontWeight: '700',
    color: '#8E8E93',
    letterSpacing: 0.5,
  },
  badgeTemp: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1E',
    marginTop: 2,
  },
  dualDivider: {
    width: 0.5,
    backgroundColor: '#D1D1D6',
  },
  recSpoolNotice: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 11,
    color: '#3A3A3C',
  },
  issueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  issueTitle: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  issueSymptom: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    color: '#3A3A3C',
    lineHeight: 18,
    marginBottom: 10,
  },
  appleFixCard: {
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    padding: 10,
  },
  fixHeaderLabel: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 10,
    fontWeight: '700',
    color: '#34C759',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  fixText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 12,
    color: '#1C1C1E',
    lineHeight: 18,
  },
});
