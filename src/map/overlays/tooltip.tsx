import { css } from 'styled-components';
import { NewShop as Shop } from 'types/shop';

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
      font-size: 1.2rem;
      line-height: 1.7rem;
      color: ${({ theme }) => theme.colors.black1};
      font-weight: 400;
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
  }
`;

export const getToolTipTemplate = (
  shopInfo: Pick<Shop, 'store' | 'category' | 'landAddress' | 'shopId'>,
): string => {
  const { store, category, landAddress, shopId } = shopInfo;
  const parseCategory = (category: string | string[]) => {
    if (typeof category === 'string') return category;

    if (category.length > 1) return category.join(', ');

    return category[0];
  };

  const tooltipTemplate = `
    <a class="marker-tooltip" href="/shop/detail/${shopId}">
      <div class="marker-tooltip__header">
        <span class="marker-tooltip__title">${store}</span>
        <span class="marker-tooltip__category">${parseCategory(category)}</span>
      </div>
      <p class="marker-tooltip__content">
        ${landAddress}
      </p>
    </a>
  `;

  return tooltipTemplate;
};
