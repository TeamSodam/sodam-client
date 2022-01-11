import { css } from 'styled-components';
import { ShopInfoInMarker } from 'types/map';

export const tooltipStyle = css`
  .marker-tooltip {
    width: 27.3rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    gap: 0.5rem;

    background-color: white;
    transform: translate(0, calc(-100% - 15px));
    border-radius: 10px;
    padding: 1.6rem 2.4rem;

    filter: drop-shadow(0px 4px 6px rgba(149, 144, 140, 0.4));

    &__title {
      font-size: 1.6rem;
      line-height: 2.3rem;
      color: ${({ theme }) => theme.colors.purpleText};
      font-weight: 700;
      word-wrap: break-word;
      white-space: pre-wrap;
      margin-right: 0.8rem;
    }

    &__category {
      font-weight: 500;
      font-size: 1.2rem;
      line-height: 1.7rem;
      color: ${({ theme }) => theme.colors.gray1};
    }

    &__content {
      font-size: 1.2rem;
      line-height: 1.7rem;
      color: ${({ theme }) => theme.colors.black1};
      font-weight: 400;
    }

    &::after {
      border-top: 1rem solid white;
      border-left: 1rem solid transparent;
      border-right: 1rem solid transparent;
      border-bottom: 0px solid transparent;
      content: '';
      position: absolute;
      bottom: -1rem;
      left: 50%;
      transform: translateX(calc(-50% - 0.5rem));
    }
  }
`;

export const getToolTipTemplate = (shopInfo: ShopInfoInMarker): string => {
  const { name, category, address } = shopInfo;
  const tooltipTemplate = `
    <div class="marker-tooltip">
      <div class="marker-tooltip__header">
        <span class="marker-tooltip__title">${name}</span>
        <span class="marker-tooltip__category">${category}</span>
      </div>
      <p class="marker-tooltip__content">
        ${address}
      </p>
    </div>
  `;

  return tooltipTemplate;
};
