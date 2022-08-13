import { RefObject, useEffect } from 'react';

interface IUseObserver {
  target: RefObject<HTMLElement>;
  onIntersect: IntersectionObserverCallback;
  root?: HTMLElement;
  rootMargin?: string;
  threshold?: number;
}

const useObserver = (props: IUseObserver) => {
  const { target, onIntersect, root = null, rootMargin = '0px', threshold = 1 } = props;

  useEffect(() => {
    let observer: IntersectionObserver;

    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect, { root, rootMargin, threshold });
      observer.observe(target.current);
    }

    return () => observer && observer.disconnect();
  }, [target.current, rootMargin, threshold]);
};

export default useObserver;
