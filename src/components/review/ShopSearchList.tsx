import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';
import { ShopSearchResponse } from 'types/shop';

interface StyledSSLProps {
  shopList: ShopSearchResponse[] | undefined;
  toggle: () => void;
  onSetSelected: (shopName: string, shopId: number) => void;
}

function ShopSearchList(props: StyledSSLProps) {
  const { shopList, toggle, onSetSelected } = props;

  const handleClick = (item: ShopSearchResponse) => {
    const { shopId, shopName } = item;
    toggle();
    onSetSelected(shopName, shopId);
  };

  return (
    <StyledUl>
      {shopList?.length === 0 ? (
        <span>등록된 소품샵이 없습니다.</span>
      ) : (
        shopList?.map((item) => (
          <li key={item.shopId} onClick={() => handleClick(item)} role="presentation">
            {item.shopName}
          </li>
        ))
      )}
    </StyledUl>
  );
}
export default ShopSearchList;

const StyledUl = styled.ul`
  display: flex;
  position: absolute;
  z-index: 1;
  top: 5.6rem;
  left: 0;
  flex-direction: column;
  width: 48.6rem;
  max-height: 40rem;
  overflow-y: auto;
  box-shadow: 0px 3px 8px rgba(87, 82, 76, 0.15);
  border-radius: 0.5rem;
  background-color: ${theme.colors.grayBg};
  padding: 0.8rem;
  & > span {
    height: 3.6rem;
    line-height: 3.6rem;
    font-weight: 500;
    font-size: 1.4rem;
    color: ${theme.colors.gray1};
  }
  & > li {
    height: 3.6rem;
    line-height: 3.6rem;
    font-weight: 500;
    font-size: 1.4rem;
    padding-left: 0.8rem;
    color: ${theme.colors.black2};
    cursor: pointer;
  }
  & > li:hover {
    background-color: ${theme.colors.purpleBg};
  }
  ${applyMediaQuery('desktop', 'tablet', 'mobile')} {
    top: 3.7rem;
    width: 32.5rem;
    max-height: 30rem;
    padding: 0.6rem;
    & > span {
      height: 2.4rem;
      line-height: 2.4rem;
      font-size: 1rem;
    }
    & > li {
      height: 2.4rem;
      line-height: 2.4rem;
      font-size: 1rem;
      padding-left: 0.5rem;
    }
  }
  ${applyMediaQuery('mobile')} {
    top: 3.7rem;
    width: 31.2rem;
    max-height: 10.5rem;
    padding: 0.6rem;
  }
`;
