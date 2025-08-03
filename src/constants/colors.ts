export const COLORS = {
  primary: '#00BCD4',
  primaryDark: '#0097A7',
  secondary: '#8B5CF6',
  background: '#FFFFFF',
  surface: '#F9F9F9',
  text: '#333333',
  textSecondary: '#666666',
  textLight: '#999999',
  border: 'rgba(227, 227, 227, 1)',
  error: '#F44336',
  success: '#4CAF50',
  warning: '#FF9800',
  dark: '#1A1A1A',
  darkBlue: '#042541',
  gray: '#E4E4E4'
} as const;

export type ColorScheme = typeof COLORS;
