import { css } from 'styled-components';
import { Shop } from 'types/shop';

export const miniTooltipStyle = css`
  .marker-miniTooltip {
    position: relative;
    background-color: white;
    margin-top: -10rem;
    border-radius: 10px;
    padding: 1.1rem 2.4rem;
    text-align: center;

    filter: drop-shadow(0px 4px 6px rgba(149, 144, 140, 0.4));

    &__title {
      font-size: 1.6rem;
      line-height: 2rem;
      color: ${({ theme }) => theme.colors.black1};
      font-weight: 500;
    }

    &::after {
      border-top: 1rem solid white;
      border-left: 0.5rem solid transparent;
      border-right: 0.5rem solid transparent;
      border-bottom: 0px solid transparent;
      content: '';
      position: absolute;
      bottom: -0.9rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

export const getMiniToolTipTemplate = (shopInfo: Pick<Shop, 'store'>): string => {
  const { store } = shopInfo;

  const tooltipTemplate = `
    <div class="marker-miniTooltip">
      <span class="marker-miniTooltip__title">${store}</span>
    </div>
  `;

  return tooltipTemplate;
};
