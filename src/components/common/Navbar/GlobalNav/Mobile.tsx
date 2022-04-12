import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

function GlobalNavMobile() {
  return <GlobalNavWrapper>모바일네브바</GlobalNavWrapper>;
}

const GlobalNavWrapper = styled.div`
  width: 100%;
  height: 8.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:after {
    content: '';
    position: absolute;
    width: ${({ theme }) => theme.clientWidth}px;
    top: 8.2rem;
    background-color: ${({ theme }) => theme.colors.navLine};
    height: 1px;
  }

  ${applyMediaQuery('desktop')} {
    height: 5.4rem;

    &:after {
      top: 5.4rem;
    }
  }
`;

export default GlobalNavMobile;
