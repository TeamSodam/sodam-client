import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

import ItemsListDiv from './ItemsListDiv';

function DropdownItem() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  return (
    <StyledRoot>
      <StyledWrapper onClick={toggle}>
        <span>어떤 소품을 구매하셨나요?(선택)</span>
        <Image src={'/assets/ic_dropdown.svg'} width={14} height={10} alt="dropdown" />
      </StyledWrapper>
      {isOpen && <ItemsListDiv />}
    </StyledRoot>
  );
}

export default DropdownItem;

const StyledRoot = styled.div`
  display: flex;
  position: relative;
`;
const StyledWrapper = styled.div`
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
    color: ${theme.colors.gray1};
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2rem;
  }
`;
