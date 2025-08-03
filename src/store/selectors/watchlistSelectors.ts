export const LIGHT_COLORS = {
  primary: '#00BCD4',
  primaryDark: '#0097A7',
  secondary: '#8B5CF6',
  background: '#FFFFFF',
  surface: '#F9F9F9',
  text: '#333333',
  textSecondary: '#666666',
  textLight: '#999999',
  border: '#E0E0E0',
  error: '#F44336',
  success: '#4CAF50',
  warning: '#FF9800',
  dark: '#1A1A1A',
} as const;

export const DARK_COLORS = {
  primary: '#00BCD4',
  primaryDark: '#0097A7',
  secondary: '#8B5CF6',
  background: '#121212',
  surface: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#CCCCCC',
  textLight: '#999999',
  border: '#333333',
  error: '#F44336',
  success: '#4CAF50',
  warning: '#FF9800',
  dark: '#000000',
} as const;

export type ColorScheme = typeof LIGHT_COLORS;
