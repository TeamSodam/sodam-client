import useMedia from 'hooks/useMedia';
import { ReactElement } from 'react';

interface ScreenProps {
  children: ReactElement;
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
  wide?: boolean;
}

function Screen(props: ScreenProps) {
  const { children, mobile, tablet, desktop, wide } = props;
  const { isMobile, isTablet, isDesktop, isWide } = useMedia();

  let renderFlag = false;

  if (mobile) {
    renderFlag = renderFlag || isMobile;
  }
  if (tablet) {
    renderFlag = renderFlag || isTablet;
  }
  if (desktop) {
    renderFlag = renderFlag || isDesktop;
  }
  if (wide) {
    renderFlag = renderFlag || isWide;
  }
  return renderFlag ? children : null;
}

export default Screen;
