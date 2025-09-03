import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

const Button = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'large',
  icon,
  style,
  textStyle,
  ...props
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    
    // Size variants
    if (size === 'small') {
      baseStyle.push(styles.buttonSmall);
    } else if (size === 'medium') {
      baseStyle.push(styles.buttonMedium);
    } else {
      baseStyle.push(styles.buttonLarge);
    }
    
    // Color variants
    if (variant === 'secondary') {
      baseStyle.push(styles.buttonSecondary);
    } else if (variant === 'danger') {
      baseStyle.push(styles.buttonDanger);
    } else if (variant === 'outline') {
      baseStyle.push(styles.buttonOutline);
    } else {
      baseStyle.push(styles.buttonPrimary);
    }
    
    // Disabled state
    if (disabled || loading) {
      baseStyle.push(styles.buttonDisabled);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.buttonText];
    
    if (size === 'small') {
      baseStyle.push(styles.buttonTextSmall);
    } else if (size === 'medium') {
      baseStyle.push(styles.buttonTextMedium);
    } else {
      baseStyle.push(styles.buttonTextLarge);
    }
    
    if (variant === 'outline') {
      baseStyle.push(styles.buttonTextOutline);
    }
    
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      <View style={styles.buttonContent}>
        {loading ? (
          <ActivityIndicator 
            size="small" 
            color={variant === 'outline' ? COLORS.primary : COLORS.white} 
          />
        ) : (
          <>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: SIZES.buttonRadius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SIZES.xs,
    ...SHADOWS.light,
  },
  buttonSmall: {
    height: 36,
    paddingHorizontal: SIZES.md,
  },
  buttonMedium: {
    height: 42,
    paddingHorizontal: SIZES.lg,
  },
  buttonLarge: {
    height: SIZES.buttonHeight,
    paddingHorizontal: SIZES.xl,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
  },
  buttonSecondary: {
    backgroundColor: COLORS.secondary,
  },
  buttonDanger: {
    backgroundColor: COLORS.danger,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  buttonDisabled: {
    backgroundColor: COLORS.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.white,
  },
  buttonTextSmall: {
    fontSize: SIZES.caption,
  },
  buttonTextMedium: {
    fontSize: SIZES.body,
  },
  buttonTextLarge: {
    fontSize: SIZES.h4,
  },
  buttonTextOutline: {
    color: COLORS.primary,
  },
  iconContainer: {
    marginRight: SIZES.sm,
  },
});

export default Button;
