import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { AppIcon } from '../components/Icon';
import { COLORS, SIZES } from '../constants/theme';
import apiService from '../services/apiService';

const HomeScreen = ({ navigation }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [demoOTPs, setDemoOTPs] = useState([]);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      const health = await apiService.checkHealth();
      setDemoMode(health.demoMode || false);
      setDemoOTPs(health.demoOTPs || []);
    } catch (error) {
      console.warn('API health check failed:', error.message);
      // Continue in offline mode
    } finally {
      setInitializing(false);
    }
  };

  const handleSearch = async () => {
    if (!otp.trim()) {
      Alert.alert('Error', 'Please enter an OTP');
      return;
    }

    setLoading(true);

    try {
      const response = await apiService.startSession(otp.trim());
      
      if (response.success) {
        // Navigate to mode selection with session data
        navigation.navigate('ModeSelection', {
          sessionData: response.data,
        });
      } else {
        Alert.alert('Error', response.error || 'Failed to start session');
      }
    } catch (error) {
      Alert.alert(
        'Search Failed',
        error.message || 'Unable to search for OTP. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const selectDemoOTP = (selectedOTP) => {
    setOtp(selectedOTP);
  };

  if (initializing) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner text="Initializing..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Residential Access Control</Text>
            <Text style={styles.subtitle}>Image Capture System</Text>
          </View>

          {/* Demo Mode Info */}
          {demoMode && demoOTPs.length > 0 && (
            <Card style={styles.demoCard}>
              <View style={styles.demoHeader}>
                <AppIcon.Demo size={20} color={COLORS.white} />
                <Text style={styles.demoTitle}>Demo Mode Active</Text>
              </View>
              <Text style={styles.demoSubtitle}>Try these sample OTPs:</Text>
              {demoOTPs.map((demo) => (
                <Button
                  key={demo.otp}
                  title={`${demo.otp} - ${demo.resident} (${demo.unit}) [${demo.type}]`}
                  variant="outline"
                  size="small"
                  onPress={() => selectDemoOTP(demo.otp)}
                  style={styles.demoButton}
                  textStyle={styles.demoButtonText}
                />
              ))}
            </Card>
          )}

          {/* OTP Input Card */}
          <Card>
            <Text style={styles.cardTitle}>Enter Visitor OTP</Text>
            <Text style={styles.cardSubtitle}>
              Enter the One-Time-PIN provided by the visitor
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>One-Time-PIN (OTP)</Text>
              <TextInput
                style={styles.input}
                value={otp}
                onChangeText={setOtp}
                placeholder="Enter OTP"
                placeholderTextColor={COLORS.placeholder}
                maxLength={10}
                keyboardType="default"
                autoCapitalize="characters"
                autoCorrect={false}
                editable={!loading}
              />
            </View>

            <Button
              title="Search Resident Info"
              onPress={handleSearch}
              loading={loading}
              disabled={!otp.trim() || loading}
            />
          </Card>

          {/* Status Info */}
          <Card>
            <Text style={styles.statusTitle}>System Status</Text>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Mode:</Text>
              <Text style={[
                styles.statusValue,
                { color: demoMode ? COLORS.warning : COLORS.success }
              ]}>
                {demoMode ? 'Demo Mode' : 'Production Mode'}
              </Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>API:</Text>
              <Text style={[
                styles.statusValue,
                { color: demoMode ? COLORS.warning : COLORS.success }
              ]}>
                {demoMode ? 'Offline (Demo)' : 'Connected'}
              </Text>
            </View>
          </Card>

          {/* Instructions */}
          <Card>
            <Text style={styles.instructionsTitle}>How to Use</Text>
            <View style={styles.instructionStep}>
              <AppIcon.Phone size={16} color={COLORS.primary} style={styles.instructionIcon} />
              <Text style={styles.instructionText}>Ask visitor for their One-Time-PIN (OTP)</Text>
            </View>
            <View style={styles.instructionStep}>
              <AppIcon.Search size={16} color={COLORS.primary} style={styles.instructionIcon} />
              <Text style={styles.instructionText}>Enter the OTP and tap "Search"</Text>
            </View>
            <View style={styles.instructionStep}>
              <AppIcon.Settings size={16} color={COLORS.primary} style={styles.instructionIcon} />
              <Text style={styles.instructionText}>Select capture mode (Pedestrian/Vehicle)</Text>
            </View>
            <View style={styles.instructionStep}>
              <AppIcon.Camera size={16} color={COLORS.primary} style={styles.instructionIcon} />
              <Text style={styles.instructionText}>Capture required images</Text>
            </View>
            <View style={styles.instructionStep}>
              <AppIcon.Check size={16} color={COLORS.primary} style={styles.instructionIcon} />
              <Text style={styles.instructionText}>Complete the process</Text>
            </View>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: SIZES.lg,
    paddingBottom: SIZES.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.xl,
    paddingVertical: SIZES.lg,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.xs,
  },
  subtitle: {
    fontSize: SIZES.h4,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  demoCard: {
    backgroundColor: COLORS.info,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  demoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  demoTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.white,
    marginLeft: SIZES.sm,
  },
  demoSubtitle: {
    fontSize: SIZES.body,
    color: COLORS.white,
    marginBottom: SIZES.md,
  },
  demoButton: {
    marginVertical: SIZES.xs / 2,
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
  },
  demoButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.caption,
  },
  cardTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.sm,
  },
  cardSubtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.lg,
  },
  inputContainer: {
    marginBottom: SIZES.lg,
  },
  inputLabel: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.sm,
  },
  input: {
    height: SIZES.inputHeight,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: SIZES.inputRadius,
    paddingHorizontal: SIZES.lg,
    fontSize: SIZES.h4,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },
  statusTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.md,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  statusLabel: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  statusValue: {
    fontSize: SIZES.body,
    fontWeight: '600',
  },
  instructionsTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.md,
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  instructionIcon: {
    marginRight: SIZES.sm,
  },
  instructionText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    lineHeight: 20,
    flex: 1,
  },
});

export default HomeScreen;
