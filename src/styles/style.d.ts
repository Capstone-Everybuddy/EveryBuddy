import 'styled-components';
import { ColorTypes } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorTypes;
  }
}
