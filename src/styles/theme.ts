import { DefaultTheme } from 'styled-components';

const colors = {
  yellow: '#FFC700',
  orange: '#FFA800',
  background_orange: '#FFF8EC',
  gray: '#D0D0D0',
  lightgray: '#E7E7E7',
  green: '#ADD974',
  darkgray: '#7E7E7E',
};

export type ColorTypes = typeof colors;

export const theme: DefaultTheme = {
  colors: colors,
};
