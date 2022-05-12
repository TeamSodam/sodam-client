import useMedia from 'hooks/useMedia';
import LeftArrIC from 'public/assets/ic_leftArr.svg';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { ShopAreaResponse } from 'types/shop';

import OptionList from './OptionList';
import ShopList from './ShopList';

export type OptionLabel = '인기 순' | '내가 저장한';
interface LocalShopInfoProps {
  currentOption: string;
  toggleOption: (option: OptionLabel) => void;
  shopList: ShopAreaResponse[];
}

function LocalShopInfo(props: LocalShopInfoProps) {
  const { currentOption, toggleOption, shopList } = props;
  const { isMobile, isTablet } = useMedia();
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen((prevState) => !prevState);

  const isSmallDevice = isMobile || isTablet;
  const StyledShopInfoContainer = isSmallDevice ? StyledSection : StyledSidebar;

  return (
    <StyledShopInfoContainer isOpen={isOpen}>
      {((!isSmallDevice && isOpen) || isSmallDevice) && (
        <>
          <OptionList currentOption={currentOption} toggleOption={toggleOption} />
          <ShopList shopList={shopList} />
        </>
      )}
      {!isSmallDevice && (
        <ToggleBtn onClick={toggle}>
          <ToggleArrowIcon isOpen={isOpen} />
        </ToggleBtn>
      )}
    </StyledShopInfoContainer>
  );
}

const StyledSidebar = styled.aside<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => (props.isOpen ? '40.4%' : 0)};
  height: 100%;
  z-index: 2;

  display: flex;
  background-color: white;
  border: 0.1rem solid ${({ theme }) => theme.colors.grayBg};

  transition: width ease-in 100ms;
`;

const StyledSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ToggleBtn = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(100%, -50%);

  width: 4.1rem;
  height: 9.92%;

  background-color: white;
  border-radius: 0 10px 10px 0;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray2};
`;

const ToggleArrowIcon = styled(LeftArrIC)<{ isOpen: boolean }>`
  ${(props) =>
    !props.isOpen &&
    css`
      transform: rotate(180deg);
    `};
`;

export default LocalShopInfo;
