import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { Item } from 'types/review';
import { PriceOptionList, ShopCategoryType } from 'types/shop';

import PriceList from './PriceList';

interface StyledDPProps {
  idx: number;
  currentOpen: number;
  onSetCurrentOpen: (idx: number) => void;
  selectedItem: PriceOptionList | undefined;
  handleItemSubmit: (
    data: ShopCategoryType | PriceOptionList,
    index: number,
    type: keyof Item,
  ) => void;
}

function DropdownPrice(props: StyledDPProps) {
  const { idx, currentOpen, onSetCurrentOpen, selectedItem = '0', handleItemSubmit } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const toggle = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  const onSelectedPrice = (price: PriceOptionList) => {
    handleItemSubmit(price, idx, 'price');
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
        <span>원</span>
        <Image src={'/assets/ic_dropdown.svg'} width={14} height={10} alt="dropdown" />
      </StyledWrapper>
      {isOpen && <PriceList onSelectedPrice={onSelectedPrice} />}
    </StyledRoot>
  );
}

export default DropdownPrice;

const StyledRoot = styled.div`
  display: flex;
  position: relative;
`;

const StyledWrapper = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 17.3rem;
  height: 4.8rem;
  border-radius: 0.5rem;
  background-color: ${theme.colors.grayBg};
  padding: 0 1.6rem;
  gap: 0.6rem;
  cursor: pointer;

  & > span:first-child {
    color: ${({ isSelected }) => (isSelected ? theme.colors.black1 : theme.colors.gray1)};
  }

  & > span {
    color: ${theme.colors.black1};
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2rem;
  }
`;
