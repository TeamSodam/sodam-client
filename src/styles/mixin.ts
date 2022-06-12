import { availableWidths } from 'constants/availableWidths';
import { css } from 'styled-components';

import { applyMediaQuery, Device } from './mediaQuery';

const DEVICE_LIST: Device[] = ['mobile', 'tablet', 'desktop', 'wide'];

export const applyReponsiveWidth = css`
  ${DEVICE_LIST.map(
    (deviceInfo) => `
    ${applyMediaQuery(deviceInfo)} {
      width: ${availableWidths[deviceInfo]}px;
    }
  `,
  ).join('')}
`;

export const getBackgroundImageCss = (url: string) => css`
  background-color: transparent;
  background-image: url(${url});
  background-repeat: no-repeat;
  background-size: contain;
`;
