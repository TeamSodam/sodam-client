import DetailShopAddress from 'components/DetailShopAddress';
import { useGetShopByShopIdQuery } from 'features/shops/shopApi';
import useMap from 'hooks/useMap';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const parseShopId = (shopID: string | string[] | undefined) => {
  if (!shopID) return 0;
  if (Array.isArray(shopID)) return +shopID.join('');

  return +shopID;
};

function Detail() {
  const mapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { id } = router.query;

  const shopId = parseShopId(id);
  const { data: shopInfo } = useGetShopByShopIdQuery(shopId);
  const initialLocation = shopInfo && shopInfo.length > 0 ? shopInfo[0].landAddress : undefined;

  const { displayMarkerByAddress } = useMap(mapRef, initialLocation, true);

  const showDetailShopAddress = () => {
    if (!shopInfo || !shopInfo.length) return null;
    const { roadAddress, landAddress } = shopInfo[0];
    return <DetailShopAddress roadAddress={roadAddress} landAddress={landAddress} />;
  };

  useEffect(() => {
    (async () => {
      if (shopInfo && shopInfo.length > 0) {
        const { category, landAddress, store, shopId } = shopInfo[0];
        await displayMarkerByAddress({ landAddress, store, category, shopId });
      }
    })();
  }, [shopInfo, displayMarkerByAddress]);

  return (
    <StyledContainer>
      <MapContainer ref={mapRef}>{showDetailShopAddress()}</MapContainer>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  display: flex;
  flex-direction: column;
  margin: 7.2rem 18.75% 13.4rem 18.75%;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 32rem;

  position: relative;
`;

export default Detail;
