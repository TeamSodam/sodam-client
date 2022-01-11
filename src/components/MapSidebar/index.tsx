import ActivePinIC from 'public/assets/ic_active_marker.svg';
import LeftArrIC from 'public/assets/ic_leftArr.svg';
import StarIC from 'public/assets/ic_star.svg';
import { useState } from 'react';
import styled, { css } from 'styled-components';

import ShopElement, { ShopElementProps } from './ShopElement';

interface StyledMapProps {
  isOpen?: boolean;
}

const dummyShopList: ShopElementProps[] = [
  {
    shopId: 1,
    shopName: '소품샵 최대길이 소품샵 최대길이 소품 분류와 8px 남기고',
    category: ['인테리어소품'],
    image: '/assets/dummy/dummy-shop.png',
    address: '서울 마포구 동교로46길 33',
    close: '영업시간 12:00~17:00',
    reviewCount: 35,
  },
  {
    shopId: 2,
    shopName: '수바코',
    category: ['문구.팬시'],
    image: '/assets/dummy/dummy-shop.png',
    address: '서울 마포구 희우정로20길 66 상가1층2호',
    close: '영업시간 12:00~17:00',
    reviewCount: 42,
  },
  {
    shopId: 3,
    shopName: '프레젠트모먼트',
    category: ['인테리어소품'],
    image: '/assets/dummy/dummy-shop.png',
    address: '서울 마포구 동교로 49-1 1층',
    close: '영업시간 12:00~17:00',
    reviewCount: 54,
  },
  {
    shopId: 4,
    shopName: '무드',
    category: ['인테리어소품', '캔들'],
    image: '/assets/dummy/dummy-shop.png',
    address: '서울 마포구 포은로8길 16',
    close: '영업시간 12:00~17:00',
    reviewCount: 10,
  },
  {
    shopId: 5,
    shopName: '제로스페이스',
    category: ['문구.팬시'],
    image: '/assets/dummy/dummy-shop.png',
    address: '서울 마포구 희우정로16길 32',
    close: '영업시간 12:00~17:00',
    reviewCount: 189,
  },
  {
    shopId: 6,
    shopName: '브라와',
    category: ['문구.팬시'],
    image: '/assets/dummy/dummy-shop.png',
    address: '서울 마포구 희우정로10길 30 1층',
    close: '영업시간 12:00~17:00',
    reviewCount: 200,
  },
  {
    shopId: 7,
    shopName: '망원만물',
    category: ['인테리어소품'],
    image: '/assets/dummy/dummy-shop.png',
    address: '서울 마포구 동교로 35 왼쪽가게',
    close: '영업시간 12:00~17:00',
    reviewCount: 200,
  },
];

function MapSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen((prevState) => !prevState);

  const optionList = [
    {
      icon: ActivePinIC,
      label: '인기 순',
    },
    {
      icon: StarIC,
      label: '내가 저장한',
    },
  ];

  const showOptions = () =>
    optionList.map((option) => (
      <Option key={option.label}>
        <option.icon />
        <span>{option.label}</span>
      </Option>
    ));

  return (
    <StyledSidebar isOpen={isOpen}>
      {isOpen && (
        <>
          <OptionList>{showOptions()}</OptionList>
          <ShopList>
            {dummyShopList.map((dummy) => (
              <ShopElement shopInfo={dummy} key={dummy.shopId} />
            ))}
          </ShopList>
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
  width: ${(props) => (props.isOpen ? '48.5rem' : 0)};
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
  margin-left: -1px;
`;

const Option = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  width: 100%;
  height: 7.8rem;

  &:first-child {
    color: white;
    background-color: ${({ theme }) => theme.colors.purpleText};
    border: 0.1rem solid ${({ theme }) => theme.colors.purpleText};
  }

  &:nth-child(2) {
    color: ${({ theme }) => theme.colors.purpleText};
    border: 0.1rem solid ${({ theme }) => theme.colors.gray2};
    border-right: none;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.7;
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

const ToggleBtn = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(100%, -50%);

  width: 4.1rem;
  height: 7.8rem;

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
