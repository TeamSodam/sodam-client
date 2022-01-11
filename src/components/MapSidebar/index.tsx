import ActivePinIC from 'public/assets/ic_active_marker.svg';
import LeftArrIC from 'public/assets/ic_leftArr.svg';
import StarIC from 'public/assets/ic_star.svg';
import { useState } from 'react';
import styled, { css } from 'styled-components';

interface StyledIsOpenProps {
  isOpen: boolean;
}

function MapSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen((prevState) => !prevState);
  return (
    <StyledSidebar isOpen={isOpen}>
      {isOpen && (
        <>
          <SortOptions>
            <Option>
              <ActivePinIC />
              <span>인기 순</span>
            </Option>
            <Option>
              <StarIC />
              <span>내가 저장한</span>
            </Option>
          </SortOptions>
          <ShopList />
        </>
      )}

      <ToggleBtn onClick={toggle}>
        <ToggleArrowIcon isOpen={isOpen} />
      </ToggleBtn>
    </StyledSidebar>
  );
}
const StyledSidebar = styled.aside<StyledIsOpenProps>`
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

const SortOptions = styled.ul`
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

const ToggleArrowIcon = styled(LeftArrIC)<StyledIsOpenProps>`
  ${(props) =>
    !props.isOpen &&
    css`
      transform: rotate(180deg);
    `};
`;

export default MapSidebar;
