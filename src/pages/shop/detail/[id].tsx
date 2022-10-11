import { wrapper } from 'app/store';
import DropDownFilter from 'components/common/DropDownFilter';
import MainSlider from 'components/common/MainSlider';
import PageNaviagator from 'components/common/PageNaviagator';
import ReviewCard, { EmptyReview } from 'components/common/ReviewCard';
import ShopCard from 'components/common/ShopCard';
import WriteReviewLink from 'components/common/WriteReviewLink';
import KakaoMap from 'components/KakaoMap';
import DetailImageGrid from 'components/ShopDetail/DetailImageGrid';
import DetailInfo from 'components/ShopDetail/DetailInfo';
import DetailShopAddress from 'components/ShopDetail/DetailShopAddress';
import { reviewApi, useGetReviewByShopIdQuery } from 'features/reviews/reviewApi';
import { useGetShopByShopIdQuery, useGetShopBySubwayQuery } from 'features/shops/shopApi';
import useMap from 'hooks/useMap';
import useMedia from 'hooks/useMedia';
import useToast from 'hooks/useToast';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import Head from 'next/head';
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

  const { isMobile, isTablet } = useMedia();
  const getLimit = () => (isMobile ? 4 : isTablet ? 6 : 9);
  const getSlidesPerView = () => (isMobile ? 2 : isTablet ? 3 : 4);
  const { fireToast, toast } = useToast();

  const mapRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const { data: shopInfo } = useGetShopByShopIdQuery(SHOP_ID);
  const { data: reviewInfo } = useGetReviewByShopIdQuery({
    shopId: SHOP_ID,
    sortType: SORT_TYPE,
    offset: currentPage,
    limit: getLimit(),
  });
  const { data: subwayInfo } = useGetShopBySubwayQuery(SHOP_ID);

  const [currentList, setCurrentList] = useState<ReviewByShopIdData[]>();

  const initialLocation = shopInfo && (shopInfo.landAddress || shopInfo?.roadAddress);

  const { displayMarkerByAddress, initialize } = useMap(mapRef, initialLocation, true);

  const showDetailShopAddress = () => {
    if (!shopInfo) return null;
    const { roadAddress, landAddress } = shopInfo;
    return <DetailShopAddress roadAddress={roadAddress} landAddress={landAddress} />;
  };

  const showReviewList = () => {
    if (currentList && currentList.length > 0) {
      return currentList.map((review) => <ReviewCard key={review.reviewId} reviewData={review} />);
    }

    return <EmptyReview isMyReviewMobile={false}>아직 등록된 리뷰가 없어요</EmptyReview>;
  };

  const showSubwayShopList = () => {
    if (subwayInfo) {
      const { shopList } = subwayInfo;

      if (shopList.length === 0)
        return <EmptyReview isMyReviewMobile={false}>아직 등록된 소품샵이 없어요</EmptyReview>;

      const cardList = shopList.map((shop) => <ShopCard key={shop.shopId} cardData={shop} />);

      return <MainSlider slidesPerView={getSlidesPerView()} cardList={cardList} isShopCard />;
    }
  };

  const calcPageNum = () => {
    if (!reviewInfo) return 1;

    const { reviewCount } = reviewInfo;
    if (!reviewCount) return 1;

    const divider = getLimit();

    const isElementRest = reviewCount % divider > 0;
    const page = Math.floor(reviewCount / divider);

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
      limit: getLimit(),
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
      <Head>
        <meta
          property="og:title"
          content={`소담 :: ${shopInfo?.shopName || '소품샵 여정의 이야기를 담다'}`}
        />
        <title>소담 :: {shopInfo?.shopName || '소품샵 여정의 이야기를 담다'}</title>
      </Head>
      <ColoredBackground />
      {toast}
      <ImageGridWrapper>
        <DetailImageGrid imageList={shopInfo?.image} />
        {shopInfo && <DetailInfo shopInfo={shopInfo} fireToast={fireToast} />}
      </ImageGridWrapper>
      <Wrapper>
        <KakaoMap initialize={initialize} mapType={'shopDetail'} mapRef={mapRef}>
          {showDetailShopAddress()}
        </KakaoMap>
        <LabelContentWrapper>
          <LabelWithOptions>
            <LabelWrapper>
              <Label>소품샵 리뷰</Label>
              {shopInfo && <WriteReviewLink shopId={SHOP_ID} shopName={shopInfo.shopName} />}
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

  ${applyMediaQuery('mobile', 'tablet')} {
    gap: 3.5rem;
  }

  padding-bottom: 8rem;
`;

const ImageGridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 6%;
  z-index: 2;
  gap: 5.6rem;

  ${applyMediaQuery('mobile', 'tablet')} {
    gap: 0.8rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 9.6rem;
  ${applyMediaQuery('mobile', 'tablet')} {
    gap: 3.5rem;
  }
`;

const ColoredBackground = styled.div`
  ${applyMediaQuery('mobile', 'tablet')} {
    display: none;
  }
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
  ${applyMediaQuery('mobile', 'tablet')} {
    font-size: 1.4rem;
    line-height: 2rem;
  }
`;

const LabelContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5.6rem;

  ${applyMediaQuery('desktop')} {
    gap: 4rem;
  }
  ${applyMediaQuery('tablet', 'mobile')} {
    gap: 1.5rem;
  }
`;

const ReviewGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 4rem 2.4rem;
  ${applyMediaQuery('tablet')} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2.5rem 1.2rem;
  }
  ${applyMediaQuery('mobile')} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.6rem 0.6rem;
  }
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

  ${applyMediaQuery('mobile', 'tablet')} {
    gap: 1.2rem;
  }
`;

export default Detail;
