import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      [key: string]: string;
    };
    clientWidth: number;
    availableWidth: number;
  }
}
