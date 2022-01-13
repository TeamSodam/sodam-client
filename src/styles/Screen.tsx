import { useMediaQuery } from 'react-responsive';

import { deviceQuery } from './mediaQuery';

interface ScreenProps {
  children: React.ReactNode;
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
}

function Screen(props: ScreenProps) {
  const { children, mobile, tablet, desktop } = props;

  let renderFlag = false;

  const isMobile = useMediaQuery({
    query: deviceQuery.mobile,
  });
  const isTablet = useMediaQuery({
    query: deviceQuery.tablet,
  });
  const isDesktop = useMediaQuery({
    query: deviceQuery.desktop,
  });

  if (mobile) {
    renderFlag = renderFlag || isMobile;
  }
  if (tablet) {
    renderFlag = renderFlag || isTablet;
  }
  if (desktop) {
    renderFlag = renderFlag || isDesktop;
  }

  return renderFlag && children;
}

export default Screen;
