import MainSlider from 'components/common/MainSlider';
import ReviewCard from 'components/common/ReviewCard';
import ShopCardRank from 'components/common/ShopCardRank';
import ImageSlider from 'components/review/ImageSlider';
import styled from 'styled-components';
import { ReviewCardData } from 'types/review';
import { ShopCardData } from 'types/shop';

function SliderTesting() {
  const shopDummyData: ShopCardData[] = [
    {
      id: 1,
      thumbnail: '/assets/ex_thumbnail.png',
      name: '소품샵1',
      categoryList: ['카테고리', '아기자기'],
      rank: 1,
    },
    {
      id: 2,
      thumbnail: '/assets/ex_thumbnail.png',
      name: '소품샵2',
      categoryList: ['카테고리', '아기자기'],
      rank: 2,
    },
    {
      id: 3,
      thumbnail: '/assets/ex_thumbnail.png',
      name: '소품샵3',
      categoryList: ['카테고리', '아기자기'],
      rank: 3,
    },
    {
      id: 4,
      thumbnail: '/assets/ex_thumbnail.png',
      name: '소품샵4',
      categoryList: ['카테고리', '아기자기'],
    },
    {
      id: 5,
      thumbnail: '/assets/ex_thumbnail.png',
      name: '소품샵5',
      categoryList: ['카테고리', '아기자기'],
    },
    {
      id: 6,
      thumbnail: '/assets/ex_thumbnail.png',
      name: '소품샵6',
      categoryList: ['카테고리', '아기자기'],
    },
    {
      id: 7,
      thumbnail: '/assets/ex_thumbnail.png',
      name: '소품샵7',
      categoryList: ['카테고리', '아기자기'],
    },
    {
      id: 8,
      thumbnail: '/assets/ex_thumbnail.png',
      name: '소품샵8',
      categoryList: ['카테고리', '아기자기'],
    },
  ];
  const reviewDummyData: ReviewCardData[] = [
    {
      id: 1,
      thumbnail: '/assets/ex_thumbnail.png',
      shopName: '소품샵1',
      shopCategoryList: ['카테고리', '아기자기'],
      text: '리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미',
      writer: { name: '권소희', thumbnail: '/assets/ex_profile.jpg' },
      date: '2022-01-11',
      liked: 101,
      saved: 56,
    },
    {
      id: 2,
      thumbnail: '/assets/ex_thumbnail.png',
      shopName: '소품샵2',
      shopCategoryList: ['카테고리', '아기자기'],
      text: '리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미',
      writer: { name: '권소희', thumbnail: '/assets/ex_profile.jpg' },
      date: '2022-01-11',
      liked: 101,
      saved: 56,
    },
    {
      id: 3,
      thumbnail: '/assets/ex_thumbnail.png',
      shopName: '소품샵3',
      shopCategoryList: ['카테고리', '아기자기'],
      text: '리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미',
      writer: { name: '권소희', thumbnail: '/assets/ex_profile.jpg' },
      date: '2022-01-11',
      liked: 101,
      saved: 56,
    },
    {
      id: 4,
      thumbnail: '/assets/ex_thumbnail.png',
      shopName: '소품샵4',
      shopCategoryList: ['카테고리', '아기자기'],
      text: '리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미',
      writer: { name: '권소희', thumbnail: '/assets/ex_profile.jpg' },
      date: '2022-01-11',
      liked: 101,
      saved: 56,
    },
    {
      id: 5,
      thumbnail: '/assets/ex_thumbnail.png',
      shopName: '소품샵5',
      shopCategoryList: ['카테고리', '아기자기'],
      text: '리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미',
      writer: { name: '권소희', thumbnail: '/assets/ex_profile.jpg' },
      date: '2022-01-11',
      liked: 101,
      saved: 56,
    },
    {
      id: 6,
      thumbnail: '/assets/ex_thumbnail.png',
      shopName: '소품샵6',
      shopCategoryList: ['카테고리', '아기자기'],
      text: '리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미리뷰더미',
      writer: { name: '권소희', thumbnail: '/assets/ex_profile.jpg' },
      date: '2022-01-11',
      liked: 101,
      saved: 56,
    },
  ];
  const imageSliderDummyData: string[] = [
    '/assets/ex_thumbnail.png',
    '/assets/ex_thumbnail.png',
    '/assets/ex_thumbnail.png',
    '/assets/ex_thumbnail.png',
    '/assets/ex_thumbnail.png',
    '/assets/ex_thumbnail.png',
    '/assets/ex_thumbnail.png',
    '/assets/ex_thumbnail.png',
  ];

  const shopDataList = shopDummyData.map((data) => <ShopCardRank key={data.id} cardData={data} />);
  const shopTitle = (
    <>
      주간 <em>HOT</em> 소품샵
    </>
  );

  const reviewDataList = reviewDummyData.map((data) => (
    <ReviewCard key={data.id} reviewData={data} isHoverAvailable />
  ));
  const reviewTitle = <>오늘의 소품샵 리뷰</>;

  return (
    <StyledRoot>
      <MainSlider cardList={shopDataList} title={shopTitle} slidesPerView={4} />
      <MainSlider cardList={reviewDataList} title={reviewTitle} slidesPerView={3} />
      <ImageSlider imageList={imageSliderDummyData} />
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default SliderTesting;
