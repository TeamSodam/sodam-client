import { useRouter } from 'next/router';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { ShopThemeType } from 'types/shop';

import ThemeElement from './ThemeElement';

interface StyledThemeELProps {
  isMain?: boolean;
}

function ThemeSelector() {
  const category: ShopThemeType[] = ['아기자기한', '힙한', '모던한', '빈티지'];
  const router = useRouter();
  const isMain = router.pathname === '/';
  const currentTheme = router.query.type;
  const isValidCurrentTheme = !currentTheme || typeof currentTheme === 'string';
  return (
    <StyledRoot>
      <h4>테마별 소품샵</h4>
      <StyledElWrapper isMain={isMain}>
        {isValidCurrentTheme &&
          category.map((themeType) => (
            <ThemeElement
              key={themeType}
              themeType={themeType}
              isMain={isMain}
              currentTheme={currentTheme}
            />
          ))}
      </StyledElWrapper>
    </StyledRoot>
  );
}

export default ThemeSelector;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;

  & > h4 {
    font-weight: bold;
    font-size: 3rem;
    line-height: 4.3rem;
    color: ${theme.colors.black2};
  }
`;

const StyledElWrapper = styled.div<StyledThemeELProps>`
  display: flex;
  gap: 5.8rem;
  margin-top: ${({ isMain }) => (isMain === true ? '5.4rem' : '5.8rem')};

  & > h4 {
    font-weight: bold;
    font-size: 30px;
    line-height: 43px;
    color: ${theme.colors.black2};
  }
`;
