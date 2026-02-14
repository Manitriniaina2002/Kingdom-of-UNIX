/**
 * World Map Screen - Navigate between zones
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useResponsive, clickable } from '../../utils/responsive';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { useGame } from '../../context/GameContext';
import { ZONES, ZONE_ORDER, WORLD_CONNECTIONS } from '../../data/zones';
import Header from '../../components/Common/Header';
import ZoneNode from '../../components/Zone/ZoneNode';
import { GameIcon } from '../../utils/icons';

const WorldMapScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { unlockedZones, getZoneProgress, completedQuests } = useGame();
  const [selectedZone, setSelectedZone] = useState(null);
  const { layout, fonts, spacing, isTablet, isDesktop, maxContentWidth } = useResponsive();

  const handleZonePress = (zoneId) => {
    if (unlockedZones.includes(zoneId)) {
      setSelectedZone(zoneId);
      navigation.navigate('Zone', { zoneId });
    }
  };

  // Calculate overall progress
  const totalProgress = Math.round(
    (completedQuests.length / Object.keys(ZONES).reduce((acc, zoneId) => 
      acc + ZONES[zoneId].quests.length, 0)) * 100
  );

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Header
        title="World Map"
        subtitle="Kingdom of UNIX"
        showBack
        onLeftPress={() => navigation.goBack()}
        rightIcon=""
        onRightPress={() => navigation.navigate('Progress')}
      />

      {/* Map Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.success }]} />
          <Text style={styles.legendText}>Unlocked</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.textMuted }]} />
          <Text style={styles.legendText}>Locked</Text>
        </View>
        <View style={styles.legendItem}>
          <GameIcon name="xp" size={12} color={COLORS.gold} />
          <Text style={styles.legendText}>Complete</Text>
        </View>
      </View>

      {/* Map Area */}
      <ScrollView 
        style={styles.mapContainer}
        contentContainerStyle={[styles.mapContent, { maxWidth: maxContentWidth, alignSelf: 'center', width: '100%' }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Connection Lines (simplified) */}
        <View style={styles.connectionsOverlay}>
          {WORLD_CONNECTIONS.map((conn, index) => (
            <View 
              key={index}
              style={[
                styles.connectionLine,
                unlockedZones.includes(conn.to) 
                  ? styles.connectionUnlocked 
                  : styles.connectionLocked,
              ]}
            />
          ))}
        </View>

        {/* Zone Nodes */}
        <View style={styles.zoneGrid}>
          {/* Mountain (Top) */}
          <View style={styles.rowCenter}>
            <ZoneNode
              zone={ZONES.mountain}
              isUnlocked={unlockedZones.includes('mountain')}
              progress={getZoneProgress('mountain')}
              onPress={() => handleZonePress('mountain')}
              size="large"
            />
          </View>

          {/* Castle (Upper Middle) */}
          <View style={styles.rowCenter}>
            <ZoneNode
              zone={ZONES.castle}
              isUnlocked={unlockedZones.includes('castle')}
              progress={getZoneProgress('castle')}
              onPress={() => handleZonePress('castle')}
              size="large"
            />
          </View>

          {/* Cave and Forest (Middle Row) */}
          <View style={styles.rowSpread}>
            <ZoneNode
              zone={ZONES.cave}
              isUnlocked={unlockedZones.includes('cave')}
              progress={getZoneProgress('cave')}
              onPress={() => handleZonePress('cave')}
            />
            <ZoneNode
              zone={ZONES.forest}
              isUnlocked={unlockedZones.includes('forest')}
              progress={getZoneProgress('forest')}
              onPress={() => handleZonePress('forest')}
            />
          </View>

          {/* Village (Bottom - Starting Point) */}
          <View style={styles.rowCenter}>
            <ZoneNode
              zone={ZONES.village}
              isUnlocked={unlockedZones.includes('village')}
              progress={getZoneProgress('village')}
              onPress={() => handleZonePress('village')}
              size="large"
            />
          </View>
        </View>

        {/* Kingdom Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}><GameIcon name="home" size={18} color={COLORS.textPrimary} /> Kingdom Progress</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Zones Explored:</Text>
            <Text style={styles.infoValue}>{unlockedZones.length}/{ZONE_ORDER.length}</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${totalProgress}%` }]} />
          </View>
          <Text style={styles.progressText}>{totalProgress}% Complete</Text>
        </View>

        {/* Zone List (Alternative View) */}
        <View style={styles.zoneList}>
          <Text style={styles.listTitle}>All Zones</Text>
          {ZONE_ORDER.map((zoneId) => {
            const zone = ZONES[zoneId];
            const isUnlocked = unlockedZones.includes(zoneId);
            const progress = getZoneProgress(zoneId);

            return (
              <TouchableOpacity
                key={zoneId}
                style={[
                  styles.zoneListItem,
                  !isUnlocked && styles.zoneListItemLocked,
                  clickable(),
                ]}
                onPress={() => handleZonePress(zoneId)}
                disabled={!isUnlocked}
              >
                <View style={[styles.zoneListIcon, { backgroundColor: isUnlocked ? zone.color + '30' : COLORS.surfaceLight }]}>
                  {isUnlocked ? <GameIcon name={zone.icon} size={24} color={zone.color} /> : <GameIcon name="locked" size={24} color={COLORS.textMuted} />}
                </View>
                <View style={styles.zoneListContent}>
                  <Text style={[styles.zoneListName, !isUnlocked && styles.lockedText]}>
                    {zone.name}
                  </Text>
                  <Text style={[styles.zoneListDesc, !isUnlocked && styles.lockedText]} numberOfLines={1}>
                    {isUnlocked ? zone.description : `Requires Level ${zone.requiredLevel}`}
                  </Text>
                  {isUnlocked && (
                    <View style={styles.miniProgress}>
                      <View style={[styles.miniProgressFill, { width: `${progress}%`, backgroundColor: zone.color }]} />
                    </View>
                  )}
                </View>
                <View style={styles.zoneListBadge}>
                  {isUnlocked && progress === 100 && <GameIcon name="xp" size={20} color={COLORS.gold} />}
                  {isUnlocked && progress < 100 && <Text style={styles.progressBadge}>{progress}%</Text>}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: SPACING.xxxl }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceLight,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.md,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.xs,
  },
  legendEmoji: {
    fontSize: 12,
    marginRight: SPACING.xs,
  },
  legendText: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
  },
  mapContainer: {
    flex: 1,
  },
  mapContent: {
    padding: SPACING.lg,
  },
  connectionsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  connectionLine: {
    // Simplified - would need SVG for actual paths
    display: 'none',
  },
  connectionUnlocked: {
    borderColor: COLORS.primary,
  },
  connectionLocked: {
    borderColor: COLORS.textMuted,
  },
  zoneGrid: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  rowCenter: {
    alignItems: 'center',
    marginVertical: SPACING.xl,
  },
  rowSpread: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: SPACING.xl,
  },
  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginTop: SPACING.xl,
    ...SHADOWS.small,
  },
  infoTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  infoLabel: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },
  infoValue: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.bold,
  },
  progressBar: {
    height: 10,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.round,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.round,
  },
  progressText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    textAlign: 'center',
    fontWeight: FONTS.weights.bold,
  },
  zoneList: {
    marginTop: SPACING.xl,
  },
  listTitle: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    marginBottom: SPACING.md,
  },
  zoneListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.surfaceLight,
  },
  zoneListItemLocked: {
    opacity: 0.6,
  },
  zoneListIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  zoneListEmoji: {
    fontSize: 24,
  },
  zoneListContent: {
    flex: 1,
  },
  zoneListName: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
  },
  zoneListDesc: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.xs,
    marginTop: 2,
  },
  lockedText: {
    color: COLORS.textMuted,
  },
  miniProgress: {
    height: 4,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 2,
    marginTop: SPACING.xs,
    overflow: 'hidden',
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  zoneListBadge: {
    marginLeft: SPACING.sm,
  },
  completeBadge: {
    fontSize: 20,
  },
  progressBadge: {
    color: COLORS.textSecondary,
    fontSize: FONTS.sizes.sm,
  },
});

export default WorldMapScreen;
