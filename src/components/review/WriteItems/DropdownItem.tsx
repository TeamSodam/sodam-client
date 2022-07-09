import ImageDiv from 'components/common/ImageDiv';
import useClickOutside from 'hooks/useClickOutside';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';
import { Item } from 'types/review';
import { PriceList, ShopCategoryType } from 'types/shop';

import ItemsListDiv from './ItemsListDiv';

interface StyledDDIProps {
  idx: number;
  currentOpen: number;
  onSetCurrentOpen: (idx: number) => void;
  selectedItem: ShopCategoryType | undefined;
  handleItemSubmit: (data: ShopCategoryType | PriceList, index: number, type: keyof Item) => void;
}

function DropdownItem(props: StyledDDIProps) {
  const {
    idx,
    currentOpen,
    onSetCurrentOpen,
    selectedItem = '어떤 소품을 구매하셨나요?(선택)',
    handleItemSubmit,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const toggle = () => setIsOpen((prevIsOpen) => !prevIsOpen);
  const listRef = useRef(null);
  useClickOutside(listRef, () => setIsOpen(false), isOpen);

  const onSelectedItem = (item: ShopCategoryType) => {
    handleItemSubmit(item, idx, 'itemName');
    toggle();
    setIsSelected(true);
  };

  const handleClick = () => {
    onSetCurrentOpen(idx);
    toggle();
  };

  useEffect(() => {
    if (idx !== currentOpen && isOpen) {
      toggle();
    }
  }, [idx, isOpen, currentOpen]);

  return (
    <StyledRoot>
      <StyledWrapper onClick={handleClick} isSelected={isSelected}>
        <span>{selectedItem}</span>
        <ImageDiv
          className="dropdown-icon"
          src={'/assets/ic_dropdown.svg'}
          layout="fill"
          alt="dropdown"
        />
      </StyledWrapper>
      {isOpen && <ItemsListDiv listRef={listRef} onSelectedItem={onSelectedItem} />}
    </StyledRoot>
  );
}

export default DropdownItem;

const StyledRoot = styled.div`
  display: flex;
  position: relative;
  .dropdown-icon {
    position: relative;
    width: 1.4rem;
    height: 1rem;
    ${applyMediaQuery('desktop', 'tablet', 'mobile')} {
      width: 0.9rem;
      height: 0.6rem;
    }
  }
`;
const StyledWrapper = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 29.7rem;
  height: 4.8rem;
  border-radius: 0.5rem;
  background-color: ${theme.colors.grayBg};
  padding: 0 1.6rem;
  cursor: pointer;

  & > span {
    color: ${({ isSelected }) => (isSelected ? theme.colors.black1 : theme.colors.gray1)};
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2rem;
  }

  ${applyMediaQuery('desktop', 'tablet', 'mobile')} {
    width: 18.8rem;
    height: 3.1rem;
    padding: 0 1.2rem;

    & > span {
      font-size: 1rem;
      line-height: 1.3rem;
    }
  }
  ${applyMediaQuery('mobile')} {
    width: 17.8rem;
    height: 3.6rem;
    padding: 0 1.2rem;
  }
`;
