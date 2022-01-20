import styled from 'styled-components';
import { theme } from 'styles/theme';
import { ShopSearchResponse } from 'types/shop';

interface StyledSSLProps {
  shopList: ShopSearchResponse[] | undefined;
  toggle: () => void;
  onSetSelected: (shop: string) => void;
}

function ShopSearchList(props: StyledSSLProps) {
  const { shopList, toggle, onSetSelected } = props;

  const handleClick = (value: string) => {
    toggle();
    onSetSelected(value);
  };

  return (
    <StyledUl>
      {shopList?.length === 0 ? (
        <span>등록된 소품샵이 없습니다.</span>
      ) : (
        shopList?.map((item) => (
          <li key={item.shopId} onClick={() => handleClick(item.shopName)} role="presentation">
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
    color: ${theme.colors.black2};
    cursor: pointer;
  }
  &>li: hover {
    background-color: ${theme.colors.purpleBg};
  }
`;
