import useMedia from 'hooks/useMedia';
import { ReactElement, useEffect, useState } from 'react';

interface ScreenProps {
  children: ReactElement;
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
  wide?: boolean;
}

interface ScreenMap {
  [key: string]: boolean;
}

function Screen(props: ScreenProps) {
  const { children, ...screens } = props;
  const { isMobile, isTablet, isDesktop, isWide } = useMedia();

  const [renderFlag, setRenderFlag] = useState(false);
  useEffect(() => {
    const screenMap: ScreenMap = {
      mobile: isMobile,
      tablet: isTablet,
      desktop: isDesktop,
      wide: isWide,
    };
    let activated = false;
    Object.keys(screens).forEach((screen) => {
      if (screenMap[screen]) {
        setRenderFlag(true);
        activated = true;
      }
    });

    if (!activated) setRenderFlag(false);
  }, [isMobile, isTablet, isDesktop, isWide, screens]);

  return renderFlag ? children : null;
}

export default Screen;
