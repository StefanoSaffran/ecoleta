import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme { //eslint-disable-line
    title: string;

    colors: {
      background: string;
      text: string;
      title: string;

      cardBackground: string;
      inputBackground: string;
      footer: string;
      placeholder: string;
    };
  }
}
