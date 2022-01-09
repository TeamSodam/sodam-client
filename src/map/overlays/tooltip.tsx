import { css } from 'styled-components';
import { ShopInfoInMarker } from 'types/map';

export const tooltipStyle = css`
  .map-overlay-tooltip {
    max-width: 273px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    background-color: white;
    transform: translate(0, calc(-100% - 15px));
    border-radius: 10px;
    padding: 1rem;

    filter: drop-shadow(0px 4px 6px rgba(149, 144, 140, 0.4));

    &__header {
      display: flex;
      align-items: flex-end;
      gap: 10px;

      & > h3 {
        font-size: 16px;
        color: ${({ theme }) => theme.colors.tooltipTitle};
      }

      & > h4 {
        font-size: 12px;
        color: ${({ theme }) => theme.colors.tooltipSub};
      }
    }

    &__content {
      font-size: 14px;
      color: ${({ theme }) => theme.colors.tooltipTitle};
      font-weight: 400;
    }

    &::after {
      border-top: 10px solid white;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 0px solid transparent;
      content: '';
      position: absolute;
      bottom: -9px;
      left: 50%;
      transform: translateX(calc(-50% - 0.5rem));
    }
  }
`;

export const getToolTipTemplate = (shopInfo: ShopInfoInMarker): string => {
  const { name, category, address } = shopInfo;
  const tooltipTemplate = `
    <div class="map-overlay-tooltip">
      <div class="map-overlay-tooltip__header">
        <h3>${name}</h3>
        <h4>${category}</h4>
      </div>
      <p class="map-overlay-tooltip__content">
        ${address}
      </p>
    </div>
  `;

  return tooltipTemplate;
};
