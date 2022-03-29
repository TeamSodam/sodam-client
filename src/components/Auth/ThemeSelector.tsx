import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface ThemeSelectorProps {
  imgSrc?: string;
  handleOnClick: (value: string) => void;
}
interface ThemeSelectType {
  [key: string]: string;
}

function ThemeSelector(props: ThemeSelectorProps) {
  const { handleOnClick } = props;
  const ThemeSelect: ThemeSelectType = {
    아기자기한: 'Cute',
    힙한: 'Hip',
    모던한: 'Modern',
    빈티지: 'Vintage',
  };

  const getThemeIcon = (theme: string) => `/assets/ic_theme${ThemeSelect[theme]}Join.png`;

  return (
    <StyledRoot>
      <h1>선호 소품샵 테마</h1>
      <StyledThemeWrapper>
        {Object.keys(ThemeSelect).map((theme) => (
          <StyledSelectorWrapper key={theme} onClick={() => handleOnClick(theme)}>
            <StyledImgWrapper imgSrc={getThemeIcon(theme)} />
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
  margin-top: 4rem;
  & > h1 {
    font-weight: 500;
    font-size: 2rem;
    line-height: 2.9rem;
    color: ${theme.colors.black2};
    margin-bottom: 3.2rem;
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
    margin-top: 1.8rem;
  }
`;

const StyledImgWrapper = styled.div<Pick<ThemeSelectorProps, 'imgSrc'>>`
  display: flex;
  width: 9.4rem;
  height: 9.4rem;
  background-image: ${({ imgSrc }) => `url(${imgSrc})`};
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
`;

export default ThemeSelector;
