import { DefaultTheme } from 'styled-components';

const colors = {
  yellow: '#FFC700',
  orange: '#FFA800',
  background_orange: '#FFF8EC',
};

export type ColorTypes = typeof colors;

export const theme: DefaultTheme = {
  colors: colors,
};
