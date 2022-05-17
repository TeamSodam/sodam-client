import { wrapper } from 'app/store';
import DropDownFilter from 'components/common/DropDownFilter';
import MainSlider from 'components/common/MainSlider';
import PageNaviagator from 'components/common/PageNaviagator';
import ReviewCard from 'components/common/ReviewCard';
import ShopCard from 'components/common/ShopCard';
import WriteReviewBtn from 'components/common/WriteReviewBtn';
import DetailImageGrid from 'components/ShopDetail/DetailImageGrid';
import DetailInfo from 'components/ShopDetail/DetailInfo';
import DetailShopAddress from 'components/ShopDetail/DetailShopAddress';
import { reviewApi, useGetReviewByShopIdQuery } from 'features/reviews/reviewApi';
import { useGetShopByShopIdQuery, useGetShopBySubwayQuery } from 'features/shops/shopApi';
import useMap from 'hooks/useMap';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { ReviewByShopIdData, ReviewSortType } from 'types/review';

const parseShopId = (shopID: string | string[] | undefined) => {
  if (!shopID) return 0;
  if (Array.isArray(shopID)) return +shopID.join('');

  return +shopID;
};

function Detail({ params }: { params: NextParsedUrlQuery; query: NextParsedUrlQuery }) {
  const [trigger] = reviewApi.useLazyGetReviewByShopIdQuery();

  const SHOP_ID = parseShopId(params.id);
  const SORT_TYPE = 'like';

  const mapRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const { data: shopInfo } = useGetShopByShopIdQuery(SHOP_ID);
  const { data: reviewInfo } = useGetReviewByShopIdQuery({
    shopId: SHOP_ID,
    sortType: SORT_TYPE,
    offset: currentPage,
    limit: 9,
  });
  const { data: subwayInfo } = useGetShopBySubwayQuery(SHOP_ID);

  const [currentList, setCurrentList] = useState<ReviewByShopIdData[]>();

  const initialLocation = shopInfo && shopInfo.landAddress;

  const { displayMarkerByAddress } = useMap(mapRef, initialLocation, true);

  const showDetailShopAddress = () => {
    if (!shopInfo) return null;
    const { roadAddress, landAddress } = shopInfo;
    return <DetailShopAddress roadAddress={roadAddress} landAddress={landAddress} />;
  };

  const showReviewList = () => {
    if (!currentList) return [];
    if (currentList && currentList.length > 0) {
      return currentList.map((review) => <ReviewCard key={review.reviewId} reviewData={review} />);
    }
    return [];
  };

  const showSubwayShopList = () => {
    if (subwayInfo) {
      const { shopList } = subwayInfo;

      const cardList = shopList.map((shop) => <ShopCard key={shop.shopId} cardData={shop} />);

      return <MainSlider slidesPerView={4} cardList={cardList} />;
    }
  };

  const calcPageNum = () => {
    if (!reviewInfo) return 1;

    const { reviewCount } = reviewInfo;
    if (!reviewCount) return 1;

    const isElementRest = reviewCount % 9 > 0;
    const page = Math.floor(reviewCount / 9);

    return isElementRest ? page + 1 : page;
  };

  useEffect(() => {
    if (reviewInfo) setCurrentList(reviewInfo.data);
  }, [reviewInfo]);

  useEffect(() => {
    (async () => {
      if (shopInfo) {
        const { category, landAddress, shopName, shopId } = shopInfo;
        await displayMarkerByAddress({ landAddress, shopName, category, shopId });
      }
    })();
  }, [shopInfo, displayMarkerByAddress]);

  const updateList = async (sortType: ReviewSortType) => {
    const result = await trigger({
      shopId: SHOP_ID,
      sortType,
      offset: 1,
      limit: 9,
    });
    setCurrentList(result?.data?.data);
  };

  const filterProps = [
    {
      filterName: '스크랩 많은 순',
      onClick: () => {
        updateList('save');
      },
    },
    {
      filterName: '좋아요 많은 순',
      onClick: () => {
        updateList('like');
      },
    },
    {
      filterName: '최신 순',
      onClick: () => {
        updateList('recent');
      },
    },
  ];

  return (
    <StyledContainer>
      <ColoredBackground />
      <ImageGridWrapper>
        {shopInfo && (
          <>
            <DetailImageGrid imageList={shopInfo.image || []} />
            <DetailInfo shopInfo={shopInfo} />
          </>
        )}
      </ImageGridWrapper>
      <Wrapper>
        <MapContainer ref={mapRef}>{showDetailShopAddress()}</MapContainer>
        <LabelContentWrapper>
          <LabelWithOptions>
            <LabelWrapper>
              <Label>소품샵 리뷰</Label>
              {shopInfo && (
                <WriteReviewBtn
                  href={`/review/write?shopId=${SHOP_ID}&shopName=${shopInfo.shopName}`}
                />
              )}
            </LabelWrapper>
            {currentList && currentList.length > 0 && (
              <DropDownFilter pageType="detail" filterProps={filterProps} />
            )}
          </LabelWithOptions>
          <ReviewGrid>{showReviewList()}</ReviewGrid>
          {currentList && currentList.length > 0 && (
            <PageNaviagator
              pageLimit={calcPageNum()}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </LabelContentWrapper>
        <LabelContentWrapper>
          <Label>
            <em>{subwayInfo && subwayInfo.subway} 주변</em> 가까운 소품샵 리스트
          </Label>
          {showSubwayShopList()}
        </LabelContentWrapper>
      </Wrapper>
    </StyledContainer>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(() => async (context) => ({
  props: {
    params: context.params,
    query: context.query,
  },
}));

const StyledContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 8rem;

  ${applyMediaQuery('desktop')} {
    gap: 4rem;
  }

  padding-bottom: 8rem;
`;

const ImageGridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 6%;
  z-index: 2;
  gap: 5.6rem;
`;

const Wrapper = styled.div`
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
  ${applyMediaQuery('desktop')} {
    height: 45rem;
  }
  top: 0;
  background-color: ${({ theme }) => theme.colors.purpleBg};
  transform: ${({ theme: { clientWidth, availableWidth } }) =>
    `scaleX(${clientWidth / availableWidth})`};
`;

const Label = styled.h2`
  font-size: 3rem;
  line-height: 4.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black2};

  & > em {
    color: ${({ theme }) => theme.colors.purpleText};
  }

  ${applyMediaQuery('desktop')} {
    font-size: 2.4rem;
    line-height: 3.2rem;
  }
`;

const LabelContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5.6rem;

  ${applyMediaQuery('desktop')} {
    gap: 4rem;
  }
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
