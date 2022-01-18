import DetailImageGrid from 'components/ShopDetail/DetailImageGrid';
import DetailInfo from 'components/ShopDetail/DetailInfo';
import DetailShopAddress from 'components/ShopDetail/DetailShopAddress';
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
        const { category, landAddress, shopName, shopId } = shopInfo[0];
        await displayMarkerByAddress({ landAddress, shopName, category, shopId });
      }
    })();
  }, [shopInfo, displayMarkerByAddress]);

  return (
    <StyledContainer>
      <ColoredBackground />
      <Wrapper>
        <DetailImageGrid />
        {shopInfo && shopInfo.length > 0 && <DetailInfo shopInfo={shopInfo[0]} />}
        <MapContainer ref={mapRef}>{showDetailShopAddress()}</MapContainer>
      </Wrapper>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 7.2rem 18.75% 13.4rem 18.75%;
  z-index: 2;
  gap: 5.6rem;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 32rem;

  position: relative;
`;

const ColoredBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 59rem;
  top: 0;
  background-color: ${({ theme }) => theme.colors.purpleBg};
`;

export default Detail;
