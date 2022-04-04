import { useEffect, useState } from 'react';

function useWindowSize() {
  const [clientWidth, setClientWidth] = useState(0);
  useEffect(() => {
    function handleResize() {
      setClientWidth(document.documentElement.clientWidth);
    }

    if (clientWidth === 0) {
      setClientWidth(document.documentElement.clientWidth);
      window.addEventListener('resize', handleResize);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [clientWidth]);
  return { clientWidth };
}

export default useWindowSize;
