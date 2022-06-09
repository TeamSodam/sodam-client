import React from 'react';
import styled from 'styled-components';
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
  margin-top: 4rem;
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
`;
const StyledThemeWrapper = styled.div`
  display: flex;
  width: 52.8rem;
  justify-content: space-between;
`;

export default ThemeSelector;
