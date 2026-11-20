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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PRINTER_HARDWARE_MODELS } from '../data/makerWorldData';

export default function DevicesScreen({ onNavigateToStore }) {
  const [deviceMode, setDeviceMode] = useState('add'); // 'add' | 'live'
  const [printStatus, setPrintStatus] = useState('printing');
  const [speedMode, setSpeedMode] = useState('standard');
  const [lightOn, setLightOn] = useState(true);

  const handleBindDevice = () => {
    Alert.alert(
      'Binding NFIL3D / Bambu Device',
      'Searching for nearby 3D printers on Wi-Fi (192.168.1.169)... Found NFIL3D N1 High-Speed!\nDevice successfully bound.',
      [
        {
          text: 'Open Live View',
          onPress: () => setDeviceMode('live'),
        },
      ]
    );
  };

  const handlePrinterSelect = (printer) => {
    Alert.alert(
      printer.name,
      `Quick Start Guide & LAN Setup for ${printer.name}.\nConnect via IP & Access Code on Port 8883 MQTT.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Connect Now', onPress: () => setDeviceMode('live') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.navHeader}>
        <Text style={styles.headerTitle}>
          {deviceMode === 'add' ? 'Add Device' : 'Devices'}
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.modeTogglePill}
            onPress={() => setDeviceMode(deviceMode === 'add' ? 'live' : 'add')}
            activeOpacity={0.8}
          >
            <Ionicons
              name={deviceMode === 'add' ? 'videocam' : 'add-circle'}
              size={15}
              color="#FF6A00"
            />
            <Text style={styles.modeToggleText}>
              {deviceMode === 'add' ? 'Live Telemetry' : '+ Add Device'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {deviceMode === 'add' ? (
          /* Exact Add Device Screen from Screenshots (Apple Minimal Light) */
          <View style={styles.addDeviceWrap}>
            <Text style={styles.scanSubtitle}>
              Scan the QR code on the device screen
            </Text>

            {/* QR Scan Phone Illustration Card */}
            <View style={styles.qrHeroCard}>
              <View style={styles.printerScreenBox}>
                <View style={styles.printerScreenQr}>
                  <Ionicons name="qr-code-outline" size={44} color="#1C1C1E" />
                </View>
              </View>

              <View style={styles.phoneScannerGraphic}>
                <View style={styles.phoneDynamicIsland} />
                <View style={styles.scannerReticle}>
                  <Ionicons name="scan-outline" size={74} color="#FF6A00" />
                </View>
              </View>
            </View>

            {/* Bind Device Primary Button */}
            <TouchableOpacity
              style={styles.bindDeviceBtn}
              activeOpacity={0.85}
              onPress={handleBindDevice}
            >
              <Text style={styles.bindDeviceBtnText}>Bind Device</Text>
            </TouchableOpacity>

            {/* Quick Start Guide Section */}
            <View style={styles.guideSection}>
              <Text style={styles.guideTitle}>Quick Start Guide</Text>
              <Text style={styles.guideSubtitle}>From Setup to Your First Print</Text>

              {/* 2-Column Printer Hardware Cards Grid */}
              <View style={styles.printerGrid}>
                {PRINTER_HARDWARE_MODELS.map((p) => (
                  <TouchableOpacity
                    key={p.id}
                    style={styles.printerCard}
                    activeOpacity={0.8}
                    onPress={() => handlePrinterSelect(p)}
                  >
                    <Image source={{ uri: p.image }} style={styles.printerCardImg} />
                    <Text style={styles.printerCardName} numberOfLines={1}>
                      {p.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        ) : (
          /* Live Printer Control & HMS Diagnosis View */
          <View style={styles.liveWrap}>
            {/* Active Printer Title Bar */}
            <View style={styles.activePrinterBar}>
              <View style={styles.activePrinterLeft}>
                <View style={styles.greenPulseDot} />
                <View>
                  <Text style={styles.activePrinterName}>NFIL3D N1 High-Speed</Text>
                  <Text style={styles.activePrinterIp}>Online • 192.168.1.169 (LAN Mode)</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.lightBtn, lightOn && styles.lightBtnActive]}
                onPress={() => setLightOn(!lightOn)}
              >
                <Ionicons
                  name={lightOn ? 'bulb' : 'bulb-outline'}
                  size={18}
                  color={lightOn ? '#FF6A00' : '#8E8E93'}
                />
              </TouchableOpacity>
            </View>

            {/* Chamber Camera Liveview Stream */}
            <View style={styles.liveviewCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1631557567889-411db18c219f?w=800&auto=format&fit=crop&q=80',
                }}
                style={styles.cameraStream}
              />

              <View style={styles.cameraOverlayTop}>
                <View style={styles.liveBadge}>
                  <View style={styles.redDot} />
                  <Text style={styles.liveBadgeText}>LIVEVIEW 1080P</Text>
                </View>
                <View style={styles.timelapseBadge}>
                  <Ionicons name="videocam" size={12} color="#FFFFFF" />
                  <Text style={styles.timelapseBadgeText}>Auto Timelapse ON</Text>
                </View>
              </View>

              <View style={styles.cameraOverlayBottom}>
                <Text style={styles.cameraModelText}>Articulated Dragon • Multi-Color</Text>
                <Text style={styles.cameraLayerText}>Layer 412 / 605</Text>
              </View>
            </View>

            {/* HMS Automatic Diagnosis System */}
            <View style={styles.hmsCard}>
              <View style={styles.hmsHeader}>
                <View style={styles.hmsTitlePill}>
                  <Ionicons name="shield-checkmark" size={16} color="#34C759" />
                  <Text style={styles.hmsTitleText}>HMS Diagnosis: Normal</Text>
                </View>
                <Text style={styles.hmsVersion}>HMS v2.4</Text>
              </View>
              <View style={styles.hmsGrid}>
                <Text style={styles.hmsItem}>✓ AI Spaghetti Detection: Safe</Text>
                <Text style={styles.hmsItem}>✓ First Layer Scan: 100% Passed</Text>
                <Text style={styles.hmsItem}>✓ Filament Runout: Spool OK</Text>
                <Text style={styles.hmsItem}>✓ Nozzle Pressure: Balanced</Text>
              </View>
            </View>

            {/* Progress Telemetry */}
            <View style={styles.progressCard}>
              <View style={styles.progressRow}>
                <View style={styles.circleProgress}>
                  <Text style={styles.progressPercentText}>68%</Text>
                  <Text style={styles.progressPercentSub}>Done</Text>
                </View>
                <View style={styles.progressTextCol}>
                  <Text style={styles.timeHuge}>1h 24m</Text>
                  <Text style={styles.timeSub}>Estimated Time Remaining</Text>
                  <Text style={styles.spoolText}>
                    Spool: <Text style={{ color: '#FF6A00', fontWeight: '700' }}>NFIL3D Rainbow PLA+</Text>
                  </Text>
                </View>
              </View>

              {/* Speed Modes */}
              <Text style={styles.speedLabel}>SPEED MODE</Text>
              <View style={styles.speedButtonsRow}>
                {[
                  { id: 'silent', label: 'Silent', pct: '50%' },
                  { id: 'standard', label: 'Standard', pct: '100%' },
                  { id: 'sport', label: 'Sport', pct: '124%' },
                  { id: 'ludicrous', label: 'Ludicrous', pct: '166%' },
                ].map((s) => {
                  const isActive = speedMode === s.id;
                  return (
                    <TouchableOpacity
                      key={s.id}
                      style={[styles.speedBtn, isActive && styles.speedBtnActive]}
                      onPress={() => setSpeedMode(s.id)}
                    >
                      <Text style={[styles.speedBtnLabel, isActive && styles.speedBtnLabelActive]}>
                        {s.label}
                      </Text>
                      <Text style={[styles.speedBtnPct, isActive && styles.speedBtnPctActive]}>
                        {s.pct}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Controls */}
              <View style={styles.controlsRow}>
                <TouchableOpacity
                  style={[styles.ctrlBtn, styles.ctrlPause]}
                  onPress={() => {
                    setPrintStatus(printStatus === 'printing' ? 'paused' : 'printing');
                    Alert.alert(
                      printStatus === 'printing' ? 'Paused' : 'Resumed',
                      'Printer state updated.'
                    );
                  }}
                >
                  <Ionicons
                    name={printStatus === 'printing' ? 'pause' : 'play'}
                    size={16}
                    color="#FFFFFF"
                  />
                  <Text style={styles.ctrlText}>
                    {printStatus === 'printing' ? 'Pause' : 'Resume'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.ctrlBtn, styles.ctrlStop]}
                  onPress={() => Alert.alert('Stop Print', 'Cancel current print job?')}
                >
                  <Ionicons name="stop" size={16} color="#FFFFFF" />
                  <Text style={styles.ctrlText}>Stop</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 10 : 14,
    paddingBottom: 10,
    backgroundColor: '#F2F2F7',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(60, 60, 67, 0.12)',
  },
  headerTitle: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, -apple-system',
    fontSize: 22,
    fontWeight: '800',
    color: '#1C1C1E',
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeTogglePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 106, 0, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 4,
  },
  modeToggleText: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#FF6A00',
    fontSize: 12,
    fontWeight: '700',
  },
  container: {
    paddingBottom: 30,
  },
  addDeviceWrap: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  scanSubtitle: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#8E8E93',
    fontSize: 14,
    marginBottom: 16,
  },
  qrHeroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    height: 230,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  printerScreenBox: {
    position: 'absolute',
    left: 24,
    top: 40,
    width: 135,
    height: 105,
    backgroundColor: '#F2F2F7',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  printerScreenQr: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#E5E5EA',
  },
  phoneScannerGraphic: {
    position: 'absolute',
    right: 32,
    top: 18,
    width: 125,
    height: 195,
    backgroundColor: '#F9F9FB',
    borderRadius: 24,
    borderWidth: 2.5,
    borderColor: '#D1D1D6',
    alignItems: 'center',
    paddingTop: 8,
  },
  phoneDynamicIsland: {
    width: 36,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#1C1C1E',
    marginBottom: 20,
  },
  scannerReticle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bindDeviceBtn: {
    backgroundColor: '#FF6A00', // Signature NFIL3D Orange
    borderRadius: 16,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#FF6A00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  bindDeviceBtnText: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  guideSection: {
    marginTop: 4,
  },
  guideTitle: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#1C1C1E',
    fontSize: 17,
    fontWeight: '700',
  },
  guideSubtitle: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#8E8E93',
    fontSize: 13,
    marginTop: 2,
    marginBottom: 14,
  },
  printerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  printerCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  printerCardImg: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  printerCardName: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#1C1C1E',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  liveWrap: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  activePrinterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  activePrinterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenPulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34C759',
    marginRight: 10,
  },
  activePrinterName: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#1C1C1E',
    fontSize: 14,
    fontWeight: '700',
  },
  activePrinterIp: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#8E8E93',
    fontSize: 11,
  },
  lightBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightBtnActive: {
    backgroundColor: 'rgba(255, 106, 0, 0.15)',
  },
  liveviewCard: {
    width: '100%',
    height: 210,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000000',
    marginBottom: 12,
  },
  cameraStream: {
    width: '100%',
    height: '100%',
  },
  cameraOverlayTop: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 5,
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF3B30',
  },
  liveBadgeText: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  timelapseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 106, 0, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  timelapseBadgeText: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  cameraOverlayBottom: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  cameraModelText: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  cameraLayerText: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#C7C7CC',
    fontSize: 11,
  },
  hmsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  hmsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  hmsTitlePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  hmsTitleText: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#34C759',
    fontSize: 13,
    fontWeight: '700',
  },
  hmsVersion: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#8E8E93',
    fontSize: 11,
  },
  hmsGrid: {
    gap: 4,
  },
  hmsItem: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#3A3A3C',
    fontSize: 12,
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  circleProgress: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#F2F2F7',
    borderWidth: 3,
    borderColor: '#FF6A00',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  progressPercentText: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, -apple-system',
    color: '#1C1C1E',
    fontSize: 16,
    fontWeight: '800',
  },
  progressPercentSub: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#8E8E93',
    fontSize: 9,
  },
  progressTextCol: {
    flex: 1,
  },
  timeHuge: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, -apple-system',
    color: '#1C1C1E',
    fontSize: 20,
    fontWeight: '800',
  },
  timeSub: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#8E8E93',
    fontSize: 11,
  },
  spoolText: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#3A3A3C',
    fontSize: 11,
    marginTop: 2,
  },
  speedLabel: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#8E8E93',
    fontSize: 10,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  speedButtonsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 14,
  },
  speedBtn: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  speedBtnActive: {
    backgroundColor: '#FF6A00',
  },
  speedBtnLabel: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#8E8E93',
    fontSize: 11,
    fontWeight: '600',
  },
  speedBtnLabelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  speedBtnPct: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#8E8E93',
    fontSize: 9,
  },
  speedBtnPctActive: {
    color: '#FFFFFF',
  },
  controlsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  ctrlBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    borderRadius: 12,
    gap: 6,
  },
  ctrlPause: {
    backgroundColor: '#FF9500',
  },
  ctrlStop: {
    backgroundColor: '#FF3B30',
  },
  ctrlText: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
