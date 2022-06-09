import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { applyReponsiveWidth } from 'styles/mixin';

interface LayoutProps {
  children: ReactNode;
}
interface StyledProps {
  isMypage: boolean;
}

function Layout({ children }: LayoutProps) {
  const router = useRouter();

  return <LayoutWrapper isMypage={router.pathname === '/mypage'}>{children}</LayoutWrapper>;
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
`;

export default Layout;
