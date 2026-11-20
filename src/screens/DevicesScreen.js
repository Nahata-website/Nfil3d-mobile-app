import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DevicesScreen({ onNavigateToStore }) {
  // 'add' (Page 7) | 'select' (Page 9) | 'live' (Chamber Telemetry)
  const [deviceScreenState, setDeviceScreenState] = useState('add');
  const [selectedModel, setSelectedModel] = useState('n1');
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [activeGuidePrinter, setActiveGuidePrinter] = useState('NFIL3D N2');

  const [manualCode, setManualCode] = useState('');
  const [flashLightOn, setFlashLightOn] = useState(false);

  // Live telemetry state
  const [printStatus, setPrintStatus] = useState('printing');
  const [speedMode, setSpeedMode] = useState('standard');
  const [lightOn, setLightOn] = useState(true);

  const printerModels = [
    {
      id: 'n1',
      name: 'NFIL3D N1',
      sub: 'CoreXY High-Speed Workhorse',
      image: require('../../assets/printers/N1.webp'),
    },
    {
      id: 'n2',
      name: 'NFIL3D N2',
      sub: 'Industrial Enclosed Pro',
      image: require('../../assets/printers/N2.webp'),
    },
    {
      id: 'nii',
      name: 'NFIL3D NII',
      sub: 'Multi-Color Dual Extrusion',
      image: require('../../assets/printers/N1.webp'),
    },
    {
      id: 'mini_n',
      name: 'NFIL3D Mini-N',
      sub: 'Compact Desktop Smart Printer',
      image: require('../../assets/printers/MINI N.webp'),
    },
  ];

  const handleQrScanned = () => {
    setIsQrModalOpen(false);
    Alert.alert(
      'Device Paired!',
      'NFIL3D N1 successfully linked over local LAN (192.168.1.169). Telemetry active.',
      [{ text: 'View Printer', onPress: () => setDeviceScreenState('live') }]
    );
  };

  const handleManualConnect = () => {
    if (!manualCode) {
      Alert.alert('Required', 'Please enter your 8-digit device pairing code.');
      return;
    }
    setIsManualModalOpen(false);
    Alert.alert(
      'Device Connected',
      `Device Code ${manualCode} verified with NFIL3D Cloud.`,
      [{ text: 'Go to Printer Control', onPress: () => setDeviceScreenState('live') }]
    );
  };

  const openGuide = (printerName) => {
    setActiveGuidePrinter(printerName);
    setIsGuideModalOpen(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.navHeader}>
        <View style={styles.headerLeft}>
          {deviceScreenState !== 'add' && (
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => setDeviceScreenState('add')}
            >
              <Ionicons name="chevron-back" size={24} color="#1C1C1E" />
            </TouchableOpacity>
          )}
          <Text style={styles.headerTitle}>
            {deviceScreenState === 'add'
              ? 'Add Printer'
              : deviceScreenState === 'select'
              ? 'Select Your Printer'
              : 'Printer Control'}
          </Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.modeTogglePill}
            onPress={() => {
              if (deviceScreenState === 'live') setDeviceScreenState('add');
              else setDeviceScreenState('live');
            }}
            activeOpacity={0.8}
          >
            <Ionicons
              name={deviceScreenState === 'live' ? 'add-circle-outline' : 'videocam-outline'}
              size={15}
              color="#FF6A00"
            />
            <Text style={styles.modeToggleText}>
              {deviceScreenState === 'live' ? 'Add Device' : 'Live Camera'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* VIEW 1: Add Printer Screen (Matching Page 7 of PDF) */}
        {deviceScreenState === 'add' && (
          <View style={styles.addWrap}>
            <Text style={styles.scanSubtitle}>
              Scan the QR code shown on your printer to connect.
            </Text>

            {/* QR Hero Card Illustration matching Page 7 */}
            <View style={styles.qrHeroCard}>
              <View style={styles.printerIllustration}>
                <Image
                  source={require('../../assets/printers/N1.webp')}
                  style={styles.printerIllImage}
                  resizeMode="contain"
                />
                <View style={styles.printerScreenQrBadge}>
                  <Ionicons name="qr-code" size={18} color="#FF6A00" />
                </View>
              </View>

              <View style={styles.phoneIllustration}>
                <View style={styles.phoneFrame}>
                  <View style={styles.phoneDynamicIsland} />
                  <View style={styles.phoneReticle}>
                    <Ionicons name="scan" size={68} color="#FF6A00" />
                  </View>
                </View>
              </View>
            </View>

            {/* Scan QR Code Primary Button matching Page 7 */}
            <TouchableOpacity
              style={styles.primaryOrangeBtn}
              activeOpacity={0.85}
              onPress={() => setIsQrModalOpen(true)}
            >
              <Ionicons name="scan-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.primaryOrangeBtnText}>Scan QR Code</Text>
            </TouchableOpacity>

            {/* Enter Device Code Manually Button matching Page 7 */}
            <TouchableOpacity
              style={styles.secondaryWhiteBtn}
              activeOpacity={0.8}
              onPress={() => setIsManualModalOpen(true)}
            >
              <Text style={styles.secondaryWhiteBtnText}>Enter Device Code Manually</Text>
            </TouchableOpacity>

            {/* Quick Switch to Select Model Grid (Page 9) */}
            <TouchableOpacity
              style={styles.selectModelPill}
              activeOpacity={0.7}
              onPress={() => setDeviceScreenState('select')}
            >
              <Ionicons name="list-outline" size={16} color="#FF6A00" />
              <Text style={styles.selectModelText}>Or select by Printer Model (N1, N2, Mini-N) ➔</Text>
            </TouchableOpacity>

            {/* Quick Start Guides Section matching Page 7 */}
            <View style={styles.guidesSection}>
              <Text style={styles.guidesTitle}>Quick Start Guides</Text>
              <Text style={styles.guidesSub}>From setup to your first print</Text>

              <View style={styles.guidesGrid}>
                {/* Guide Card 1: NFIL3D N2 */}
                <TouchableOpacity
                  style={styles.guideCard}
                  activeOpacity={0.85}
                  onPress={() => openGuide('NFIL3D N2')}
                >
                  <View style={styles.guideImgWrap}>
                    <Image
                      source={require('../../assets/printers/N2.webp')}
                      style={styles.guideImg}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.guideCardName}>NFIL3D N2</Text>
                  <View style={styles.viewGuideRow}>
                    <Text style={styles.viewGuideText}>View Guide</Text>
                    <Ionicons name="arrow-forward" size={14} color="#FF6A00" />
                  </View>
                </TouchableOpacity>

                {/* Guide Card 2: NFIL3D Mini-N */}
                <TouchableOpacity
                  style={styles.guideCard}
                  activeOpacity={0.85}
                  onPress={() => openGuide('NFIL3D Mini-N')}
                >
                  <View style={styles.guideImgWrap}>
                    <Image
                      source={require('../../assets/printers/MINI N.webp')}
                      style={styles.guideImg}
                      resizeMode="contain"
                    />
                  </View>
                  <Text style={styles.guideCardName}>NFIL3D Mini-N</Text>
                  <View style={styles.viewGuideRow}>
                    <Text style={styles.viewGuideText}>View Guide</Text>
                    <Ionicons name="arrow-forward" size={14} color="#FF6A00" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* VIEW 2: Select Your Printer (Matching Page 9 of PDF) */}
        {deviceScreenState === 'select' && (
          <View style={styles.selectWrap}>
            <Text style={styles.selectSubtitle}>
              Choose your NFIL3D model to get started
            </Text>

            {/* 2x2 Grid of NFIL3D Models */}
            <View style={styles.modelsGrid}>
              {printerModels.map((printer) => {
                const isSelected = selectedModel === printer.id;
                return (
                  <TouchableOpacity
                    key={printer.id}
                    style={[styles.modelCard, isSelected && styles.modelCardSelected]}
                    activeOpacity={0.85}
                    onPress={() => setSelectedModel(printer.id)}
                  >
                    {/* Selected Checkmark Badge */}
                    {isSelected && (
                      <View style={styles.modelCheckBadge}>
                        <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                      </View>
                    )}
                    <View style={styles.modelImgWrap}>
                      <Image source={printer.image} style={styles.modelImg} resizeMode="contain" />
                    </View>
                    <Text style={styles.modelName}>{printer.name}</Text>
                    <Text style={styles.modelSub} numberOfLines={1}>{printer.sub}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.modelSelectionHelper}>
              Select a model to view connection options
            </Text>

            {/* Continue Button matching Page 9 */}
            <TouchableOpacity
              style={styles.primaryOrangeBtn}
              activeOpacity={0.85}
              onPress={() => {
                Alert.alert(
                  'Printer Selected',
                  `Connecting to ${printerModels.find((p) => p.id === selectedModel)?.name} over LAN...`,
                  [{ text: 'Open Live View', onPress: () => setDeviceScreenState('live') }]
                );
              }}
            >
              <Text style={styles.primaryOrangeBtnText}>Continue</Text>
              <Ionicons name="chevron-forward" size={18} color="#FFFFFF" style={{ marginLeft: 4 }} />
            </TouchableOpacity>

            {/* Scan QR Code Instead Link matching Page 9 */}
            <TouchableOpacity
              style={styles.scanInsteadWrap}
              onPress={() => setDeviceScreenState('add')}
            >
              <Text style={styles.orangeUnderlineLink}>Scan QR Code Instead</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* VIEW 3: Live Telemetry & Chamber Controls */}
        {deviceScreenState === 'live' && (
          <View style={styles.liveWrap}>
            {/* Live Camera Stream Simulation Card */}
            <View style={styles.cameraCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
                }}
                style={styles.cameraStream}
              />
              <View style={styles.cameraOverlayTop}>
                <View style={styles.cameraLivePill}>
                  <View style={styles.liveRedDot} />
                  <Text style={styles.cameraLiveText}>1080p 30fps • LAN</Text>
                </View>

                <TouchableOpacity
                  style={[styles.lightBtn, lightOn && styles.lightBtnActive]}
                  onPress={() => setLightOn(!lightOn)}
                >
                  <Ionicons
                    name={lightOn ? 'bulb' : 'bulb-outline'}
                    size={16}
                    color={lightOn ? '#FFD60A' : '#FFFFFF'}
                  />
                  <Text style={styles.lightBtnText}>{lightOn ? 'Light ON' : 'Light OFF'}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.cameraOverlayBottom}>
                <Text style={styles.currentPrintTitle}>NFIL3D High-Speed Benchy</Text>
                <Text style={styles.currentPrintSub}>Layer 142/320 • Remaining: 14m</Text>
              </View>
            </View>

            {/* HMS Diagnostic Health Card */}
            <View style={styles.hmsCard}>
              <View style={styles.hmsIconWrap}>
                <Ionicons name="checkmark-circle" size={24} color="#34C759" />
              </View>
              <View style={styles.hmsTextWrap}>
                <Text style={styles.hmsTitle}>HMS Diagnosis: Normal</Text>
                <Text style={styles.hmsSub}>Nozzle, heated bed, lidar sensor operating in nominal ranges</Text>
              </View>
            </View>

            {/* Telemetry Metrics Row */}
            <View style={styles.metricsRow}>
              <View style={styles.metricCard}>
                <View style={styles.metricHeader}>
                  <Ionicons name="flame" size={18} color="#FF6A00" />
                  <Text style={styles.metricLabel}>Nozzle</Text>
                </View>
                <Text style={styles.metricValue}>220°C</Text>
                <Text style={styles.metricTarget}>Target: 220°C</Text>
              </View>

              <View style={styles.metricCard}>
                <View style={styles.metricHeader}>
                  <Ionicons name="square" size={18} color="#FF9500" />
                  <Text style={styles.metricLabel}>Heatbed</Text>
                </View>
                <Text style={styles.metricValue}>60°C</Text>
                <Text style={styles.metricTarget}>Target: 60°C</Text>
              </View>

              <View style={styles.metricCard}>
                <View style={styles.metricHeader}>
                  <Ionicons name="sync" size={18} color="#007AFF" />
                  <Text style={styles.metricLabel}>Part Fan</Text>
                </View>
                <Text style={styles.metricValue}>100%</Text>
                <Text style={styles.metricTarget}>Max Cooling</Text>
              </View>
            </View>

            {/* Speed Control Strip */}
            <View style={styles.speedCard}>
              <Text style={styles.speedTitle}>Print Speed Profile</Text>
              <View style={styles.speedRow}>
                {['Silent (50%)', 'Standard (100%)', 'Sport (124%)', 'Ludicrous (166%)'].map(
                  (mode) => {
                    const modeKey = mode.split(' ')[0].toLowerCase();
                    const isActive = speedMode === modeKey;
                    return (
                      <TouchableOpacity
                        key={modeKey}
                        style={[styles.speedPill, isActive && styles.speedPillActive]}
                        onPress={() => setSpeedMode(modeKey)}
                      >
                        <Text style={[styles.speedPillText, isActive && styles.speedPillTextActive]}>
                          {mode.split(' ')[0]}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                )}
              </View>
            </View>
          </View>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* QR Code Scanner Interactive Modal */}
      <Modal
        visible={isQrModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsQrModalOpen(false)}
      >
        <View style={styles.qrModalOverlay}>
          <SafeAreaView style={styles.qrModalSafe}>
            <View style={styles.qrModalHeader}>
              <TouchableOpacity
                onPress={() => setIsQrModalOpen(false)}
                style={styles.qrModalCloseBtn}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.qrModalTitle}>Scan Printer QR Code</Text>
              <TouchableOpacity
                onPress={() => setFlashLightOn(!flashLightOn)}
                style={styles.qrModalCloseBtn}
              >
                <Ionicons
                  name={flashLightOn ? 'flashlight' : 'flashlight-outline'}
                  size={22}
                  color={flashLightOn ? '#FFD60A' : '#FFFFFF'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.qrViewFinderContainer}>
              <View style={styles.qrTargetReticle}>
                <View style={styles.qrCornerTopLeft} />
                <View style={styles.qrCornerTopRight} />
                <View style={styles.qrCornerBottomLeft} />
                <View style={styles.qrCornerBottomRight} />
                <View style={styles.laserScanLine} />
              </View>
              <Text style={styles.qrFinderHint}>
                Align the QR code from the printer screen inside the box
              </Text>
            </View>

            <View style={styles.qrModalBottom}>
              <TouchableOpacity
                style={styles.simulateScanBtn}
                activeOpacity={0.85}
                onPress={handleQrScanned}
              >
                <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.simulateScanBtnText}>Simulate Successful Scan</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </Modal>

      {/* Manual Device Code Entry Modal */}
      <Modal
        visible={isManualModalOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsManualModalOpen(false)}
      >
        <View style={styles.manualModalOverlay}>
          <View style={styles.manualCard}>
            <Text style={styles.manualTitle}>Enter Device Code</Text>
            <Text style={styles.manualSub}>
              Type the 8-digit access code displayed in Settings ➔ Network on your printer.
            </Text>

            <TextInput
              style={styles.manualInput}
              placeholder="e.g. NF-8492-3D"
              placeholderTextColor="#8E8E93"
              value={manualCode}
              onChangeText={setManualCode}
              autoCapitalize="characters"
            />

            <View style={styles.manualBtnRow}>
              <TouchableOpacity
                style={styles.manualCancelBtn}
                onPress={() => setIsManualModalOpen(false)}
              >
                <Text style={styles.manualCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.manualConnectBtn}
                onPress={handleManualConnect}
              >
                <Text style={styles.manualConnectText}>Connect</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Quick Start Guide Modal */}
      <Modal
        visible={isGuideModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsGuideModalOpen(false)}
      >
        <View style={styles.guideModalOverlay}>
          <SafeAreaView style={styles.guideModalSafe}>
            <View style={styles.guideModalCard}>
              <View style={styles.guideModalHeader}>
                <Text style={styles.guideModalHeading}>{activeGuidePrinter} Quick Start</Text>
                <TouchableOpacity onPress={() => setIsGuideModalOpen(false)}>
                  <Ionicons name="close" size={24} color="#8E8E93" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.guideStepsScroll}>
                <View style={styles.guideStepItem}>
                  <View style={styles.guideStepNumber}>
                    <Text style={styles.stepNumText}>1</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>Unboxing & Foam Removal</Text>
                    <Text style={styles.stepDesc}>
                      Carefully remove the protective top foam, secure screws, and unpack the accessories box.
                    </Text>
                  </View>
                </View>

                <View style={styles.guideStepItem}>
                  <View style={styles.guideStepNumber}>
                    <Text style={styles.stepNumText}>2</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>Install Spool Holder & PEI Plate</Text>
                    <Text style={styles.stepDesc}>
                      Attach the spool holder onto the side frame. Place the textured golden PEI plate onto the magnetic bed.
                    </Text>
                  </View>
                </View>

                <View style={styles.guideStepItem}>
                  <View style={styles.guideStepNumber}>
                    <Text style={styles.stepNumText}>3</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={styles.stepTitle}>Auto-Bed Leveling & First Print</Text>
                    <Text style={styles.stepDesc}>
                      Power on, run the 7-minute self-test calibration, and scan the QR code to pair with this app!
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.guideFinishBtn}
                  onPress={() => {
                    setIsGuideModalOpen(false);
                    setIsQrModalOpen(true);
                  }}
                >
                  <Text style={styles.guideFinishBtnText}>Ready to Pair Printer ➔</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </SafeAreaView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backBtn: {
    marginRight: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '800',
    color: '#1C1C1E',
  },
  headerRight: {},
  modeTogglePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 5,
  },
  modeToggleText: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Bold',
    color: '#FF6A00',
    fontWeight: '700',
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  addWrap: {},
  scanSubtitle: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 16,
  },
  qrHeroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  printerIllustration: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  printerIllImage: {
    width: 140,
    height: 140,
  },
  printerScreenQrBadge: {
    position: 'absolute',
    bottom: 12,
    right: 20,
    backgroundColor: '#FFFFFF',
    padding: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FF6A00',
  },
  phoneIllustration: {
    flex: 1,
    alignItems: 'center',
  },
  phoneFrame: {
    width: 110,
    height: 180,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    borderWidth: 3,
    borderColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  phoneDynamicIsland: {
    position: 'absolute',
    top: 8,
    width: 34,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#1C1C1E',
  },
  phoneReticle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryOrangeBtn: {
    backgroundColor: '#FF6A00',
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#FF6A00',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  primaryOrangeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
  },
  secondaryWhiteBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    marginBottom: 16,
  },
  secondaryWhiteBtnText: {
    color: '#1C1C1E',
    fontSize: 15,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
  },
  selectModelPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginBottom: 24,
    gap: 6,
  },
  selectModelText: {
    color: '#FF6A00',
    fontSize: 14,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '600',
  },
  guidesSection: {
    marginTop: 8,
  },
  guidesTitle: {
    fontSize: 18,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '700',
    color: '#1C1C1E',
  },
  guidesSub: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    marginTop: 2,
    marginBottom: 12,
  },
  guidesGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  guideCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  guideImgWrap: {
    width: '100%',
    height: 110,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  guideImg: {
    width: '90%',
    height: '90%',
  },
  guideCardName: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  viewGuideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewGuideText: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Bold',
    color: '#FF6A00',
    fontWeight: '600',
  },

  // SELECT PRINTER STYLES
  selectWrap: {},
  selectSubtitle: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 18,
  },
  modelsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  modelCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    position: 'relative',
    alignItems: 'center',
  },
  modelCardSelected: {
    borderColor: '#FF6A00',
    backgroundColor: '#FFFBF7',
  },
  modelCheckBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FF6A00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelImgWrap: {
    width: '100%',
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  modelImg: {
    width: '90%',
    height: '90%',
  },
  modelName: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
    color: '#1C1C1E',
  },
  modelSub: {
    fontSize: 11,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    marginTop: 2,
  },
  modelSelectionHelper: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 14,
  },
  scanInsteadWrap: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  orangeUnderlineLink: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Bold',
    color: '#FF6A00',
    textDecorationLine: 'underline',
  },

  // LIVE TELEMETRY STYLES
  liveWrap: {},
  cameraCard: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000000',
    height: 220,
    marginBottom: 16,
    position: 'relative',
  },
  cameraStream: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  cameraOverlayTop: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cameraLivePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  liveRedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34C759',
  },
  cameraLiveText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'SF-Pro-Regular',
  },
  lightBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  lightBtnActive: {
    backgroundColor: 'rgba(255,214,10,0.25)',
  },
  lightBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'SF-Pro-Regular',
  },
  cameraOverlayBottom: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    padding: 10,
  },
  currentPrintTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
  },
  currentPrintSub: {
    color: '#D1D1D6',
    fontSize: 12,
    fontFamily: 'SF-Pro-Regular',
    marginTop: 2,
  },
  hmsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  hmsIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E5F9EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hmsTextWrap: {
    flex: 1,
  },
  hmsTitle: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Bold',
    color: '#1C1C1E',
    fontWeight: '700',
  },
  hmsSub: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  metricLabel: {
    fontSize: 12,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
  },
  metricValue: {
    fontSize: 18,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '800',
    color: '#1C1C1E',
  },
  metricTarget: {
    fontSize: 10,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    marginTop: 2,
  },
  speedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  speedTitle: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 10,
  },
  speedRow: {
    flexDirection: 'row',
    gap: 6,
  },
  speedPill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
  },
  speedPillActive: {
    backgroundColor: '#FF6A00',
  },
  speedPillText: {
    fontSize: 11,
    fontFamily: 'SF-Pro-Bold',
    color: '#1C1C1E',
    fontWeight: '600',
  },
  speedPillTextActive: {
    color: '#FFFFFF',
  },

  // QR SCANNER MODAL STYLES
  qrModalOverlay: {
    flex: 1,
    backgroundColor: '#000000',
  },
  qrModalSafe: {
    flex: 1,
    justifyContent: 'space-between',
  },
  qrModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  qrModalCloseBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrModalTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '700',
  },
  qrViewFinderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  qrTargetReticle: {
    width: 240,
    height: 240,
    position: 'relative',
    marginBottom: 20,
  },
  qrCornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 32,
    height: 32,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#FF6A00',
    borderTopLeftRadius: 12,
  },
  qrCornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 32,
    height: 32,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#FF6A00',
    borderTopRightRadius: 12,
  },
  qrCornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 32,
    height: 32,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#FF6A00',
    borderBottomLeftRadius: 12,
  },
  qrCornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#FF6A00',
    borderBottomRightRadius: 12,
  },
  laserScanLine: {
    position: 'absolute',
    top: '50%',
    left: 8,
    right: 8,
    height: 2,
    backgroundColor: '#FF3B30',
    shadowColor: '#FF3B30',
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
  qrFinderHint: {
    color: '#D1D1D6',
    fontSize: 14,
    fontFamily: 'SF-Pro-Regular',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  qrModalBottom: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  simulateScanBtn: {
    backgroundColor: '#FF6A00',
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  simulateScanBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
  },

  // MANUAL CODE ENTRY MODAL
  manualModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  manualCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
  },
  manualTitle: {
    fontSize: 18,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 6,
  },
  manualSub: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    lineHeight: 18,
    marginBottom: 16,
  },
  manualInput: {
    backgroundColor: '#F2F2F7',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 16,
    fontFamily: 'SF-Pro-Bold',
    color: '#1C1C1E',
    marginBottom: 18,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  manualBtnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  manualCancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
  },
  manualCancelText: {
    color: '#8E8E93',
    fontSize: 14,
    fontFamily: 'SF-Pro-Bold',
  },
  manualConnectBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#FF6A00',
    alignItems: 'center',
  },
  manualConnectText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
  },

  // GUIDE MODAL
  guideModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  guideModalSafe: {
    width: '100%',
    alignItems: 'center',
  },
  guideModalCard: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '85%',
  },
  guideModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  guideModalHeading: {
    fontSize: 18,
    fontFamily: 'SF-Pro-Display-Bold',
    fontWeight: '700',
    color: '#1C1C1E',
  },
  guideStepsScroll: {
    paddingVertical: 8,
  },
  guideStepItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  guideStepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFF0E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  stepNumText: {
    color: '#FF6A00',
    fontWeight: '700',
    fontSize: 14,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
    color: '#1C1C1E',
  },
  stepDesc: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Regular',
    color: '#8E8E93',
    lineHeight: 18,
    marginTop: 3,
  },
  guideFinishBtn: {
    backgroundColor: '#FF6A00',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  guideFinishBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'SF-Pro-Bold',
    fontWeight: '700',
  },
});
