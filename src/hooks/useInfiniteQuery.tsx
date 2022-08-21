import Loader from 'components/common/Loader';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

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
  renderFn: (currentData: DataType[]) => React.ReactNode,
  props: IUseObserver = {},
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

  const unwrapDataIfWrapped = useCallback((wrappedData: InitialDataType<DataType>) => {
    if (isWrappedData(wrappedData)) return wrappedData?.data;

    return wrappedData;
  }, []);

  const onIntersect: IntersectionObserverCallback = useCallback(async ([entry]) => {
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
  }, []);

  const renderCurrentData = () => {
    if (!renderFn) return;
    return data && data.length > 0 && renderFn(data);
  };

  const loadPoint = <LoadPoint ref={loadPointRef}>{isLoading && <Loader />}</LoadPoint>;

  useEffect(() => {
    if (initialData) {
      const nextData = unwrapDataIfWrapped(initialData);
      setData(nextData ? [...nextData] : []);
      setIsLastData(false);
      offsetIndex.current = 1;
    }
  }, [initialData, unwrapDataIfWrapped]);

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
  }, [root, rootMargin, threshold, initialData, fetchFn, isLastData, onIntersect]);

  return { isLoading, data, renderCurrentData, loadPoint };
};

const LoadPoint = styled.span`
  position: relative;
`;

export default useInfiniteQuery;
