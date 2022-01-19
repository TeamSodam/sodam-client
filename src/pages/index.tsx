import { wrapper } from 'app/store';
import BannerList from 'components/BannerList';
import MainSlider from 'components/common/MainSlider';
import ReviewCard from 'components/common/ReviewCard';
import ShopCard from 'components/common/ShopCard';
import ShopCardRank from 'components/common/ShopCardRank';
import ThemeSelector from 'components/ThemeSelector';
import { MoreFilterList } from 'constants/dropdownOptionList';
import { reviewApi } from 'features/reviews/reviewApi';
import { shopApi } from 'features/shops/shopApi';
import { selectUserInfo } from 'features/users/userSlice';
import { useAppSelector } from 'src/app/hook';
import styled from 'styled-components';
import { ReviewRecentResponse } from 'types/review';
import { ShopResponse } from 'types/shop';

interface HomePrefetchProps {
  randomShopList: ShopResponse[];
  popularShopList: ShopResponse[];
  reviewList: ReviewRecentResponse[];
}

function Home(props: HomePrefetchProps) {
  const { randomShopList, reviewList, popularShopList } = props;
  const { nickname } = useAppSelector(selectUserInfo);
  const randomCategory = MoreFilterList[Math.floor(Math.random() * 6)];

  const showRandomShopSlider = () => {
    const cardList = randomShopList.map((shop) => <ShopCard key={shop.shopId} cardData={shop} />);

    return <MainSlider slidesPerView={4} cardList={cardList} />;
  };

  const showReviewSlider = () => {
    const reviewCardList = reviewList.map((review) => (
      <ReviewCard key={review.reviewId} reviewData={review} isHoverAvailable />
    ));

    return <MainSlider slidesPerView={3} cardList={reviewCardList} />;
  };

  const showPopularShopSlider = () => {
    const cardList = popularShopList.map((shop, index) => {
      if (index <= 2) {
        return <ShopCardRank key={shop.shopId} cardData={{ ...shop, rank: index + 1 }} />;
      }

      return <ShopCard key={shop.shopId} cardData={shop} />;
    });

    return <MainSlider slidesPerView={4} cardList={cardList} />;
  };

  const showRandomCategorySlider = () => {
    const cardList = randomShopList
      .filter((shop) => shop.category.includes(randomCategory))
      .map((shop) => <ShopCard key={shop.shopId} cardData={shop} />);

    return <MainSlider slidesPerView={4} cardList={cardList} />;
  };

  return (
    <Container>
      <BannerList />
      <MarginWrapper>
        <LabelContentWrapper>
          <Label>
            <em>{nickname}</em>님, 이 소품샵은 어떠세요?
          </Label>
          {showRandomShopSlider()}
        </LabelContentWrapper>
        <LabelContentWrapper>
          <Label>오늘의 소품샵 리뷰</Label>
          {showReviewSlider()}
        </LabelContentWrapper>
        <ThemeSelector />
        <LabelContentWrapper>
          <Label>
            주간 <em>HOT</em> 소품샵
          </Label>
          {showPopularShopSlider()}
        </LabelContentWrapper>
        <LabelContentWrapper>
          <Label>
            <em>{randomCategory}</em> 소품샵 리스트
          </Label>
          {showRandomCategorySlider()}
        </LabelContentWrapper>
      </MarginWrapper>
    </Container>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const dispatch = store.dispatch;
  const randomShopResult = await dispatch(shopApi.endpoints.getShopInfo.initiate('random'));
  const popularShopResult = await dispatch(shopApi.endpoints.getShopInfo.initiate('popular'));
  const reviewResult = await dispatch(reviewApi.endpoints.getReviewRecent.initiate());

  const resultProps: {
    randomShopList: ShopResponse[];
    reviewList: ReviewRecentResponse[];
    popularShopList: ShopResponse[];
  } = {
    randomShopList: [],
    reviewList: [],
    popularShopList: [],
  };

  if (randomShopResult.isSuccess) {
    const axiosResult = randomShopResult.data;
    if (axiosResult.status === 200) {
      resultProps.randomShopList = axiosResult.data;
    }
  }

  if (popularShopResult.isSuccess) {
    const axiosResult = popularShopResult.data;
    if (axiosResult.status === 200) {
      resultProps.popularShopList = axiosResult.data;
    }
  }

  if (reviewResult.isSuccess) {
    const axiosResult = reviewResult.data;
    if (axiosResult.status === 200) {
      resultProps.reviewList = axiosResult.data.filter((data) => data.image[0] !== null);
      console.log(axiosResult.data);
    }
  }

  return {
    props: resultProps,
  };
});

const Container = styled.main`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const MarginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 6.5rem 18.75%;

  gap: 9rem;
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
  gap: 3.2rem;
`;

export default Home;
