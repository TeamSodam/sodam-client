import PageNaviagator from 'components/common/PageNaviagator';
import ReviewCard from 'components/common/ReviewCard';
import DetailImageGrid from 'components/ShopDetail/DetailImageGrid';
import DetailInfo from 'components/ShopDetail/DetailInfo';
import DetailShopAddress from 'components/ShopDetail/DetailShopAddress';
import { useGetReviewByShopIdQuery } from 'features/reviews/reviewApi';
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
  const { data: reviewList } = useGetReviewByShopIdQuery({
    shopId,
    sortType: 'save',
  });

  const initialLocation = shopInfo && shopInfo.length > 0 ? shopInfo[0].landAddress : undefined;

  const { displayMarkerByAddress } = useMap(mapRef, initialLocation, true);

  const showDetailShopAddress = () => {
    if (!shopInfo || !shopInfo.length) return null;
    const { roadAddress, landAddress } = shopInfo[0];
    return <DetailShopAddress roadAddress={roadAddress} landAddress={landAddress} />;
  };

  const showReviewList = () => {
    if (reviewList && reviewList.length > 0) {
      return reviewList.map((review) => <ReviewCard key={review.reviewId} reviewData={review} />);
    }
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
      <ImageGridWrapper>
        <DetailImageGrid />
        {shopInfo && shopInfo.length > 0 && <DetailInfo shopInfo={shopInfo[0]} />}
        <MapContainer ref={mapRef}>{showDetailShopAddress()}</MapContainer>
      </ImageGridWrapper>
      <Wrapper>
        <LabelContentWrapper>
          <Label>소품샵 리뷰</Label>
          <ReviewGrid>{showReviewList()}</ReviewGrid>
          <PageNaviagator pageNum={3} />
        </LabelContentWrapper>
        <LabelContentWrapper>
          <Label>
            <em>을지로3가역 주변</em> 가까운 소품샵 리스트
          </Label>
        </LabelContentWrapper>
      </Wrapper>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 8rem;
`;

const ImageGridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 7.2rem 18.75% 5.6rem 18.75%;
  z-index: 2;
  gap: 5.6rem;
`;

const Wrapper = styled.div`
  padding: 0 18.75%;

  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 9.6rem;
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

const Label = styled.h2`
  font-size: 3rem;
  line-height: 4.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black2};

  & > em {
    color: ${({ theme }) => theme.colors.purpleText};
  }
`;

const LabelContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5.6rem;
`;

const ReviewGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 4rem 2.4rem;
`;

export default Detail;
