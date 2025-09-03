import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#667eea',
  primaryDark: '#764ba2',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
  white: '#ffffff',
  black: '#000000',
  
  // Status colors
  pending: '#fff3cd',
  pendingText: '#856404',
  completed: '#d4edda',
  completedText: '#155724',
  error: '#f8d7da',
  errorText: '#721c24',
  
  // UI colors
  background: '#f5f5f5',
  surface: '#ffffff',
  border: '#e1e5e9',
  placeholder: '#6c757d',
  text: '#333333',
  textSecondary: '#666666',
  
  // Gradient
  gradientStart: '#667eea',
  gradientEnd: '#764ba2',
};

export const SIZES = {
  // Window dimensions
  width,
  height,
  
  // Font sizes
  h1: 24,
  h2: 20,
  h3: 18,
  h4: 16,
  body: 14,
  caption: 12,
  
  // Spacing
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  
  // Radius
  radius: 10,
  radiusLarge: 20,
  
  // Button
  buttonHeight: 50,
  buttonRadius: 10,
  
  // Input
  inputHeight: 50,
  inputRadius: 10,
  
  // Card
  cardPadding: 20,
  cardRadius: 15,
  
  // Header
  headerHeight: 60,
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  light: 'System',
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.27,
    elevation: 10,
  },
  heavy: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10.32,
    elevation: 16,
  },
};

export const ANIMATIONS = {
  fast: 200,
  medium: 300,
  slow: 500,
};

export default {
  COLORS,
  SIZES,
  FONTS,
  SHADOWS,
  ANIMATIONS,
};
