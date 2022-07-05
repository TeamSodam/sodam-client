import { RefObject, useCallback, useEffect } from 'react';

function useClickOutside<T extends HTMLElement>(
  domRef: RefObject<T>,
  onClick: () => void,
  isOpen?: boolean,
) {
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
    if (isOpen === true || isOpen === undefined)
      document.addEventListener('click', handleClickAnywhere);
    return () => {
      document.removeEventListener('click', handleClickAnywhere);
    };
  }, [handleClickAnywhere, isOpen]);
}

export default useClickOutside;
