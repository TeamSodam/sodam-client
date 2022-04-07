import { ReactNode } from 'react';
import styled from 'styled-components';
import { applyReponsiveWidth } from 'styles/mixin';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}

const LayoutWrapper = styled.div`
  ${applyReponsiveWidth}
  margin: 0 auto;

  & > * {
    width: 100%;
  }
`;

export default Layout;
