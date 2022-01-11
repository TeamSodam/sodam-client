import useMap from 'hooks/useMap';
import { useRouter } from 'next/router';
import LeftArr from 'public/assets/ic_leftArr.svg';
import { useRef } from 'react';
import styled from 'styled-components';

function MapWithAreaId() {
  const mapRef = useRef<HTMLDivElement>(null);
  useMap(mapRef);
  const router = useRouter();
  const { areaId } = router.query;

  const onClickGoBack = () => {
    router.push('/map');
  };

  if (!areaId) return <div>something wrong!</div>;

  return (
    <StyledContainer>
      <StyledGoBack onClick={onClickGoBack}>
        <LeftArrIC />
        <span>지역 다시 선택하기</span>
      </StyledGoBack>
      <MapContainer ref={mapRef} />
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  display: flex;
  flex-direction: column;
  margin: 7.2rem 18.75% 0 18.75%;
`;

const StyledGoBack = styled.button`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 2.2rem;

  background-color: transparent;
  border: none;
  & > span {
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 2rem;
    color: ${({ theme }) => theme.colors.black2};
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const LeftArrIC = styled(LeftArr)`
  height: 2rem;
  fill: ${({ theme }) => theme.colors.black2};
`;

const MapContainer = styled.div`
  width: 100%;
  height: 82.4rem;

  margin: 3.5rem 0 13.2rem 0;
`;

export default MapWithAreaId;
