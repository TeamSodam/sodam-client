import { useMediaQuery } from 'react-responsive';
import { deviceQuery } from 'styles/mediaQuery';

function useMedia() {
  const isMobile = useMediaQuery({
    query: deviceQuery.mobile,
  });
  const isTablet = useMediaQuery({
    query: deviceQuery.tablet,
  });
  const isDesktop = useMediaQuery({
    query: deviceQuery.desktop,
  });
  const isWide = useMediaQuery({
    query: deviceQuery.wide,
  });

  return { isMobile, isTablet, isDesktop, isWide };
}

export default useMedia;
