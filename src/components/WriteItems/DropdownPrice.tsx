import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

import PriceList from './PriceList';

interface StyledDPProps {
  idx: number;
  currentOpen: number;
  onSetCurrentOpen: (idx: number) => void;
}

function DropdownPrice(props: StyledDPProps) {
  const { idx, currentOpen, onSetCurrentOpen } = props;
  const [selectedPrice, setSelectedPrice] = useState('0');
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  const onSelectedPrice = (price: string) => {
    setSelectedPrice(price);
    toggle();
  };

  const handleClick = () => {
    onSetCurrentOpen(idx);
    toggle();
  };

  useEffect(() => {
    if (idx !== currentOpen && isOpen) {
      toggle();
    }
  }, [currentOpen]);

  return (
    <StyledRoot>
      <StyledWrapper onClick={handleClick}>
        <span>{selectedPrice}</span>
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

const StyledWrapper = styled.div`
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

  &>span: first-child {
    color: ${theme.colors.gray1};
  }

  & > span {
    color: ${theme.colors.black1};
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2rem;
  }
`;
