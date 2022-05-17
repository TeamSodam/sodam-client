import { availableWidths } from 'constants/availableWidths';
import { useEffect, useState } from 'react';

import useMedia from './useMedia';

function useWindowSize() {
  const [clientWidth, setClientWidth] = useState(0);
  const { isMobile, isTablet, isDesktop } = useMedia();

  const getCurrentAvailableWidth = () => {
    if (isMobile) return availableWidths.mobile;
    if (isTablet) return availableWidths.tablet;
    if (isDesktop) return availableWidths.desktop;
    return availableWidths.wide;
  };

  useEffect(() => {
    function handleResize() {
      setClientWidth(document.documentElement.clientWidth);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { clientWidth, availableWidth: getCurrentAvailableWidth() };
}

export default useWindowSize;
