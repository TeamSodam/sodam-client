import BannerList from 'components/BannerList';
import MainSlider from 'components/common/MainSlider';
import MoreFilter from 'components/common/MoreFilter';
import ReviewCard from 'components/common/ReviewCard';
import ShopCard from 'components/common/ShopCard';
import ShopCardRank from 'components/common/ShopCardRank';
import ThemeSelector from 'components/ThemeSelector';
import { MoreFilterList } from 'constants/dropdownOptionList';
import { useGetReviewRecentQuery } from 'features/reviews/reviewApi';
import { useGetShopByCategoryQuery, useGetShopInfoQuery } from 'features/shops/shopApi';
import { selectUserInfo } from 'features/users/userSlice';
import useMedia from 'hooks/useMedia';
import { useState } from 'react';
import { useAppSelector } from 'src/app/hook';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

const randomCategory = MoreFilterList[Math.floor(Math.random() * 6)];

function Home() {
  const { nickname } = useAppSelector(selectUserInfo);
  const [currentCategory, setCurrentCategory] = useState(randomCategory);
  const { data: randomShopList } = useGetShopInfoQuery('random');
  const { data: popularShopList } = useGetShopInfoQuery('popular');
  const { data: reviewResultList } = useGetReviewRecentQuery();
  const { data: categoryShopList } = useGetShopByCategoryQuery(currentCategory.replace('·', ''));

  const { isMobile, isTablet, isDesktop } = useMedia();

  const getSlidesPerView = (type: 'shop' | 'review'): number => {
    switch (type) {
      case 'shop':
        if (isDesktop) return 4;
        if (isTablet) return 3;
        if (isMobile) return 2;
        return 4;
      case 'review':
        if (isDesktop) return 3;
        if (isTablet || isMobile) return 2;
        return 3;
      default:
        return 4;
    }
  };

  const showRandomShopSlider = () => {
    if (!randomShopList) return;
    const cardList = randomShopList.map((shop) => <ShopCard key={shop.shopId} cardData={shop} />);

    return <MainSlider slidesPerView={getSlidesPerView('shop')} cardList={cardList} isShopCard />;
  };

  const showReviewSlider = () => {
    if (!reviewResultList) return;
    const reviewCardList = reviewResultList.map((review) => (
      <ReviewCard key={review.reviewId} reviewData={review} isHoverAvailable />
    ));

    return (
      <MainSlider
        slidesPerView={getSlidesPerView('review')}
        cardList={reviewCardList}
        isShopCard={false}
      />
    );
  };

  const showPopularShopSlider = () => {
    if (!popularShopList) return;
    const cardList = popularShopList.map((shop, index) => {
      if (index <= 2) {
        return <ShopCardRank key={shop.shopId} cardData={{ ...shop, rank: index + 1 }} />;
      }

      return <ShopCard key={shop.shopId} cardData={shop} />;
    });

    return <MainSlider slidesPerView={getSlidesPerView('shop')} cardList={cardList} isShopCard />;
  };

  const showRandomCategorySlider = () => {
    if (!categoryShopList) return;
    const cardList = categoryShopList.map((shop) => <ShopCard key={shop.shopId} cardData={shop} />);
    return <MainSlider slidesPerView={getSlidesPerView('shop')} cardList={cardList} isShopCard />;
  };

  return (
    <Container>
      <BannerList />
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
        <LabelFilterWrapper>
          <Label>
            <em>{currentCategory}</em> 소품샵 리스트
          </Label>
          <MoreFilter currentCategory={currentCategory} updateCategory={setCurrentCategory} />
        </LabelFilterWrapper>
        {showRandomCategorySlider()}
      </LabelContentWrapper>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  background-color: white;

  gap: 9rem;
  padding-bottom: 9rem;

  ${applyMediaQuery('desktop')} {
    gap: 7.5rem;
  }
  ${applyMediaQuery('mobile')} {
    gap: 3.6rem;
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

  ${applyMediaQuery('desktop')} {
    font-size: 2.6rem;
    line-height: 3.8rem;
  }
  ${applyMediaQuery('mobile')} {
    font-size: 1.4rem;
    line-height: 2rem;
  }
`;

const LabelContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  ${applyMediaQuery('desktop')} {
    gap: 2rem;
  }
  ${applyMediaQuery('mobile')} {
    gap: 1.6rem;
  }
`;

const LabelFilterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default Home;
