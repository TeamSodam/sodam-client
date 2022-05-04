import { useEffect, useState } from 'react';

function useWindowSize() {
  const [clientWidth, setClientWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setClientWidth(document.documentElement.clientWidth);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { clientWidth };
}

export default useWindowSize;
