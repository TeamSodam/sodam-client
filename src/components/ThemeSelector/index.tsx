import styled from 'styled-components';
import { theme } from 'styles/theme';

import ThemeElement from './ThemeElement';

function ThemeSelector() {
  const category: string[] = ['아기자기한', '힙한', '모던한', '빈티지'];

  return (
    <StyledRoot>
      <h4>테마별 소품샵</h4>
      <StyledElWrapper>
        {category.map((themeType) => (
          <ThemeElement key={themeType} themeType={themeType} />
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

const StyledElWrapper = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-top: 3.2rem;

  & > h4 {
    font-weight: bold;
    font-size: 30px;
    line-height: 43px;
    color: ${theme.colors.black2};
  }
`;
