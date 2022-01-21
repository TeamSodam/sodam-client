import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { Item } from 'types/review';
import { PriceOptionList, ShopCategoryType } from 'types/shop';

import ItemsListDiv from './ItemsListDiv';

interface StyledDDIProps {
  idx: number;
  currentOpen: number;
  onSetCurrentOpen: (idx: number) => void;
  selectedItem: ShopCategoryType | undefined;
  handleItemSubmit: (
    data: ShopCategoryType | PriceOptionList,
    index: number,
    type: keyof Item,
  ) => void;
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
        <Image src={'/assets/ic_dropdown.svg'} width={14} height={10} alt="dropdown" />
      </StyledWrapper>
      {isOpen && <ItemsListDiv onSelectedItem={onSelectedItem} />}
    </StyledRoot>
  );
}

export default DropdownItem;

const StyledRoot = styled.div`
  display: flex;
  position: relative;
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
`;
