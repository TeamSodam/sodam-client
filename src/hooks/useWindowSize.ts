import { useEffect, useState } from 'react';

function useWindowSize() {
  const [clientWidth, setClientWidth] = useState(1440);
  useEffect(() => {
    function handleResize() {
      setClientWidth(document.documentElement.clientWidth);
    }

    setClientWidth(document.documentElement.clientWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return { clientWidth };
}

export default useWindowSize;
