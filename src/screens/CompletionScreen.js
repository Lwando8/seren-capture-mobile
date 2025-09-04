import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Card from '../components/Card';
import { AppIcon } from '../components/Icon';
import { COLORS, SIZES } from '../constants/theme';

const CompletionScreen = ({ navigation, route }) => {
  const { sessionData, completionData } = route.params;

  const handleStartNew = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusIcon = (hasCapture) => {
    return hasCapture ? <AppIcon.Check size={16} color={COLORS.completedText} /> : <AppIcon.Close size={16} color={COLORS.errorText} />;
  };

  const getStatusText = (hasCapture) => {
    return hasCapture ? 'Completed' : 'Pending';
  };

  const getStatusStyle = (hasCapture) => {
    return hasCapture ? styles.statusCompleted : styles.statusPending;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Header */}
        <View style={styles.successHeader}>
          <AppIcon.CheckOutline size={64} color={COLORS.success} />
          <Text style={styles.successTitle}>Capture Complete!</Text>
          <Text style={styles.successSubtitle}>
            All required images have been captured and processed
          </Text>
        </View>

        {/* Session Summary */}
        <Card>
          <Text style={styles.cardTitle}>Capture Summary</Text>
          <View style={styles.summaryContainer}>
            <SummaryRow 
              label="Session ID" 
              value={completionData.sessionId} 
            />
            <SummaryRow 
              label="Resident" 
              value={completionData.residentInfo.name} 
            />
            <SummaryRow 
              label="Unit Number" 
              value={completionData.residentInfo.unitNumber} 
            />
            <SummaryRow 
              label="Capture Mode" 
              value={completionData.mode.charAt(0).toUpperCase() + completionData.mode.slice(1)} 
            />
            <SummaryRow 
              label="Total Captures" 
              value={completionData.totalCaptures.toString()} 
            />
            <SummaryRow 
              label="Completed At" 
              value={formatDateTime(completionData.completedAt)} 
            />
          </View>
        </Card>

        {/* Captures Status */}
        <Card>
          <Text style={styles.cardTitle}>Captured Images</Text>
          <View style={styles.capturesContainer}>
            <CaptureStatusRow
              type="Person Identification"
              hasCapture={!!completionData.captures.person}
              details={completionData.captures.person}
            />
            
            {completionData.mode === 'vehicle' && (
              <CaptureStatusRow
                type="Vehicle Identification"
                hasCapture={!!completionData.captures.vehicle}
                details={completionData.captures.vehicle}
              />
            )}
          </View>
        </Card>

        {/* Additional Information */}
        <Card>
          <Text style={styles.cardTitle}>Additional Information</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              • Images have been securely encrypted and stored
            </Text>
            <Text style={styles.infoText}>
              • All data is linked to the resident and session
            </Text>
            <Text style={styles.infoText}>
              • Access control logs have been updated
            </Text>
            <Text style={styles.infoText}>
              • Session has been completed successfully
            </Text>
          </View>
        </Card>

        {/* Action Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Start New Capture"
            onPress={handleStartNew}
            style={styles.startButton}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Thank you for using Seren Capture
          </Text>
          <Text style={styles.footerSubtext}>
            Residential Access Control System
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const SummaryRow = ({ label, value }) => (
  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>{label}:</Text>
    <Text style={styles.summaryValue}>{value}</Text>
  </View>
);

const CaptureStatusRow = ({ type, hasCapture, details }) => (
  <View style={styles.captureRow}>
    <View style={styles.captureInfo}>
      <Text style={styles.captureType}>{type}</Text>
      {details && (
        <Text style={styles.captureDetails}>
          Captured: {formatDateTime(details.timestamp)}
        </Text>
      )}
    </View>
    <View style={[styles.captureStatus, getStatusStyle(hasCapture)]}>
      <View style={styles.captureStatusContent}>
        {getStatusIcon(hasCapture)}
        <Text style={styles.captureStatusText}>
          {getStatusText(hasCapture)}
        </Text>
      </View>
    </View>
  </View>
);

const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString();
};

const getStatusStyle = (hasCapture) => {
  return hasCapture 
    ? { backgroundColor: COLORS.completed } 
    : { backgroundColor: COLORS.pending };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SIZES.lg,
    paddingBottom: SIZES.xxl,
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: SIZES.xl,
    paddingVertical: SIZES.xl,
  },
  successTitle: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.success,
    textAlign: 'center',
    marginBottom: SIZES.sm,
  },
  successSubtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  cardTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.lg,
  },
  summaryContainer: {
    backgroundColor: COLORS.light,
    borderRadius: SIZES.radius,
    padding: SIZES.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  summaryLabel: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    fontWeight: '600',
    flex: 1,
  },
  summaryValue: {
    fontSize: SIZES.body,
    color: COLORS.text,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  capturesContainer: {
    gap: SIZES.md,
  },
  captureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.lg,
    backgroundColor: COLORS.light,
    borderRadius: SIZES.radius,
  },
  captureInfo: {
    flex: 1,
  },
  captureType: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  captureDetails: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  captureStatus: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: 20,
  },
  captureStatusContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  captureStatusText: {
    fontSize: SIZES.caption,
    fontWeight: 'bold',
    color: COLORS.text,
    marginLeft: SIZES.xs,
  },
  statusCompleted: {
    backgroundColor: COLORS.completed,
  },
  statusPending: {
    backgroundColor: COLORS.pending,
  },
  infoContainer: {
    gap: SIZES.md,
  },
  infoText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: SIZES.xl,
  },
  startButton: {
    marginVertical: SIZES.md,
  },
  footer: {
    alignItems: 'center',
    marginTop: SIZES.xl,
    paddingTop: SIZES.xl,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  footerSubtext: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
});

export default CompletionScreen;
