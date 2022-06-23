import { wrapper } from 'app/store';
import DropDownFilter from 'components/common/DropDownFilter';
import OtherReviewContainer from 'components/review/OtherReview/Container';
import {
  OtherMyScrapReview,
  OtherMyWriteReview,
  OtherShopReview,
} from 'components/review/OtherReview/Presentation';
import ReviewDetailCard from 'components/review/ReviewDetailCard';
import { REVIEW_MAP } from 'constants/reviewActiveMap';
import { useGetShopReviewByIdQuery } from 'features/reviews/reviewApi';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { useState } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { ReviewSortType } from 'types/review';

export const parseShopId = (shopId: string | string[] | undefined) => {
  if (!shopId) return 0;
  if (Array.isArray(shopId)) return +shopId.join('');

  return +shopId;
};
export const parseShopName = (shopName: string | string[] | undefined) => {
  if (!shopName) return '';
  if (typeof shopName === 'string') return JSON.parse(JSON.stringify(shopName));
};

function Detail({ params, query }: { params: NextParsedUrlQuery; query: NextParsedUrlQuery }) {
  const REVIEW_ID = parseShopId(params.reviewId);
  const SHOP_ID = parseShopId(query.shopId);
  const REVIEW_TYPE = parseShopName(query.reviewType);
  const [currentSortType, setCurrentSortType] = useState<ReviewSortType>('save');

  const shopRequestInfo = {
    shopId: SHOP_ID,
    sortType: currentSortType,
    offset: 1,
    limit: 9,
  };

  const { data: reviewData } = useGetShopReviewByIdQuery({
    reviewId: REVIEW_ID,
    shopId: SHOP_ID,
  });

  const filterProps = [
    {
      filterName: '스크랩 많은 순',
      onClick: () => {
        setCurrentSortType('save');
      },
    },
    {
      filterName: '좋아요 많은 순',
      onClick: () => {
        setCurrentSortType('like');
      },
    },
    {
      filterName: '최신 순',
      onClick: () => {
        setCurrentSortType('recent');
      },
    },
  ];

  const getReviewDataByReviewType = () => {
    switch (REVIEW_TYPE) {
      case 'myWrite':
        return <OtherMyWriteReview reviewId={REVIEW_ID} />;
      case 'myScrap':
        return <OtherMyScrapReview reviewId={REVIEW_ID} />;
      default:
        return <OtherShopReview reqInfo={shopRequestInfo} reviewId={REVIEW_ID} />;
    }
  };

  return (
    <StyledReviewDetailWrapper>
      {reviewData && <ReviewDetailCard reviewData={reviewData} />}
      <OtherReviewCardWrapper>
        <ReviewListHeader>
          <HeaderTitle>{REVIEW_MAP[REVIEW_TYPE]}</HeaderTitle>
          {REVIEW_TYPE === 'shop' && <DropDownFilter pageType="detail" filterProps={filterProps} />}
        </ReviewListHeader>
        <ReviewListContent>
          <OtherReviewContainer reviewDataList={getReviewDataByReviewType()} />
        </ReviewListContent>
      </OtherReviewCardWrapper>
    </StyledReviewDetailWrapper>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(() => async (context) => ({
  props: {
    params: context.params,
    query: context.query,
  },
}));

const StyledReviewDetailWrapper = styled.div`
  width: 79.2rem;
  margin: 7.2rem auto;
  margin-bottom: 8rem;
  ${applyMediaQuery('desktop', 'tablet')} {
    width: 52.8rem;
    margin: 5.2rem auto;
    margin-bottom: 6rem;
  }
  ${applyMediaQuery('mobile')} {
    width: 31.2rem;
    margin: 2.5rem auto;
    margin-bottom: 3.5rem;
  }
`;

const OtherReviewCardWrapper = styled.div``;

const ReviewListHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black1};
  ${applyMediaQuery('desktop', 'tablet')} {
    font-size: 2rem;
  }
  ${applyMediaQuery('mobile')} {
    font-size: 1.4rem;
  }
`;

const ReviewListContent = styled.div`
  margin-top: 3.2rem;
  width: 100%;
  ${applyMediaQuery('desktop', 'tablet')} {
    margin-top: 1.8rem;
  }
  ${applyMediaQuery('mobile')} {
    margin-top: 1.6rem;
  }
`;

export default Detail;
