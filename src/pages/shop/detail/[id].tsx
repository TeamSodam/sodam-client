import DropDownFilter from 'components/common/DropDownFilter';
import MainSlider from 'components/common/MainSlider';
import PageNaviagator from 'components/common/PageNaviagator';
import ReviewCard from 'components/common/ReviewCard';
import ShopCard from 'components/common/ShopCard';
import WriteReviewBtn from 'components/common/WriteReviewBtn';
import DetailImageGrid from 'components/ShopDetail/DetailImageGrid';
import DetailInfo from 'components/ShopDetail/DetailInfo';
import DetailShopAddress from 'components/ShopDetail/DetailShopAddress';
import { useGetReviewByShopIdQuery } from 'features/reviews/reviewApi';
import { useGetShopByShopIdQuery, useGetShopBySubwayQuery } from 'features/shops/shopApi';
import useMap from 'hooks/useMap';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const parseShopId = (shopID: string | string[] | undefined) => {
  if (!shopID) return 0;
  if (Array.isArray(shopID)) return +shopID.join('');

  return +shopID;
};

function Detail() {
  const mapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const { id } = router.query;

  const shopId = parseShopId(id);
  const { data: shopInfo } = useGetShopByShopIdQuery(shopId);
  const { data: reviewList } = useGetReviewByShopIdQuery({
    shopId,
    sortType: 'review',
    page: currentPage,
  });
  const { data: shopListSubway } = useGetShopBySubwayQuery(shopId);

  const initialLocation = shopInfo && shopInfo.landAddress;

  const { displayMarkerByAddress } = useMap(mapRef, initialLocation, true);

  const showDetailShopAddress = () => {
    if (!shopInfo) return null;
    const { roadAddress, landAddress } = shopInfo;
    return <DetailShopAddress roadAddress={roadAddress} landAddress={landAddress} />;
  };

  const showReviewList = () => {
    if (reviewList && reviewList.length > 0) {
      return reviewList.map((review) => <ReviewCard key={review.reviewId} reviewData={review} />);
    }
  };

  const showSubwayShopList = () => {
    if (shopListSubway && shopListSubway.length > 0) {
      const cardList = shopListSubway.map((shop) => <ShopCard key={shop.shopId} cardData={shop} />);

      return <MainSlider slidesPerView={4} cardList={cardList} />;
    }
  };

  const calcPageNum = () => {
    if (!reviewList || !reviewList.length) return 1;

    // 리뷰카운트 계산을 위해 임의로 이렇게 작업
    const { reviewCount } = reviewList[0];

    const isElementRest = reviewCount % 9 > 0;
    const page = Math.floor(reviewCount / 9);

    return isElementRest ? page + 1 : page;
  };

  useEffect(() => {
    (async () => {
      if (shopInfo) {
        const { category, landAddress, shopName, shopId } = shopInfo;
        await displayMarkerByAddress({ landAddress, shopName, category, shopId });
      }
    })();
  }, [shopInfo, displayMarkerByAddress]);

  return (
    <StyledContainer>
      <ColoredBackground />
      <ImageGridWrapper>
        <DetailImageGrid />
        {shopInfo && <DetailInfo shopInfo={shopInfo} />}
        <MapContainer ref={mapRef}>{showDetailShopAddress()}</MapContainer>
      </ImageGridWrapper>
      <Wrapper>
        <LabelContentWrapper>
          <LabelWithOptions>
            <LabelWrapper>
              <Label>소품샵 리뷰</Label>
              <WriteReviewBtn
                navigate={() => {
                  router.push(`/review/write?shopId=${shopId}`);
                }}
              />
            </LabelWrapper>
            <DropDownFilter pageType="detail" />
          </LabelWithOptions>
          <ReviewGrid>{showReviewList()}</ReviewGrid>
          <PageNaviagator
            pageLimit={calcPageNum()}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </LabelContentWrapper>
        <LabelContentWrapper>
          <Label>
            <em>을지로3가역 주변</em> 가까운 소품샵 리스트
          </Label>
          {showSubwayShopList()}
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

  padding-bottom: 8rem;
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

const LabelWithOptions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const LabelWrapper = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

export default Detail;
