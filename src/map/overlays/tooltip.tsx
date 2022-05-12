import parseCategorySafely from 'src/utils/parseCategorySafely';
import { css } from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { Shop } from 'types/shop';

export const tooltipStyle = css`
  .marker-tooltip {
    width: 27.3rem;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    background-color: white;
    margin-top: calc(-50%);
    border-radius: 10px;
    padding: 1.6rem 2.4rem;

    text-decoration: none;

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
      width: 100%;
      height: 2rem;
      font-size: 1.2rem;
      line-height: 1.7rem;
      color: ${({ theme }) => theme.colors.black1};
      font-weight: 400;

      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      word-wrap: break-all;
    }

    &::after {
      border-top: 1rem solid white;
      border-left: 0.5rem solid transparent;
      border-right: 0.5rem solid transparent;
      border-bottom: 0px solid transparent;
      content: '';
      position: absolute;
      bottom: -1rem;
      left: 50%;
      transform: translateX(calc(-50% - 0.5rem));
    }

    &:hover {
      cursor: pointer;
      transform: scale(1.05);
    }

    ${applyMediaQuery('mobile')} {
      transform: scale(0.65) translateY(50%);
    }
  }
`;

export const getToolTipTemplate = (
  shopInfo: Pick<Shop, 'shopName' | 'category' | 'landAddress' | 'shopId'>,
): string => {
  const { shopName, category, landAddress, shopId } = shopInfo;

  const tooltipTemplate = `
    <a class="marker-tooltip" href="/shop/detail/${shopId}">
      <div class="marker-tooltip__header">
        <span class="marker-tooltip__title">${shopName}</span>
        <span class="marker-tooltip__category">${parseCategorySafely(category)}</span>
      </div>
      <p class="marker-tooltip__content">
        ${landAddress}
      </p>
    </a>
  `;

  return tooltipTemplate;
};
