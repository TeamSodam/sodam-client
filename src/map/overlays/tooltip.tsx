import parseCategorySafely from 'src/utils/parseCategorySafely';
import { css } from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { Shop } from 'types/shop';

export const tooltipStyle = css`
  .marker-tooltip {
    text-align: unset;
    border: none;
    width: 27.3rem;
    max-width: 27.3rem;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    background-color: white;
    margin-top: -52.5%;
    border-radius: 10px;
    padding: 1.6rem 2.4rem;

    text-decoration: none;
    white-space: normal;

    filter: drop-shadow(0px 4px 6px rgba(149, 144, 140, 0.4));

    &.paged {
      margin-top: -55%;
    }

    &__title {
      font-size: 1.6rem;
      line-height: 2.3rem;
      color: ${({ theme }) => theme.colors.purpleText};
      font-weight: 700;
      word-wrap: normal;
      white-space: pre;
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

    &__footer {
      display: inline-block;
      margin: 0 auto;
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.purpleMain};
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
    }

    ${applyMediaQuery('mobile')} {
      transform: scale(0.65) translateY(50%);

      &:hover {
        transform: scale(0.65) translateY(50%);
      }
    }

    .tooltip-prev,
    .tooltip-next {
      all: unset;
      height: 90%;
      font-size: 2.4rem;
      position: absolute;
      color: white;
      padding: 0 1rem 0.2rem 1rem;
      top: 50%;
      opacity: 0.85;
      background-color: ${({ theme }) => theme.colors.purpleMain};

      &:hover {
        background-color: ${({ theme }) => theme.colors.purpleText};
        opacity: 1;
      }
    }

    .tooltip-prev {
      border-bottom-left-radius: 8px;
      border-top-left-radius: 8px;
      left: 0;
      transform: translate(-100%, -50%);
    }
    .tooltip-next {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      right: 0;
      transform: translate(100%, -50%);
    }
  }
`;

export const getToolTipTemplate = (
  shopInfo: Pick<Shop, 'shopName' | 'category' | 'landAddress' | 'shopId'>,
  navigate: (path: string) => void,
): HTMLAnchorElement => {
  const { shopName, category, landAddress, shopId } = shopInfo;

  const tooltip = document.createElement('a');
  tooltip.className = 'marker-tooltip';
  tooltip.onclick = (e: MouseEvent) => {
    e.preventDefault();
    navigate(`/shop/detail/${shopId}`);
  };

  const tooltipTemplate = `
    <div class="marker-tooltip__header">
      <span class="marker-tooltip__title">${shopName}</span>
      <span class="marker-tooltip__category">${parseCategorySafely(category)}</span>
    </div>
    <p class="marker-tooltip__content">
      ${landAddress}
    </p>
  `;

  tooltip.innerHTML = tooltipTemplate;

  return tooltip;
};

export const getPagedToolTipTemplate = (
  shopList: Array<Pick<Shop, 'shopName' | 'category' | 'landAddress' | 'shopId'>>,
  navigate: (path: string) => void,
): { tooltip: HTMLButtonElement; setPage: (nextPage: number) => void } => {
  let page = 0;

  const tooltip = document.createElement('button');
  tooltip.className = 'marker-tooltip paged';
  tooltip.onclick = () => navigate(`/shop/detail/${shopList[page].shopId}`);

  const setPage = (nextPage: number) => {
    page = nextPage;
    render();
  };

  const attachEvent = () => {
    const prevBtn = tooltip.querySelector('.tooltip-prev');
    const nextBtn = tooltip.querySelector('.tooltip-next');

    if (!prevBtn || !nextBtn) return tooltip;
    if (!(prevBtn instanceof HTMLButtonElement) || !(nextBtn instanceof HTMLButtonElement))
      return tooltip;

    prevBtn.onclick = (e: MouseEvent) => onClickPagination(e, -1);
    nextBtn.onclick = (e: MouseEvent) => onClickPagination(e, 1);
  };

  const onClickPagination = (e: MouseEvent, dir: -1 | 1) => {
    e.stopPropagation();
    if (page + dir < 0 || page + dir === shopList.length) return;
    page += dir;
    render();
  };

  const template = () => `
    <div class="marker-tooltip__header">
      <span class="marker-tooltip__title">${shopList[page].shopName}</span>
      <span class="marker-tooltip__category">${parseCategorySafely(shopList[page].category)}</span>
    </div>
    <p class="marker-tooltip__content">
      ${shopList[page].landAddress}
    </p>
    <span class="marker-tooltip__footer">${page + 1} / ${shopList.length}</span>
    <button class="tooltip-prev">&lsaquo;</button>  
    <button class="tooltip-next">&rsaquo;</button>  
  `;

  const render = () => {
    tooltip.innerHTML = template();
    attachEvent();
  };

  render();
  return { tooltip, setPage };
};
