import { miniTooltipStyle } from 'map/overlays/miniTooltip';
import { tooltipStyle } from 'map/overlays/tooltip';
import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyles = createGlobalStyle` 
  ${reset}
  * {
    box-sizing: border-box;
    font-family: 'Noto Sans KR' !important;
    font-style: normal;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-size: 62.5%;
  }
  body > div {
    height: 100%;
  }

  button:hover {
    cursor: pointer
  }

  ${tooltipStyle}
  ${miniTooltipStyle}
`;

export default GlobalStyles;
