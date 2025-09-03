import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import apiService from '../services/apiService';

const ModeSelectionScreen = ({ navigation, route }) => {
  const { sessionData } = route.params;
  const [selectedMode, setSelectedMode] = useState(null);
  const [loading, setLoading] = useState(false);

  const modes = [
    {
      id: 'pedestrian',
      title: '🚶 Pedestrian',
      description: 'Capture ID/Passport only',
      details: 'For visitors arriving on foot',
      captures: ['Person Identification'],
    },
    {
      id: 'vehicle',
      title: '🚗 Vehicle',
      description: 'Capture ID + Vehicle',
      details: 'For visitors arriving by vehicle',
      captures: ['Person Identification', 'Vehicle License'],
    },
  ];

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
  };

  const handleProceed = async () => {
    if (!selectedMode) {
      Alert.alert('Error', 'Please select a capture mode');
      return;
    }

    setLoading(true);

    try {
      const response = await apiService.setCaptureMode(
        sessionData.sessionId,
        selectedMode
      );

      if (response.success) {
        navigation.navigate('Capture', {
          sessionData,
          mode: selectedMode,
          availableCaptures: response.data.availableCaptures,
        });
      } else {
        Alert.alert('Error', response.error || 'Failed to set capture mode');
      }
    } catch (error) {
      Alert.alert(
        'Setup Failed',
        error.message || 'Unable to set capture mode. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Resident Info Card */}
        <Card>
          <Text style={styles.cardTitle}>Resident Information</Text>
          <View style={styles.residentInfo}>
            <InfoRow 
              label="Name" 
              value={sessionData.residentInfo.name} 
            />
            <InfoRow 
              label="Unit Number" 
              value={sessionData.residentInfo.unitNumber} 
            />
            <InfoRow 
              label="Phone" 
              value={sessionData.residentInfo.phone || 'N/A'} 
            />
            <InfoRow 
              label="Email" 
              value={sessionData.residentInfo.email || 'N/A'} 
            />
          </View>
        </Card>

        {/* Mode Selection */}
        <Card>
          <Text style={styles.cardTitle}>Select Capture Mode</Text>
          <Text style={styles.cardSubtitle}>
            Choose the type of visitor and required captures
          </Text>

          <View style={styles.modesContainer}>
            {modes.map((mode) => (
              <ModeCard
                key={mode.id}
                mode={mode}
                selected={selectedMode === mode.id}
                onSelect={() => handleModeSelect(mode.id)}
              />
            ))}
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <Button
            title="Proceed to Capture"
            onPress={handleProceed}
            loading={loading}
            disabled={!selectedMode || loading}
          />
          <Button
            title="Back to Home"
            variant="outline"
            onPress={handleGoBack}
            disabled={loading}
          />
        </View>
      </ScrollView>

      {loading && <LoadingSpinner text="Setting up capture mode..." overlay />}
    </SafeAreaView>
  );
};

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const ModeCard = ({ mode, selected, onSelect }) => (
  <TouchableOpacity
    style={[
      styles.modeCard,
      selected && styles.modeCardSelected,
    ]}
    onPress={onSelect}
    activeOpacity={0.8}
  >
    <View style={styles.modeHeader}>
      <Text style={[
        styles.modeTitle,
        selected && styles.modeTitleSelected,
      ]}>
        {mode.title}
      </Text>
      <Text style={[
        styles.modeDescription,
        selected && styles.modeDescriptionSelected,
      ]}>
        {mode.description}
      </Text>
    </View>
    
    <Text style={[
      styles.modeDetails,
      selected && styles.modeDetailsSelected,
    ]}>
      {mode.details}
    </Text>
    
    <View style={styles.capturesContainer}>
      <Text style={[
        styles.capturesTitle,
        selected && styles.capturesTitleSelected,
      ]}>
        Required Captures:
      </Text>
      {mode.captures.map((capture, index) => (
        <Text 
          key={index}
          style={[
            styles.captureItem,
            selected && styles.captureItemSelected,
          ]}
        >
          • {capture}
        </Text>
      ))}
    </View>
    
    {selected && (
      <View style={styles.selectedIndicator}>
        <Text style={styles.selectedText}>✓ Selected</Text>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SIZES.lg,
    paddingBottom: SIZES.xxl,
  },
  cardTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.md,
  },
  cardSubtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.lg,
  },
  residentInfo: {
    backgroundColor: COLORS.light,
    borderRadius: SIZES.radius,
    padding: SIZES.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  infoLabel: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    fontWeight: '600',
    flex: 1,
  },
  infoValue: {
    fontSize: SIZES.body,
    color: COLORS.text,
    fontWeight: '400',
    flex: 2,
    textAlign: 'right',
  },
  modesContainer: {
    gap: SIZES.md,
  },
  modeCard: {
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    padding: SIZES.lg,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  modeCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  modeHeader: {
    marginBottom: SIZES.md,
  },
  modeTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  modeTitleSelected: {
    color: COLORS.white,
  },
  modeDescription: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  modeDescriptionSelected: {
    color: COLORS.white,
    opacity: 0.9,
  },
  modeDetails: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.md,
    fontStyle: 'italic',
  },
  modeDetailsSelected: {
    color: COLORS.white,
    opacity: 0.8,
  },
  capturesContainer: {
    marginBottom: SIZES.sm,
  },
  capturesTitle: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.sm,
  },
  capturesTitleSelected: {
    color: COLORS.white,
  },
  captureItem: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xs,
    marginLeft: SIZES.sm,
  },
  captureItemSelected: {
    color: COLORS.white,
    opacity: 0.9,
  },
  selectedIndicator: {
    position: 'absolute',
    top: SIZES.sm,
    right: SIZES.sm,
    backgroundColor: COLORS.success,
    borderRadius: 15,
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
  },
  selectedText: {
    fontSize: SIZES.caption,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  buttonsContainer: {
    marginTop: SIZES.lg,
    gap: SIZES.md,
  },
});

export default ModeSelectionScreen;
