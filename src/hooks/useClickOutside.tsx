import { RefObject, useCallback, useEffect } from 'react';

function useClickOutside(domRef: RefObject<HTMLElement>, onClick: () => void) {
  const handleClickAnywhere = useCallback(
    (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement) || !(domRef?.current instanceof HTMLElement)) return;

      if (domRef.current.contains(target)) return;

      onClick();
    },
    [domRef, onClick],
  );
  useEffect(() => {
    document.addEventListener('click', handleClickAnywhere);
    return () => {
      document.removeEventListener('click', handleClickAnywhere);
    };
  }, [handleClickAnywhere]);
}

export default useClickOutside;
