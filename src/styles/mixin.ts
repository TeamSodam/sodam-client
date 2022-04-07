import { css } from 'styled-components';

import { applyMediaQuery } from './mediaQuery';

export const applyReponsiveWidth = css`
  ${applyMediaQuery('mobile')} {
    width: 312px;
  }
  ${applyMediaQuery('desktop')} {
    width: 800px;
  }
  ${applyMediaQuery('wide')} {
    width: 1195px;
  }
`;
