import { StyleSheet } from 'react-native';
import { LAYOUT } from '../constants/layout';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shadow: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  paddingHorizontal: {
    paddingHorizontal: LAYOUT.spacing.md,
  },
  paddingVertical: {
    paddingVertical: LAYOUT.spacing.md,
  },
  marginBottom: {
    marginBottom: LAYOUT.spacing.md,
  },
  marginTop: {
    marginTop: LAYOUT.spacing.md,
  },
});