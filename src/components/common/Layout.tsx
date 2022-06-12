import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { applyReponsiveWidth } from 'styles/mixin';

interface LayoutProps {
  children: ReactNode;
}
interface StyledProps {
  isMypage: boolean;
  needFlex: boolean;
}

function Layout({ children }: LayoutProps) {
  const { pathname } = useRouter();

  const isMypage = pathname === '/mypage';
  const needFlex = pathname === '/shop/collect' || pathname.slice(0, 10) === '/review/my';

  return (
    <LayoutWrapper isMypage={isMypage} needFlex={needFlex}>
      {children}
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div<StyledProps>`
  ${applyReponsiveWidth}
  margin: 0 auto;

  & > * {
    width: 100%;
  }

  ${({ isMypage }) =>
    isMypage &&
    css`
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: space-between;
    `}
  ${({ needFlex }) =>
    needFlex &&
    css`
      height: 100%;
      display: flex;
      flex-direction: column;
      & > div:nth-last-child(2) {
        flex: 1;
      }
    `}
`;

export default Layout;
