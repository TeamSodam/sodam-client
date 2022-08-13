import React from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';

import ThemeItem from './ThemeItem';

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

  const getThemeIcon = (theme: string, isSelected: boolean) =>
    isSelected
      ? `/assets/ic_theme${ThemeSelect[theme]}Join.png`
      : `/assets/ic_theme${ThemeSelect[theme]}JoinOff.png`;

  return (
    <StyledRoot>
      <h1>
        선호 소품샵 테마 <em>*</em>
      </h1>
      <StyledThemeWrapper>
        {Object.keys(ThemeSelect).map((theme) => (
          <ThemeItem
            key={theme}
            handleOnClick={handleOnClick}
            getThemeIcon={getThemeIcon}
            theme={theme}
          />
        ))}
      </StyledThemeWrapper>
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5.6rem;
  width: 100%;
  & > h1 {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 2.2rem;
    color: ${theme.colors.black2};
    margin-bottom: 3.3rem;
  }
  & em {
    font-size: 1.2rem;
    margin-left: 0.2rem;
    color: ${theme.colors.purpleText};
  }
  ${applyMediaQuery('mobile', 'tablet')} {
    margin-top: 4.6rem;
    & > h1 {
      font-size: 1.1rem;
      margin-bottom: 2.1rem;
    }
  }
`;
const StyledThemeWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export default ThemeSelector;
