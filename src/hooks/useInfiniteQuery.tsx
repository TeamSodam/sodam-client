import { useEffect, useRef, useState } from 'react';

interface IUseObserver {
  root?: HTMLElement;
  rootMargin?: string;
  threshold?: number;
}

type InitialDataType<DataType> = WrappedData<DataType> | DataType[] | undefined;

interface WrappedData<DataType> {
  data?: DataType[];
}

const useInfiniteQuery = <DataType,>(
  initialData: InitialDataType<DataType>,
  fetchFn: (offset: number) => Promise<InitialDataType<DataType>> | InitialDataType<DataType>,
  props: IUseObserver,
) => {
  const isWrappedData = (data: InitialDataType<DataType>): data is WrappedData<DataType> =>
    data !== undefined && 'data' in data;

  const { root = null, rootMargin = '0px', threshold = 1 } = props;
  const [data, setData] = useState(() =>
    isWrappedData(initialData) ? initialData?.data || [] : initialData || [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLastData, setIsLastData] = useState(false);
  const loadPointRef = useRef(null);
  const offsetIndex = useRef(1);

  const unwrapDataIfWrapped = (wrappedData: InitialDataType<DataType>) => {
    if (isWrappedData(wrappedData)) return wrappedData?.data;

    return wrappedData;
  };

  const onIntersect: IntersectionObserverCallback = async ([entry]) => {
    if (entry.isIntersecting) {
      setIsLoading(true);
      offsetIndex.current += 1;
      const fetchResult = await fetchFn(offsetIndex.current);
      const nextData = unwrapDataIfWrapped(fetchResult);

      if (!nextData) {
        setIsLoading(false);
        return;
      }

      if (nextData.length === 0) {
        setIsLastData(true);
      } else setData((prevData) => [...prevData, ...nextData]);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialData) {
      const nextData = unwrapDataIfWrapped(initialData);
      setData(nextData ? [...nextData] : []);
      setIsLastData(false);
      offsetIndex.current = 1;
    }
  }, [initialData]);

  useEffect(() => {
    if (!initialData) return;
    let observer: IntersectionObserver | undefined = undefined;
    if (loadPointRef && loadPointRef.current) {
      observer = new IntersectionObserver(onIntersect, { root, rootMargin, threshold });
      observer.observe(loadPointRef.current);
    }

    if (isLastData && observer) {
      observer.disconnect();
    }

    return () => observer && observer.disconnect();
  }, [rootMargin, threshold, initialData, fetchFn, isLastData]);

  return { loadPointRef, isLoading, data };
};

export default useInfiniteQuery;
