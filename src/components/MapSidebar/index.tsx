import ShopElement from 'components/MapSidebar/ShopElement';
import ActivePinIC from 'public/assets/ic_active_marker.svg';
import InActivePinIC from 'public/assets/ic_basic_marker.svg';
import LeftArrIC from 'public/assets/ic_leftArr.svg';
import StarIC from 'public/assets/ic_star.svg';
import EmptyStarIC from 'public/assets/ic_white_star.svg';
import { useState } from 'react';
import styled, { css } from 'styled-components';
import { ShopAreaResponse } from 'types/shop';

interface StyledMapProps {
  isOpen?: boolean;
  isActive?: boolean;
}

interface MapSidebarProps {
  currentOption: string;
  toggleOption: (option: OptionLabel) => void;
  shopList: ShopAreaResponse[];
}

export type OptionLabel = '인기 순' | '내가 저장한';
interface OptionInfo {
  icon: Array<React.FC<React.SVGProps<SVGSVGElement>>>;
  label: OptionLabel;
}

function MapSidebar(props: MapSidebarProps) {
  const { currentOption, toggleOption, shopList } = props;
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen((prevState) => !prevState);

  const optionList: OptionInfo[] = [
    {
      icon: [ActivePinIC, InActivePinIC],
      label: '인기 순',
    },
    {
      icon: [EmptyStarIC, StarIC],
      label: '내가 저장한',
    },
  ];

  const showOptions = () =>
    optionList.map((option) => {
      const [ActiveIcon, InActiveIcon] = option.icon;
      const isActive = currentOption === option.label;
      const CurrentIcon = isActive ? ActiveIcon : InActiveIcon;
      return (
        <Option key={option.label} onClick={() => toggleOption(option.label)} isActive={isActive}>
          <CurrentIcon />
          <span>{option.label}</span>
        </Option>
      );
    });

  return (
    <StyledSidebar isOpen={isOpen}>
      {isOpen && (
        <>
          <OptionList>{showOptions()}</OptionList>

          {shopList.length ? (
            <ShopList>
              {shopList.map((shop) => (
                <ShopElement shopInfo={shop} key={shop.shopId} />
              ))}
            </ShopList>
          ) : (
            <EmptyShopList>
              <span>선택 지역에 해당하는 저장한 소품샵이 없어요</span>
            </EmptyShopList>
          )}
        </>
      )}
      <ToggleBtn onClick={toggle}>
        <ToggleArrowIcon isOpen={isOpen} />
      </ToggleBtn>
    </StyledSidebar>
  );
}

const StyledSidebar = styled.aside<StyledMapProps>`
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

const OptionList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: 0.1rem solid ${({ theme }) => theme.colors.gray2};
`;

const Option = styled.li<StyledMapProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.72%;

  width: 100%;
  height: 9.2%;
  overflow: hidden;

  ${(props) =>
    props.isActive
      ? css`
          color: white;
          background-color: ${({ theme }) => theme.colors.purpleText};
          box-shadow: 0.05rem 0.05rem 0.05rem 0.05rem ${({ theme }) => theme.colors.purpleText};
        `
      : css`
          color: ${({ theme }) => theme.colors.purpleText};
          box-shadow: 0.05rem 0.05rem 0.05rem 0.05rem ${({ theme }) => theme.colors.gray2};
        `};

  &:hover {
    cursor: pointer;
  }

  & > * {
    transform: scale(0.7);
  }
`;

const ShopList = styled.ul`
  flex: 5.22;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const EmptyShopList = styled.div`
  flex: 5.22;
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    max-width: 16rem;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.3rem;
    color: ${({ theme }) => theme.colors.gray1};
    word-wrap: break-word;
    opacity: 0.5;
    text-align: center;
  }
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

const ToggleArrowIcon = styled(LeftArrIC)<StyledMapProps>`
  ${(props) =>
    !props.isOpen &&
    css`
      transform: rotate(180deg);
    `};
`;

export default MapSidebar;
