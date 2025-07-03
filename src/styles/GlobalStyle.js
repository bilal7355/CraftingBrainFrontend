// src/styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Arial', sans-serif;
    color: #333;
    background-color: #f7f7f7;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .container {
    width: 80%;
    margin: 0 auto;
  }
`;

export default GlobalStyle;
