import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface ThemeItemProps {
  theme: string;
  getThemeIcon: (theme: string, isSelected: boolean) => string;
  handleOnClick: (value: string) => void;
}
function ThemeItem(props: ThemeItemProps) {
  const [isSelected, setIsSelected] = useState(false);
  const toggle = () => setIsSelected(!isSelected);
  const { theme, getThemeIcon, handleOnClick } = props;

  const handleSelected = (theme: string) => {
    toggle();
    handleOnClick(theme);
  };

  const getToggleIcon = (isSelected: boolean) =>
    isSelected ? '/assets/ic_minus.svg' : '/assets/ic_plus.svg';

  return (
    <StyledSelectorWrapper key={theme} isSelected={isSelected}>
      <StyledBtnDiv imgSrc={getToggleIcon(isSelected)} onClick={() => handleSelected(theme)} />
      <StyledImgWrapper imgSrc={getThemeIcon(theme, isSelected)} />
      <p>{theme}</p>
    </StyledSelectorWrapper>
  );
}

const StyledSelectorWrapper = styled.div<{ isSelected: boolean }>`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;

  & > p {
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.7rem;
    text-align: center;
    color: ${({ isSelected }) => (isSelected ? theme.colors.purpleText : theme.colors.gray3)};
    margin-top: 1.8rem;
  }
`;

const StyledImgWrapper = styled.div<{ imgSrc: string }>`
  display: flex;
  width: 9.4rem;
  height: 9.4rem;
  background-image: ${({ imgSrc }) => `url(${imgSrc})`};
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
`;

const StyledBtnDiv = styled.div<{ imgSrc: string }>`
  position: absolute;
  width: 1.6rem;
  height: 1.6rem;
  top: -0.8rem;
  right: -0.8rem;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  background-image: ${({ imgSrc }) => `url(${imgSrc})`};
  cursor: pointer;
`;
export default ThemeItem;
