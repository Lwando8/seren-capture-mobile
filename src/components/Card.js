import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

const Card = ({ children, style, noPadding = false, noShadow = false }) => {
  return (
    <View style={[
      styles.card,
      noPadding ? styles.noPadding : styles.withPadding,
      noShadow ? null : SHADOWS.light,
      style
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.cardRadius,
    marginVertical: SIZES.sm,
  },
  withPadding: {
    padding: SIZES.cardPadding,
  },
  noPadding: {
    padding: 0,
  },
});

export default Card;
