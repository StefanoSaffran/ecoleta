import { createGlobalStyle } from 'styled-components';

// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-toggle/style.css';

export default createGlobalStyle`
  :root {
    --primary-color: #34CB79;
    --title-color: ${({ theme }) => theme.colors.title};
    --text-color: ${({ theme }) => theme.colors.text};
    --background-color: ${({ theme }) => theme.colors.background};
    --cardBackground-color: ${({ theme }) => theme.colors.cardBackground};
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0px 1000px --cardBackground-color inset;
    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
    -webkit-transition-delay: 9999s;
  }

  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    background: var(--background-color);
    color: var(--text-color);

  }

  body, input, button, input::placeholder, textarea::placeholder {
    font-family: Roboto, Arial, Helvetica, sans-serif;
  }

  input::placeholder, textarea::placeholder {
    color: #A0A0B2;
  }

  h1, h2, h3, h4, h5, h5, strong {
    color: var(--title-color);
  font-family: Ubuntu;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;
