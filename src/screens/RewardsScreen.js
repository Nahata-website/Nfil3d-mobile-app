import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RewardsScreen({ onRedeemCoupon }) {
  const [points, setPoints] = useState(1450);

  const rewards = [
    {
      id: 'r1',
      title: '₹200 OFF on Any NFIL3D Spool',
      cost: 500,
      code: 'REWARD200',
      description: 'Valid on PLA+, PETG, TPU, and Carbon Fiber spools on nfil3d.com',
      icon: 'pricetag',
    },
    {
      id: 'r2',
      title: 'Free 3D Pen 11-Pcs Refill Pack',
      cost: 1000,
      code: 'FREEPEN11',
      description: 'Includes 55 meters of assorted vibrant colors for 3D pens.',
      icon: 'brush',
    },
    {
      id: 'r3',
      title: 'NFIL3D Universal Dust Filter Kit',
      cost: 250,
      code: 'FREEFILTER',
      description: 'Protects your 3D printer nozzle from dust and clogs.',
      icon: 'funnel',
    },
    {
      id: 'r4',
      title: '1-Month Cloud Slicing Pro',
      cost: 750,
      code: 'PROSLICE1M',
      description: 'Unlimited high-speed remote cloud slicing with AI error detection.',
      icon: 'cloud-done',
    },
  ];

  const handleClaim = (reward) => {
    if (points < reward.cost) {
      Alert.alert('Insufficient Points', `You need ${reward.cost - points} more points to redeem this reward.`);
      return;
    }
    setPoints(points - reward.cost);
    Alert.alert(
      '🎉 Reward Claimed!',
      `You unlocked: "${reward.title}"!\nYour promo code is: ${reward.code}\nUse this at checkout for instant discount.`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navHeader}>
        <Text style={styles.largeTitle}>Maker Rewards</Text>
        <Text style={styles.subTitleCaption}>Earn Points With Every Interaction & Print</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        {/* Points Hero Card */}
        <View style={styles.pointsHeroCard}>
          <View style={styles.tierRow}>
            <View style={styles.tierBadge}>
              <Ionicons name="medal" size={14} color="#FFFFFF" />
              <Text style={styles.tierText}>SILVER MAKER TIER</Text>
            </View>
            <Text style={styles.tierPerk}>+10% Points Multiplier</Text>
          </View>

          <Text style={styles.pointsHeading}>AVAILABLE BALANCE</Text>
          <View style={styles.hugePointsRow}>
            <Text style={styles.hugePointsVal}>{points.toLocaleString()}</Text>
            <Text style={styles.pointsUnitText}>N-FIL Points</Text>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.quickEarningRow}>
            <Text style={styles.quickEarningText}>
              🔥 Next Milestone: <Text style={{ color: '#FF6A00', fontWeight: '700' }}>Gold Tier at 2,500 pts</Text>
            </Text>
          </View>
        </View>

        {/* How to Earn Points Section */}
        <View style={styles.earnSectionCard}>
          <Text style={styles.sectionHeaderLabel}>WAYS TO EARN N-FIL POINTS</Text>

          <View style={styles.earnList}>
            <View style={styles.earnRow}>
              <View style={styles.earnIconWrap}>
                <Ionicons name="print" size={16} color="#FF6A00" />
              </View>
              <View style={styles.earnDetails}>
                <Text style={styles.earnTitle}>Complete a 3D Print</Text>
                <Text style={styles.earnSub}>Send any model via 1-Step Print</Text>
              </View>
              <Text style={styles.earnPointsBadge}>+50 pts</Text>
            </View>

            <View style={styles.earnRow}>
              <View style={styles.earnIconWrap}>
                <Ionicons name="videocam" size={16} color="#34C759" />
              </View>
              <View style={styles.earnDetails}>
                <Text style={styles.earnTitle}>Share a Print Timelapse</Text>
                <Text style={styles.earnSub}>Post to Moments community</Text>
              </View>
              <Text style={styles.earnPointsBadge}>+30 pts</Text>
            </View>

            <View style={[styles.earnRow, { borderBottomWidth: 0 }]}>
              <View style={styles.earnIconWrap}>
                <Ionicons name="cart" size={16} color="#007AFF" />
              </View>
              <View style={styles.earnDetails}>
                <Text style={styles.earnTitle}>Buy an Authentic Spool</Text>
                <Text style={styles.earnSub}>Order from NFIL3D Store</Text>
              </View>
              <Text style={styles.earnPointsBadge}>+100 pts</Text>
            </View>
          </View>
        </View>

        {/* Redeemable Rewards */}
        <Text style={styles.rewardsHeading}>REDEEM POINTS FOR DISCOUNTS</Text>

        {rewards.map((r) => {
          const canAfford = points >= r.cost;
          return (
            <View key={r.id} style={styles.rewardCard}>
              <View style={styles.rewardIconCol}>
                <Ionicons name={r.icon} size={22} color="#FF6A00" />
              </View>
              <View style={styles.rewardInfoCol}>
                <Text style={styles.rewardTitle}>{r.title}</Text>
                <Text style={styles.rewardDesc}>{r.description}</Text>
                <Text style={styles.rewardCostText}>{r.cost} Points</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.claimBtn,
                  !canAfford && styles.claimBtnDisabled,
                ]}
                onPress={() => handleClaim(r)}
                activeOpacity={0.8}
              >
                <Text style={styles.claimBtnText}>
                  {canAfford ? 'Redeem' : 'Lock'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
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
    marginTop: 1,
  },
  container: {
    padding: 16,
    paddingBottom: 36,
  },
  pointsHeroCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
  },
  tierRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  tierText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  tierPerk: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 11,
    color: '#34C759',
    fontWeight: '600',
  },
  pointsHeading: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 11,
    fontWeight: '700',
    color: '#8E8E93',
    letterSpacing: 0.5,
  },
  hugePointsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginVertical: 4,
  },
  hugePointsVal: {
    fontFamily: 'SF-Pro-Display-Bold, SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 38,
    fontWeight: '900',
    color: '#FF6A00',
  },
  pointsUnitText: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cardDivider: {
    height: 0.5,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginVertical: 12,
  },
  quickEarningRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickEarningText: {
    fontFamily: 'SF-Pro, -apple-system',
    color: '#AEAEC2',
    fontSize: 12,
  },
  earnSectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
  },
  sectionHeaderLabel: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 11,
    fontWeight: '700',
    color: '#8E8E93',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  earnList: {
    gap: 6,
  },
  earnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E5EA',
  },
  earnIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  earnDetails: {
    flex: 1,
  },
  earnTitle: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 13,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  earnSub: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 11,
    color: '#8E8E93',
  },
  earnPointsBadge: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FF6A00',
    fontSize: 13,
    fontWeight: '700',
  },
  rewardsHeading: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 12,
    fontWeight: '700',
    color: '#8E8E93',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(60, 60, 67, 0.08)',
  },
  rewardIconCol: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 106, 0, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rewardInfoCol: {
    flex: 1,
  },
  rewardTitle: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 13,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  rewardDesc: {
    fontFamily: 'SF-Pro, -apple-system',
    fontSize: 11,
    color: '#8E8E93',
    lineHeight: 15,
    marginTop: 2,
  },
  rewardCostText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    fontSize: 12,
    fontWeight: '800',
    color: '#FF6A00',
    marginTop: 4,
  },
  claimBtn: {
    backgroundColor: '#FF6A00',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    marginLeft: 8,
  },
  claimBtnDisabled: {
    backgroundColor: '#C7C7CC',
  },
  claimBtnText: {
    fontFamily: 'SF-Pro-Bold, SF-Pro, -apple-system',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
