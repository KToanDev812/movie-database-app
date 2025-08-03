import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { COLORS, LAYOUT } from '../../constants';

interface LoadingSpinnerProps {
  /** Loading message to display */
  message?: string;
  /** Size of the spinner */
  size?: 'small' | 'large';
  /** Custom color for the spinner */
  color?: string;
  /** Whether to show the component */
  visible?: boolean;
}

/**
 * Reusable loading spinner component with optional message
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
  size = 'large',
  color = COLORS.primary,
  visible = true,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: LAYOUT.spacing.lg,
  },
  message: {
    marginTop: LAYOUT.spacing.md,
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
