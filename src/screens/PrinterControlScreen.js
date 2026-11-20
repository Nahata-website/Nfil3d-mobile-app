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

export default function PrinterControlScreen({ onNavigateToStore }) {
  const [printStatus, setPrintStatus] = useState('printing'); // 'printing' | 'paused' | 'idle'
  const [speedMode, setSpeedMode] = useState('standard'); // 'silent' | 'standard' | 'sport' | 'ludicrous'
  const [lightOn, setLightOn] = useState(true);
  const [hmsAlerts, setHmsAlerts] = useState([]);

  const handlePauseResume = () => {
    if (printStatus === 'printing') {
      setPrintStatus('paused');
      Alert.alert('Printer Paused', 'Print job paused. Bed and nozzle temperatures maintained.');
    } else {
      setPrintStatus('printing');
      Alert.alert('Print Resumed', 'Printing resumed at current coordinate.');
    }
  };

  const handleStop = () => {
    Alert.alert(
      'Cancel Print Job?',
      'Are you sure you want to stop this print? The current model will be cancelled.',
      [
        { text: 'Keep Printing', style: 'cancel' },
        {
          text: 'Stop Print',
          style: 'destructive',
          onPress: () => setPrintStatus('idle'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.navHeader}>
        <View style={styles.headerRow}>
          <View>
            <View style={styles.printerStatusRow}>
              <View
                style={[
                  styles.statusIndicatorDot,
                  {
                    backgroundColor:
                      printStatus === 'printing'
                        ? '#34C759'
                        : printStatus === 'paused'
                        ? '#FF9500'
                        : '#8E8E93',
                  },
                ]}
              />
              <Text style={styles.printerName}>N1 High-Speed Combo</Text>
            </View>
            <Text style={styles.printerSub}>Online • IP: 192.168.1.169 (LAN Mode)</Text>
          </View>

          <TouchableOpacity
            style={[styles.lightToggleBtn, lightOn && styles.lightToggleBtnActive]}
            onPress={() => setLightOn(!lightOn)}
          >
            <Ionicons
              name={lightOn ? 'bulb' : 'bulb-outline'}
              size={18}
              color={lightOn ? '#FF6A00' : '#8E8E93'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {/* 1. Chamber Camera Liveview */}
        <View style={styles.liveviewCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1631557567889-411db18c219f?w=800&auto=format&fit=crop&q=80',
            }}
            style={styles.cameraStream}
          />

          {/* Live Overlay Badges */}
          <View style={styles.cameraOverlayTop}>
            <View style={styles.liveStreamBadge}>
              <View style={styles.recordingDot} />
              <Text style={styles.liveStreamText}>LIVEVIEW 1080P</Text>
            </View>
            <View style={styles.timelapseBadge}>
              <Ionicons name="videocam" size={12} color="#FFFFFF" />
              <Text style={styles.timelapseText}>Auto Timelapse ON</Text>
            </View>
          </View>

          <View style={styles.cameraOverlayBottom}>
            <Text style={styles.cameraModelLabel}>
              {printStatus === 'idle'
                ? 'Ready to Print'
                : 'Articulated Dragon • Multi-Color'}
            </Text>
            <Text style={styles.cameraLayerLabel}>
              {printStatus === 'idle' ? 'Bed Cleared' : 'Layer 412 / 605'}
            </Text>
          </View>
        </View>

        {/* 2. HMS (Automatic Diagnosis System) Banner */}
        <View style={styles.hmsCard}>
          <View style={styles.hmsHeader}>
            <View style={styles.hmsIconPill}>
              <Ionicons name="shield-checkmark" size={16} color="#34C759" />
              <Text style={styles.hmsTitle}>HMS Diagnosis: All Systems Normal</Text>
            </View>
            <Text style={styles.hmsVersion}>HMS v2.4</Text>
          </View>
          <View style={styles.hmsGrid}>
            <View style={styles.hmsItem}>
              <Text style={styles.hmsCheckText}>✓ AI Spaghetti Detection: Safe</Text>
            </View>
            <View style={styles.hmsItem}>
              <Text style={styles.hmsCheckText}>✓ First Layer Scan: 100% Passed</Text>
            </View>
            <View style={styles.hmsItem}>
              <Text style={styles.hmsCheckText}>✓ Filament Runout: Spool OK</Text>
            </View>
            <View style={styles.hmsItem}>
              <Text style={styles.hmsCheckText}>✓ Nozzle Pressure: Balanced</Text>
            </View>
          </View>
        </View>

        {/* 3. Print Progress & Remote Controls */}
        {printStatus !== 'idle' ? (
          <View style={styles.controlsCard}>
            <View style={styles.progressRow}>
              <View style={styles.progressCircle}>
                <Text style={styles.progressPercent}>68%</Text>
                <Text style={styles.progressSubLabel}>Completed</Text>
              </View>
              <View style={styles.progressDetails}>
                <Text style={styles.timeLeftHuge}>1h 24m</Text>
                <Text style={styles.timeLeftLabel}>Estimated Time Remaining</Text>
                <Text style={styles.spoolLoadedText}>
                  Loaded: <Text style={{ color: '#FF6A00', fontWeight: '700' }}>NFIL3D Rainbow PLA+</Text>
                </Text>
              </View>
            </View>

            {/* Speed Selector (Silent, Standard, Sport, Ludicrous) */}
            <Text style={styles.speedSectionHeading}>PRINT SPEED MODE</Text>
            <View style={styles.speedSelectorWrap}>
              {[
                { id: 'silent', label: 'Silent', sub: '50%' },
                { id: 'standard', label: 'Standard', sub: '100%' },
                { id: 'sport', label: 'Sport', sub: '124%' },
                { id: 'ludicrous', label: 'Ludicrous', sub: '166%' },
              ].map((sp) => {
                const isActive = speedMode === sp.id;
                return (
                  <TouchableOpacity
                    key={sp.id}
                    style={[styles.speedBtn, isActive && styles.speedBtnActive]}
                    onPress={() => setSpeedMode(sp.id)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.speedBtnLabel,
                        isActive && styles.speedBtnLabelActive,
                      ]}
                    >
                      {sp.label}
                    </Text>
                    <Text
                      style={[
                        styles.speedBtnSub,
                        isActive && styles.speedBtnSubActive,
                      ]}
                    >
                      {sp.sub}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Remote Actions: Pause, Resume, Stop */}
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                style={[
                  styles.pauseResumeBtn,
                  printStatus === 'paused' && styles.resumeBtnStyle,
                ]}
                onPress={handlePauseResume}
                activeOpacity={0.85}
              >
                <Ionicons
                  name={printStatus === 'printing' ? 'pause' : 'play'}
                  size={18}
                  color="#FFFFFF"
                />
                <Text style={styles.actionBtnText}>
                  {printStatus === 'printing' ? 'Pause Print' : 'Resume Print'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.stopBtn}
                onPress={handleStop}
                activeOpacity={0.85}
              >
                <Ionicons name="stop" size={18} color="#FF3B30" />
                <Text style={styles.stopBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.idleCard}>
            <Ionicons name="checkmark-done-circle" size={54} color="#34C759" />
            <Text style={styles.idleTitle}>Printer is Ready</Text>
            <Text style={styles.idleSub}>
              Browse the Models Library to start 1-Step Printing, or manage your spools in the Store.
            </Text>
            <TouchableOpacity
              style={styles.startPrintBtn}
              onPress={() => setPrintStatus('printing')}
            >
              <Text style={styles.startPrintBtnText}>Load Test Print</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 4. Live Telemetry Temperatures */}
        <View style={styles.telemetryCard}>
          <Text style={styles.telemetryHeading}>LIVE TEMPERATURES</Text>
          <View style={styles.telemetryGrid}>
            <View style={styles.telemetryItem}>
              <View style={styles.telemetryIconRow}>
                <Ionicons name="flame" size={18} color="#FF3B30" />
                <Text style={styles.telemetryLabel}>Nozzle</Text>
              </View>
              <Text style={styles.telemetryVal}>
                {printStatus === 'idle' ? '28°C' : '220°C'}
              </Text>
              <Text style={styles.telemetryTarget}>
                Target: {printStatus === 'idle' ? '0°C' : '220°C'}
              </Text>
            </View>

            <View style={styles.telemetryDivider} />

            <View style={styles.telemetryItem}>
              <View style={styles.telemetryIconRow}>
                <Ionicons name="layers" size={18} color="#FF6A00" />
                <Text style={styles.telemetryLabel}>Heatbed</Text>
              </View>
              <Text style={styles.telemetryVal}>
                {printStatus === 'idle' ? '30°C' : '60°C'}
              </Text>
              <Text style={styles.telemetryTarget}>
                Target: {printStatus === 'idle' ? '0°C' : '60°C'}
              </Text>
            </View>

            <View style={styles.telemetryDivider} />

            <View style={styles.telemetryItem}>
              <View style={styles.telemetryIconRow}>
                <Ionicons name="thermometer" size={18} color="#34C759" />
                <Text style={styles.telemetryLabel}>Chamber</Text>
              </View>
              <Text style={styles.telemetryVal}>38°C</Text>
              <Text style={styles.telemetryTarget}>Fan: 80%</Text>
            </View>
          </View>
        </View>
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
  printerStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  printerName: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 20,
    fontWeight: '800',
    color: '#1C1C1E',
    letterSpacing: -0.4,
  },
  printerSub: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  lightToggleBtn: {
    backgroundColor: 'rgba(142, 142, 147, 0.14)',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightToggleBtnActive: {
    backgroundColor: 'rgba(255, 106, 0, 0.18)',
  },
  container: {
    padding: 16,
    paddingBottom: 36,
  },
  liveviewCard: {
    backgroundColor: '#000000',
    borderRadius: 22,
    overflow: 'hidden',
    height: 220,
    marginBottom: 12,
    position: 'relative',
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.12)',
  },
  cameraStream: {
    width: '100%',
    height: '100%',
    opacity: 0.92,
  },
  cameraOverlayTop: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  liveStreamBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  recordingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF3B30',
    marginRight: 5,
  },
  liveStreamText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  timelapseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 106, 0, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  timelapseText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cameraOverlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cameraModelLabel: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  cameraLayerLabel: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#FF6A00',
    fontSize: 11,
    fontWeight: '600',
  },
  hmsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
  },
  hmsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  hmsIconPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  hmsTitle: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 13,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  hmsVersion: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 11,
    color: '#8E8E93',
  },
  hmsGrid: {
    gap: 4,
  },
  hmsItem: {
    paddingVertical: 2,
  },
  hmsCheckText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 12,
    color: '#34C759',
    fontWeight: '500',
  },
  controlsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(255, 106, 0, 0.12)',
    borderWidth: 3,
    borderColor: '#FF6A00',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  progressPercent: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 20,
    fontWeight: '800',
    color: '#FF6A00',
  },
  progressSubLabel: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 9,
    color: '#8E8E93',
  },
  progressDetails: {
    flex: 1,
  },
  timeLeftHuge: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 26,
    fontWeight: '800',
    color: '#1C1C1E',
  },
  timeLeftLabel: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  spoolLoadedText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 12,
    color: '#3A3A3C',
  },
  speedSectionHeading: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 11,
    fontWeight: '700',
    color: '#8E8E93',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  speedSelectorWrap: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 3,
    marginBottom: 16,
  },
  speedBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 9,
  },
  speedBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  speedBtnLabel: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 12,
    fontWeight: '600',
    color: '#3A3A3C',
  },
  speedBtnLabelActive: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FF6A00',
    fontWeight: '700',
  },
  speedBtnSub: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 10,
    color: '#8E8E93',
    marginTop: 1,
  },
  speedBtnSubActive: {
    color: '#FF6A00',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  pauseResumeBtn: {
    flex: 2,
    backgroundColor: '#FF6A00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    gap: 6,
  },
  resumeBtnStyle: {
    backgroundColor: '#34C759',
  },
  actionBtnText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  stopBtn: {
    flex: 1,
    backgroundColor: '#FEE2E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    gap: 4,
  },
  stopBtnText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '700',
  },
  idleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
  },
  idleTitle: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 18,
    fontWeight: '800',
    color: '#1C1C1E',
    marginTop: 10,
  },
  idleSub: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 13,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
    marginBottom: 16,
  },
  startPrintBtn: {
    backgroundColor: '#FF6A00',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  startPrintBtnText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  telemetryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
  },
  telemetryHeading: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 11,
    fontWeight: '700',
    color: '#8E8E93',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  telemetryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  telemetryItem: {
    flex: 1,
    alignItems: 'center',
  },
  telemetryIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  telemetryLabel: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 12,
    color: '#8E8E93',
  },
  telemetryVal: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 20,
    fontWeight: '800',
    color: '#1C1C1E',
  },
  telemetryTarget: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 11,
    color: '#8E8E93',
    marginTop: 2,
  },
  telemetryDivider: {
    width: 0.5,
    backgroundColor: '#E5E5EA',
  },
});
