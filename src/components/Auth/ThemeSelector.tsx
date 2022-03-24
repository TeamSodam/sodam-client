import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface StyledThemeSelectorProps {
  imgSrc: string;
}

function ThemeSelector() {
  const ThemeTypeKo = ['아기자기한', '힙한', '모던한', '빈티지'];
  const ThemeTypeEng = ['Cute', 'Hip', 'Modern', 'Vintage'];

  const getThemeIcon = (idx: number) => `/assets/ic_theme${ThemeTypeEng[idx]}.png`;

  return (
    <StyledRoot>
      <h1>선호 소품샵 테마</h1>
      <StyledThemeWrapper>
        {ThemeTypeKo.map((theme, idx) => (
          <StyledSelectorWrapper key={theme}>
            <StyledImgWrapper imgSrc={getThemeIcon(idx)} />
            <p>{theme}</p>
          </StyledSelectorWrapper>
        ))}
      </StyledThemeWrapper>
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 9.9rem;
  & > h1 {
    font-weight: 500;
    font-size: 2rem;
    line-height: 2.9rem;
    color: ${theme.colors.black2};
    margin-bottom: 2.9rem;
  }
`;
const StyledThemeWrapper = styled.div`
  display: flex;
  width: 52.8rem;
  justify-content: space-between;
`;

const StyledSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  & > p {
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.7rem;
    text-align: center;
    color: ${theme.colors.purpleText};
    margin-top: 2.1rem;
  }
`;

const StyledImgWrapper = styled.div<StyledThemeSelectorProps>`
  display: flex;
  width: 9.4rem;
  height: 9.4rem;
  background-image: ${({ imgSrc }) => `url(${imgSrc})`};
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
`;

export default ThemeSelector;
