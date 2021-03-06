import { MoreFilterList } from 'constants/dropdownOptionList';
import { MutableRefObject } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';
import { ShopCategoryType } from 'types/shop';

interface StyledILDProps {
  onSelectedItem: (item: ShopCategoryType) => void;
  listRef: MutableRefObject<null>;
}

function ItemsListDiv(props: StyledILDProps) {
  const { onSelectedItem, listRef } = props;

  const handleClick = (item: ShopCategoryType) => {
    onSelectedItem(item);
  };
  return (
    <StyledUl ref={listRef}>
      {MoreFilterList.map((item) => (
        <li key={item} onClick={() => handleClick(item)} role="presentation">
          {item}
        </li>
      ))}
    </StyledUl>
  );
}

export default ItemsListDiv;

const StyledUl = styled.ul`
  display: flex;
  position: absolute;
  z-index: 1;
  top: 5.6rem;
  left: 0;
  flex-direction: column;
  width: 29.7rem;
  box-shadow: 0px 3px 8px rgba(87, 82, 76, 0.15);
  border-radius: 0.5rem;
  background-color: ${theme.colors.grayBg};
  padding: 1.2rem 0.8rem;

  & > li {
    height: 2.8rem;
    line-height: 2.8rem;
    font-weight: 500;
    font-size: 1.4rem;
    color: ${theme.colors.black2};
    cursor: pointer;
  }
  & > li:hover {
    background-color: ${theme.colors.purpleBg};
  }

  ${applyMediaQuery('desktop', 'tablet', 'mobile')} {
    top: 3.6rem;
    width: 18.8rem;
    padding: 0.8rem 0.6rem;

    & > li {
      height: 1.9rem;
      line-height: 1.9rem;
      font-size: 1rem;
      padding: 0 0.6rem;
    }
  }
  ${applyMediaQuery('mobile')} {
    width: 17.8rem;

    & > li {
      height: 2.4rem;
      line-height: 2.4rem;
    }
  }
`;
