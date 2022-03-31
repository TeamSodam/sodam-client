import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import Screen from 'styles/Screen';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Screen desktop tablet>
        <DesktopLayout>{children}</DesktopLayout>
      </Screen>
      <Screen wide>
        <WideLayout>{children}</WideLayout>
      </Screen>
      <Screen mobile>
        <MobileLayout>{children}</MobileLayout>
      </Screen>
    </>
  );
}

const CenteredChild = css`
  margin: 0 auto;

  & > * {
    width: 100%;
  }
`;

const MobileLayout = styled.div`
  ${CenteredChild}
  width: 312px;
`;

const DesktopLayout = styled.div`
  ${CenteredChild}
  width: 800px;
`;

const WideLayout = styled.div`
  ${CenteredChild}
  width: 1195px;
`;
export default Layout;
