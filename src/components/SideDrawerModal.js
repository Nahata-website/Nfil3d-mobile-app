import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SideDrawerModal({ visible, onClose, onSelectOption }) {
  const menuItems = [
    {
      id: 'contests',
      title: 'Contests',
      subtitle: 'Hosted By Creator:\n@Hodorious - Cyberb...',
      icon: 'trophy',
      iconBg: '#FFF9C4',
      iconColor: '#F57F17',
    },
    {
      id: 'crowdfunding',
      title: 'Crowdfunding',
      subtitle: 'Turn ideas into reality',
      icon: 'leaf',
      iconBg: '#E8F5E9',
      iconColor: '#2E7D32',
    },
    {
      id: 'makerlab',
      title: 'MakerLab',
      subtitle: 'Create easily, customize freely',
      icon: 'cube',
      iconBg: '#E3F2FD',
      iconColor: '#1565C0',
    },
    {
      id: 'makerkids',
      title: 'MakerKids',
      subtitle: 'Made by Kids, Printed\nto Reality',
      icon: 'school',
      iconBg: '#E0F2F1',
      iconColor: '#00695C',
    },
    {
      id: 'community',
      title: 'Community',
      subtitle: 'Join the maker discussions',
      icon: 'chatbubbles',
      iconBg: '#FCE4EC',
      iconColor: '#C2185B',
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Backdrop */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        {/* Drawer Panel */}
        <View style={styles.drawerPanel}>
          <SafeAreaView style={styles.drawerSafeArea}>
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>MakerWorld</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color="#1C1C1E" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollList}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.cardItem}
                  activeOpacity={0.7}
                  onPress={() => {
                    onClose();
                    if (onSelectOption) onSelectOption(item.id);
                  }}
                >
                  <View style={styles.cardTextCol}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSub}>{item.subtitle}</Text>
                  </View>
                  <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
                    <Ionicons name={item.icon} size={28} color={item.iconColor} />
                  </View>
                </TouchableOpacity>
              ))}

              {/* Lower Section: History & Collections */}
              <View style={styles.bottomCard}>
                <TouchableOpacity
                  style={styles.bottomRow}
                  activeOpacity={0.7}
                  onPress={() => {
                    onClose();
                    if (onSelectOption) onSelectOption('history');
                  }}
                >
                  <Ionicons name="time-outline" size={20} color="#1C1C1E" style={styles.bottomIcon} />
                  <Text style={styles.bottomText}>Browsing History</Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity
                  style={styles.bottomRow}
                  activeOpacity={0.7}
                  onPress={() => {
                    onClose();
                    if (onSelectOption) onSelectOption('collections');
                  }}
                >
                  <Ionicons name="bookmark-outline" size={20} color="#1C1C1E" style={styles.bottomIcon} />
                  <Text style={styles.bottomText}>Collections</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  drawerPanel: {
    width: '78%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF', // Apple pure white
    height: '100%',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingHorizontal: 16,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
  },
  drawerSafeArea: {
    flex: 1,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(60, 60, 67, 0.12)',
    marginBottom: 12,
  },
  drawerTitle: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, -apple-system',
    fontSize: 20,
    fontWeight: '800',
    color: '#1C1C1E',
    letterSpacing: -0.5,
  },
  closeBtn: {
    padding: 4,
  },
  scrollList: {
    paddingBottom: 30,
    gap: 12,
  },
  cardItem: {
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
  },
  cardTextCol: {
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: {
    fontFamily: 'SF-Pro-Bold, -apple-system',
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  cardSub: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 12,
    color: '#8E8E93',
    lineHeight: 16,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomCard: {
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
    marginTop: 6,
    overflow: 'hidden',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  bottomIcon: {
    marginRight: 12,
  },
  bottomText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 15,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  divider: {
    height: 0.5,
    backgroundColor: 'rgba(60, 60, 67, 0.1)',
    marginHorizontal: 16,
  },
});
