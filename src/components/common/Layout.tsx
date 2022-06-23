import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { applyReponsiveWidth } from 'styles/mixin';

interface LayoutProps {
  children: ReactNode;
}
interface StyledProps {
  needFlex: boolean;
}

function Layout({ children }: LayoutProps) {
  const { pathname } = useRouter();

  const needFlex =
    pathname === '/mypage' ||
    pathname === '/shop/collect' ||
    pathname.slice(0, 10) === '/review/my' ||
    pathname === '/review/write' ||
    pathname === '/map';

  return <LayoutWrapper needFlex={needFlex}>{children}</LayoutWrapper>;
}

const LayoutWrapper = styled.div<StyledProps>`
  ${applyReponsiveWidth}
  margin: 0 auto;

  & > * {
    width: 100%;
  }

  ${({ needFlex }) =>
    needFlex &&
    css`
      height: 100%;
      display: flex;
      flex-direction: column;
      & > div:nth-last-child(2),
      & > main {
        flex: 1;
      }
    `}
`;

export default Layout;
