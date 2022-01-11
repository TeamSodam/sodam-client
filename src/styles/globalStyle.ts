import { tooltipStyle } from 'map/overlays/tooltip';
import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

import { applyMediaQuery } from './mediaQuery';

const GlobalStyles = createGlobalStyle` 
  ${reset}

  * {
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;  

    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 500;

    font-size: 62.5%;
    
    ${applyMediaQuery('wide')} {
      font-size: 62.5%;
    }

  }

  button:hover {
    cursor: pointer
  }

  ${tooltipStyle}
`;

export default GlobalStyles;
