import BannerList from 'components/BannerList';
import MainSlider from 'components/common/MainSlider';
import MoreFilter from 'components/common/MoreFilter';
import ReviewCard from 'components/common/ReviewCard';
import ShopCard from 'components/common/ShopCard';
import ShopCardRank from 'components/common/ShopCardRank';
import ThemeSelector from 'components/ThemeSelector';
import { MoreFilterList } from 'constants/dropdownOptionList';
import { useGetReviewRecentQuery } from 'features/reviews/reviewApi';
import { shopApi, useGetShopByCategoryQuery, useGetShopInfoQuery } from 'features/shops/shopApi';
import { selectUserInfo } from 'features/users/userSlice';
import { useState } from 'react';
import { useAppSelector } from 'src/app/hook';
import styled from 'styled-components';
import { ShopCategoryType } from 'types/shop';

const randomCategory = MoreFilterList[Math.floor(Math.random() * 6)];

function Home() {
  const { nickname } = useAppSelector(selectUserInfo);
  const [currentCategory, setCurrentCategory] = useState(randomCategory);
  const { data: randomShopList2 } = useGetShopInfoQuery('random');
  const { data: popularShopList2 } = useGetShopInfoQuery('popular');
  const { data: reviewResultList2 } = useGetReviewRecentQuery();
  const { data: categoryShopList2 } = useGetShopByCategoryQuery(currentCategory.replace('·', ''));

  const [currentCategoryList2, setCurrentCategoryList2] = useState(categoryShopList2);
  const [getListByCategory] = shopApi.useLazyGetShopByCategoryQuery();

  const updateListByCategory2 = async (nextCategory: ShopCategoryType) => {
    setCurrentCategory(nextCategory);
    const updatedList = await getListByCategory(nextCategory.replace('·', ''));
    if (updatedList.data) setCurrentCategoryList2(updatedList.data);
  };

  const showRandomShopSlider2 = () => {
    if (!randomShopList2) return;
    const cardList = randomShopList2.map((shop) => <ShopCard key={shop.shopId} cardData={shop} />);

    return <MainSlider slidesPerView={4} cardList={cardList} />;
  };

  const showReviewSlider2 = () => {
    if (!reviewResultList2) return;
    const reviewCardList = reviewResultList2.map((review) => (
      <ReviewCard key={review.reviewId} reviewData={review} isHoverAvailable />
    ));

    return <MainSlider slidesPerView={3} cardList={reviewCardList} />;
  };

  const showPopularShopSlider2 = () => {
    if (!popularShopList2) return;
    const cardList = popularShopList2.map((shop, index) => {
      if (index <= 2) {
        return <ShopCardRank key={shop.shopId} cardData={{ ...shop, rank: index + 1 }} />;
      }

      return <ShopCard key={shop.shopId} cardData={shop} />;
    });

    return <MainSlider slidesPerView={4} cardList={cardList} />;
  };

  const showRandomCategorySlider = () => {
    if (!currentCategoryList2) return;
    const cardList = currentCategoryList2.map((shop) => (
      <ShopCard key={shop.shopId} cardData={shop} />
    ));
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
          {showRandomShopSlider2()}
        </LabelContentWrapper>
        <LabelContentWrapper>
          <Label>오늘의 소품샵 리뷰</Label>
          {showReviewSlider2()}
        </LabelContentWrapper>
        <ThemeSelector />
        <LabelContentWrapper>
          <Label>
            주간 <em>HOT</em> 소품샵
          </Label>
          {showPopularShopSlider2()}
        </LabelContentWrapper>
        <LabelContentWrapper>
          <LabelFilterWrapper>
            <Label>
              <em>{currentCategory}</em> 소품샵 리스트
            </Label>
            <MoreFilter currentCategory={currentCategory} updateList={updateListByCategory2} />
          </LabelFilterWrapper>
          {showRandomCategorySlider()}
        </LabelContentWrapper>
      </MarginWrapper>
    </Container>
  );
}

// export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
//   const dispatch = store.dispatch;
//   const randomShopResult = await dispatch(shopApi.endpoints.getShopInfo.initiate('random'));
//   const popularShopResult = await dispatch(shopApi.endpoints.getShopInfo.initiate('popular'));
//   const reviewResult = await dispatch(reviewApi.endpoints.getReviewRecent.initiate());
//   const categoryShopResult = await dispatch(
//     shopApi.endpoints.getShopByCategory.initiate(randomCategory.replace('·', '')),
//   );

//   const resultProps: {
//     randomShopList: ShopResponse[];
//     reviewList: ReviewRecentResponse[];
//     popularShopList: ShopResponse[];
//     categoryShopList: ShopResponse[];
//   } = {
//     randomShopList: [],
//     reviewList: [],
//     popularShopList: [],
//     categoryShopList: categoryShopResult.data || [],
//   };

//   if (randomShopResult.isSuccess) {
//     const axiosResult = randomShopResult.data;
//     if (axiosResult.status === 200) {
//       resultProps.randomShopList = axiosResult.data;
//     }
//   }

//   if (popularShopResult.isSuccess) {
//     const axiosResult = popularShopResult.data;
//     if (axiosResult.status === 200) {
//       resultProps.popularShopList = axiosResult.data;
//     }
//   }

//   if (reviewResult.isSuccess) {
//     const axiosResult = reviewResult.data;
//     if (axiosResult.status === 200) {
//       resultProps.reviewList = axiosResult.data.filter((data) => data.image[0] !== null);
//     }
//   }

//   return {
//     props: resultProps,
//   };
// });

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

const LabelFilterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default Home;
