import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Button from '../components/Button';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { AppIcon } from '../components/Icon';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import apiService from '../services/apiService';

const { width } = Dimensions.get('window');

const CaptureScreen = ({ navigation, route }) => {
  const { sessionData, mode, availableCaptures } = route.params;
  const [captures, setCaptures] = useState({});
  const [uploading, setUploading] = useState(false);
  const [currentUpload, setCurrentUpload] = useState(null);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Camera Permission Required',
        'This app needs camera access to capture identification images.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Grant Permission', onPress: requestPermissions },
        ]
      );
    }
  };

  const captureImage = async (captureType) => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: false,
      });

      if (!result.canceled && result.assets[0]) {
        setCaptures(prev => ({
          ...prev,
          [captureType]: result.assets[0],
        }));
      }
    } catch (error) {
      Alert.alert('Camera Error', 'Failed to capture image. Please try again.');
      console.error('Camera error:', error);
    }
  };


  const showImageOptions = (captureType) => {
    // Directly open camera for security purposes - no gallery option
    captureImage(captureType);
  };

  const removeCapture = (captureType) => {
    setCaptures(prev => {
      const newCaptures = { ...prev };
      delete newCaptures[captureType];
      return newCaptures;
    });
  };

  const uploadCaptures = async () => {
    const captureKeys = Object.keys(captures);
    if (captureKeys.length === 0) {
      Alert.alert('Error', 'Please capture at least one image');
      return;
    }

    setUploading(true);

    try {
      // Upload each capture
      for (const captureType of captureKeys) {
        setCurrentUpload(captureType);
        await apiService.uploadImage(
          sessionData.sessionId,
          captureType,
          captures[captureType].uri
        );
      }

      // Complete the session
      setCurrentUpload('completing');
      const response = await apiService.completeSession(sessionData.sessionId);

      if (response.success) {
        navigation.navigate('Completion', {
          sessionData,
          completionData: response.data,
        });
      } else {
        Alert.alert('Error', 'Failed to complete session');
      }
    } catch (error) {
      Alert.alert(
        'Upload Failed',
        error.message || 'Failed to upload images. Please try again.'
      );
    } finally {
      setUploading(false);
      setCurrentUpload(null);
    }
  };

  const getRequiredCaptures = () => {
    if (mode === 'pedestrian') {
      return [
        {
          type: 'person',
          title: 'Person Identification',
          description: 'Capture ID, Passport, or Driver\'s License',
          required: true,
          icon: 'ID',
        },
      ];
    } else {
      return [
        {
          type: 'person',
          title: 'Person Identification',
          description: 'Capture ID, Passport, or Driver\'s License',
          required: true,
          icon: 'ID',
        },
        {
          type: 'vehicle',
          title: 'Vehicle Identification',
          description: 'Capture License Disc or License Plate',
          required: true,
          icon: 'License',
        },
      ];
    }
  };

  const isComplete = () => {
    const requiredCaptures = getRequiredCaptures();
    return requiredCaptures.every(capture => captures[capture.type]);
  };

  const getProgress = () => {
    const requiredCaptures = getRequiredCaptures();
    const completedCount = requiredCaptures.filter(capture => captures[capture.type]).length;
    return (completedCount / requiredCaptures.length) * 100;
  };

  const getUploadText = () => {
    if (currentUpload === 'completing') {
      return 'Completing session...';
    } else if (currentUpload) {
      return `Uploading ${currentUpload} image...`;
    }
    return 'Uploading images...';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Resident Info */}
        <Card>
          <Text style={styles.cardTitle}>Resident: {sessionData.residentInfo.name}</Text>
          <Text style={styles.cardSubtitle}>
            Unit {sessionData.residentInfo.unitNumber} • {mode} mode
          </Text>
        </Card>

        {/* Progress */}
        <Card>
          <Text style={styles.progressTitle}>Capture Progress</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${getProgress()}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {Math.round(getProgress())}% Complete
          </Text>
        </Card>

        {/* Capture Sections */}
        {getRequiredCaptures().map((captureInfo) => (
          <CaptureSection
            key={captureInfo.type}
            captureInfo={captureInfo}
            captured={captures[captureInfo.type]}
            onCapture={() => showImageOptions(captureInfo.type)}
            onRemove={() => removeCapture(captureInfo.type)}
            disabled={uploading}
          />
        ))}

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <Button
            title="Complete Capture"
            onPress={uploadCaptures}
            loading={uploading}
            disabled={!isComplete() || uploading}
          />
          <Button
            title="Back to Mode Selection"
            variant="outline"
            onPress={() => navigation.goBack()}
            disabled={uploading}
          />
        </View>
      </ScrollView>

      {uploading && (
        <LoadingSpinner 
          text={getUploadText()} 
          overlay 
        />
      )}
    </SafeAreaView>
  );
};

