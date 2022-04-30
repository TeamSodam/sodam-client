import { useCallback, useEffect, useState } from 'react';

function useWindowSize() {
  const [clientWidth, setClientWidth] = useState(0);

  const handleResize = useCallback(() => {
    if (document) {
      setClientWidth(document.documentElement.clientWidth);
    }
  }, []);

  useEffect(() => {
    setClientWidth(document.documentElement.clientWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return { clientWidth };
}

export default useWindowSize;
