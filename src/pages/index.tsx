import { wrapper } from 'app/store';
import Banner from 'components/common/Banner';
import MainSlider from 'components/common/MainSlider';
import ReviewCard from 'components/common/ReviewCard';
import ShopCard from 'components/common/ShopCard';
import ShopCardRank from 'components/common/ShopCardRank';
import ThemeSelector from 'components/ThemeSelector';
import { MoreFilterList } from 'constants/dropdownOptionList';
import { reviewApi } from 'features/reviews/reviewApi';
import { shopApi } from 'features/shops/shopApi';
import Head from 'next/head';
import Link from 'next/link';
import MainBannerBtn from 'public/assets/main_banner_btn.svg';
import styled from 'styled-components';
import { Review } from 'types/review';
import { Shop, ShopCategoryType } from 'types/shop';

interface HomePrefetchProps {
  randomShopList: Shop[] | undefined;
  popularShopList: Shop[] | undefined;
  reviewList: Review[] | undefined;
  randomCategory: ShopCategoryType;
}

function Home(props: HomePrefetchProps) {
  const { randomShopList, reviewList, popularShopList, randomCategory } = props;

  const showRandomShopSlider = () => {
    if (randomShopList) {
      const cardList = randomShopList.map((shop) => <ShopCard key={shop.shopId} cardData={shop} />);

      return <MainSlider slidesPerView={4} cardList={cardList} />;
    }
  };

  const showReviewSlider = () => {
    if (reviewList) {
      const reviewCardList = reviewList.map((review) => (
        <ReviewCard key={review.reviewId} reviewData={review} isHoverAvailable />
      ));

      return <MainSlider slidesPerView={3} cardList={reviewCardList} />;
    }
  };

  const showPopularShopSlider = () => {
    if (popularShopList) {
      const cardList = popularShopList.map((shop, index) => {
        if (index <= 2) {
          return <ShopCardRank key={shop.shopId} cardData={{ ...shop, rank: index + 1 }} />;
        }

        return <ShopCard key={shop.shopId} cardData={shop} />;
      });

      return <MainSlider slidesPerView={4} cardList={cardList} />;
    }
  };

  const showRandomCategorySlider = () => {
    if (randomShopList) {
      const cardList = randomShopList
        .filter((shop) => shop.category === randomCategory)
        .map((shop) => <ShopCard key={shop.shopId} cardData={shop} />);

      return <MainSlider slidesPerView={4} cardList={cardList} />;
    }
  };

  return (
    <>
      <Head>
        <title>소담, 소품샵 여정의 이야기를 담다</title>
        <meta name="description" content="소담, 소품샵 여정의 이야기를 담다" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Banner src="/assets/main_banner.svg">
          <Link href="/shop/theme/아기자기한" passHref>
            <BannerBtn />
          </Link>
        </Banner>
        <MarginWrapper>
          <LabelContentWrapper>
            <Label>
              <em>소푸미</em>님, 이 소품샵은 어떠세요?
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
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const dispatch = store.dispatch;
  const randomShopResult = await dispatch(shopApi.endpoints.getShopInfo.initiate('random'));
  const popularShopResult = await dispatch(shopApi.endpoints.getShopInfo.initiate('popular'));
  const reviewResult = await dispatch(reviewApi.endpoints.getReview.initiate());

  const randomCategory = MoreFilterList[Math.floor(Math.random() * 6)];

  return {
    props: {
      randomShopList: randomShopResult.data || null,
      reviewList: reviewResult.data || null,
      popularShopList: popularShopResult.data || null,
      randomCategory,
    },
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

const BannerBtn = styled(MainBannerBtn)`
  position: absolute;
  bottom: 10rem;
  left: 18.75%;

  &:hover {
    cursor: pointer;
  }
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