const CaptureSection = ({ captureInfo, captured, onCapture, onRemove, disabled }) => {
  const IconComponent = AppIcon[captureInfo.icon];
  
  return (
    <Card>
      <View style={styles.captureHeader}>
        <View style={styles.captureTitleContainer}>
          <IconComponent size={20} color={COLORS.primary} style={styles.captureIcon} />
          <Text style={styles.captureTitle}>{captureInfo.title}</Text>
        </View>
        {captureInfo.required && (
          <View style={styles.requiredBadge}>
            <Text style={styles.requiredText}>Required</Text>
          </View>
        )}
      </View>
    
    <Text style={styles.captureDescription}>
      {captureInfo.description}
    </Text>

    {captured ? (
      <View style={styles.capturedContainer}>
        <Image source={{ uri: captured.uri }} style={styles.capturedImage} />
        <View style={styles.capturedActions}>
          <Button
            title="Re-capture"
            size="small"
            onPress={onCapture}
            disabled={disabled}
            style={styles.actionButton}
            icon={<AppIcon.Camera size={14} color={COLORS.white} />}
          />
          <Button
            title="Remove"
            variant="danger"
            size="small"
            onPress={onRemove}
            disabled={disabled}
            style={styles.actionButton}
          />
        </View>
        <View style={styles.completedBadge}>
          <AppIcon.Check size={14} color={COLORS.white} />
          <Text style={styles.completedText}>Captured</Text>
        </View>
      </View>
    ) : (
      <View style={styles.captureArea}>
        <View style={styles.captureAreaContent}>
          <AppIcon.CameraOutline size={32} color={COLORS.textSecondary} />
          <Text style={styles.captureAreaText}>
            Tap to open camera and capture {captureInfo.title.toLowerCase()}
          </Text>
        </View>
        <Button
          title={`Open Camera - ${captureInfo.type === 'person' ? 'ID' : 'Vehicle'}`}
          onPress={onCapture}
          disabled={disabled}
          icon={<AppIcon.Camera size={16} color={COLORS.white} />}
        />
      </View>
    )}
  </Card>
  );
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
  cardTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  cardSubtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginTop: SIZES.xs,
  },
  progressTitle: {
    fontSize: SIZES.h4,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginBottom: SIZES.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  captureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  captureTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  captureIcon: {
    marginRight: SIZES.sm,
  },
  captureTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  requiredBadge: {
    backgroundColor: COLORS.warning,
    borderRadius: 12,
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs / 2,
  },
  requiredText: {
    fontSize: SIZES.caption,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  captureDescription: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.lg,
  },
  capturedContainer: {
    position: 'relative',
  },
  capturedImage: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.border,
    marginBottom: SIZES.md,
  },
  capturedActions: {
    flexDirection: 'row',
    gap: SIZES.sm,
  },
  actionButton: {
    flex: 1,
  },
  completedBadge: {
    position: 'absolute',
    top: SIZES.sm,
    right: SIZES.sm,
    backgroundColor: COLORS.success,
    borderRadius: 15,
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedText: {
    fontSize: SIZES.caption,
    fontWeight: 'bold',
    color: COLORS.white,
    marginLeft: SIZES.xs,
  },
  captureArea: {
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    borderRadius: SIZES.radius,
    padding: SIZES.xl,
    alignItems: 'center',
    backgroundColor: COLORS.light,
  },
  captureAreaContent: {
    alignItems: 'center',
    marginBottom: SIZES.lg,
  },
  captureAreaText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SIZES.md,
  },
  buttonsContainer: {
    marginTop: SIZES.lg,
    gap: SIZES.md,
  },
});

export default CaptureScreen;
