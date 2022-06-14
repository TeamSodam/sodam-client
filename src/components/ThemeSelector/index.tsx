import { useRouter } from 'next/router';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
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
  gap: 5.8rem;

  align-self: center;
  width: 100%;

  & > h4 {
    font-weight: bold;
    font-size: 3rem;
    line-height: 4.3rem;
    color: ${theme.colors.black2};
  }

  ${applyMediaQuery('desktop')} {
    & > h4 {
      font-size: 2.6rem;
      line-height: 3.8rem;
    }

    gap: 3.8rem;
  }
  ${applyMediaQuery('mobile')} {
    & > h4 {
      font-size: 1.4rem;
      line-height: 2rem;
    }

    gap: 1.6rem;
  }
`;

const StyledElWrapper = styled.div<StyledThemeELProps>`
  display: flex;
  justify-content: center;
  gap: 5.8rem;
  margin-top: ${({ isMain }) => (isMain ? '5.4rem' : 0)};
  ${applyMediaQuery('desktop')} {
    gap: 6rem;
    margin-top: 0;
  }
  ${applyMediaQuery('tablet')} {
    gap: 4.5rem;
    margin-top: 0;
  }
  ${applyMediaQuery('mobile')} {
    gap: 1.6rem;

    margin-top: ${({ isMain }) => (isMain ? '1.3rem' : 0)};
  }
`;
