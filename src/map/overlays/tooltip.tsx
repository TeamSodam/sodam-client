import { css } from 'styled-components';

export const tooltipStyle = css`
  .map-overlay-tooltip {
    position: relative;
    transform: translate(0, calc(-100% - 15px));
    display: flex;
    flex-direction: column;
    background-color: black;
    padding: 1rem;
    &__header {
      display: flex;

      & > h3 {
        font-size: 1.2rem;
      }

      & > h4 {
        font-size: 1rem;
        color: gray;
      }
    }

    &__content {
    }

    &::after {
      border-top: 10px solid black;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 0px solid transparent;
      content: '';
      position: absolute;
      bottom: -10px;
      left: calc(50% - 0.5rem);
    }
  }
`;

export const getToolTipTemplate = (): string => {
  const tooltipTemplate = `
    <div class="map-overlay-tooltip">
      <div class="map-overlay-tooltip__header">
        <h3>소품샵 이름</h3>
        <h4>소품샵 분류</h4>
      </div>
      <p class="map-overlay-tooltip__content">
        소품샵의 상세한 주소가 나타남.
      </p>
    </div>
  `;

  return tooltipTemplate;
};
