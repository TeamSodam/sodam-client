import { wrapper } from 'app/store';
import ShopSearch from 'components/review/ShopSearch';
import PreviewImageList from 'components/review/write/PreviewImageList';
import PreviewImageMain from 'components/review/write/PreviewImageMain';
import ReviewText from 'components/review/write/ReviewText';
import SubmitButton from 'components/review/write/SubmitButton';
import TagList from 'components/review/write/TagList';
import Title from 'components/review/write/Title';
import WriteItems from 'components/review/WriteItems/index';
import { usePostReviewMutation } from 'features/reviews/reviewApi';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { useRouter } from 'next/router';
import { parseShopId, parseShopName } from 'pages/review/detail/[reviewId]';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { Item, ReviewImage, ReviewWriteKey, ReviewWriteRequest } from 'types/review';
import { PriceOptionList, ShopCategoryType } from 'types/shop';

interface WriteProps {
  userName: string;
  query: NextParsedUrlQuery;
}

function Write(props: WriteProps) {
  const { userName = '소푸미', query } = props;
  const router = useRouter();

  const [isSubmitAvailable, setIsSubmitAvailable] = useState(false);
  const [reviewImageList, setReviewImageList] = useState<ReviewImage[]>([]);
  const [reviewData, setReviewData] = useState<ReviewWriteRequest>({
    shopId: parseShopId(query.shopId),
    shopName: parseShopName(query.shopName),
    image: [],
    content: '',
    tag: [],
    item: [],
  });

  const [postReview] = usePostReviewMutation();

  useEffect(() => {
    if (
      reviewImageList.length > 0 &&
      reviewData.content.length >= 35 &&
      reviewData.shopName.length > 0
    ) {
      setIsSubmitAvailable(true);
    } else {
      setIsSubmitAvailable(false);
    }
  }, [reviewImageList, reviewData.content, reviewData.shopName]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    const MAX_NUM = 10;

    const tempImageList = [...reviewImageList];
    const dataList = Array.from(e.target.files);

    if (reviewImageList.length + dataList.length > MAX_NUM) {
      const restSize = MAX_NUM - reviewImageList.length;
      dataList.splice(restSize);
    }

    const promiseList: Array<Promise<ReviewImage>> = dataList.map(
      async (data) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(data);
          reader.onloadend = () => {
            if (reader.result instanceof ArrayBuffer) {
              resolve({
                file: null,
                preview: null,
              });

              return;
            }
            resolve({ file: data, preview: reader.result });
          };
        }),
    );

    const resolvedList = await Promise.all(promiseList);
    resolvedList.forEach((resolvedData: ReviewImage) => {
      tempImageList.push(resolvedData);
    });

    setReviewImageList(tempImageList);
  };

  const handleImageUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    const tempImageList = [...reviewImageList];

    const reader = new FileReader();
    const data = e.target.files[0];
    reader.readAsDataURL(data);

    reader.onloadend = () => {
      if (reader.result instanceof ArrayBuffer) {
        return;
      }
      tempImageList[0] = { file: data, preview: reader.result };
      setReviewImageList(tempImageList);
    };
  };

  const handleResultSelect = (shopId: number) => {
    setReviewData((prevReviewData) => ({
      ...prevReviewData,
      shopId,
    }));
  };

  const handleImageDelete = (index: number) => {
    if (reviewImageList.length <= 1) {
      setReviewImageList([]);
      return;
    }
    const tempImageList = [...reviewImageList];
    tempImageList.splice(index, 1);
    setReviewImageList(tempImageList);
  };

  // 기존 대표 이미지와 교체
  const changeMainImage = (index: number) => {
    const newMainImage = reviewImageList[index];
    const prevMainImage = reviewImageList[0];
    const tempImageList = [...reviewImageList];
    tempImageList.splice(index, 1, prevMainImage);
    tempImageList.splice(0, 1, newMainImage);
    setReviewImageList(tempImageList);
  };

  const handleDataChange = (data: string, key: Extract<ReviewWriteKey, 'content' | 'shopName'>) => {
    if (data.length > 500) {
      data = data.slice(0, 500);
    }
    const tempData: ReviewWriteRequest = { ...reviewData };
    tempData[key] = data;
    setReviewData(tempData);
  };

  const handleItemSubmit = (
    data: ShopCategoryType | PriceOptionList,
    index: number,
    type: keyof Item,
  ) => {
    const tempData: ReviewWriteRequest = { ...reviewData };
    tempData.item[index] = { ...tempData.item[index], [type]: data };
    setReviewData(tempData);
  };

  const handleTagSubmit = (data: string) => {
    const tempData: ReviewWriteRequest = { ...reviewData };
    tempData.tag.push(data);
    setReviewData(tempData);
  };

  const handleTagDelete = (data: string) => {
    const tempData: ReviewWriteRequest = { ...reviewData };
    tempData.tag = tempData.tag.filter((item) => item !== data);
    setReviewData(tempData);
  };

  // 최종 제출
  const handleFormSubmit = async () => {
    if (isSubmitAvailable) {
      const tempData: ReviewWriteRequest = { ...reviewData };
      tempData.item.shift();
      reviewImageList.forEach((reviewImage) => {
        reviewImage.file && tempData.image.push(reviewImage.file);
      });
      const result = await postReview(tempData);
      if ('data' in result) {
        router.push(
          `/review/detail/${result.data.reviewId}?shopId=${result.data.shopId}&reviewType=myWrite`,
        );
      }
    }
  };

  return (
    <StyledRoot>
      <Title name={userName} />
      <StyledTop>
        <PreviewImageMain
          mainImage={reviewImageList[0]}
          handleImageUpload={handleImageUpload}
          handleImageUpdate={handleImageUpdate}
          handleImageDelete={handleImageDelete}
        />
        <StyledTopRight>
          <ShopSearch
            selectedShop={reviewData.shopName}
            handleDataChange={handleDataChange}
            handleResultSelect={handleResultSelect}
          />
          <WriteItems selectedItemList={reviewData.item} handleItemSubmit={handleItemSubmit} />
        </StyledTopRight>
      </StyledTop>
      <PreviewImageList
        reviewImageList={reviewImageList}
        handleImageUpload={handleImageUpload}
        handleImageDelete={handleImageDelete}
        changeMainImage={changeMainImage}
      />
      <ReviewText content={reviewData.content} handleDataChange={handleDataChange} />
      <TagList
        tag={reviewData.tag}
        handleTagSubmit={handleTagSubmit}
        handleTagDelete={handleTagDelete}
      />
      <SubmitButton isSubmitAvailable={isSubmitAvailable} handleFormSubmit={handleFormSubmit} />
    </StyledRoot>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(() => async (context) => ({
  props: {
    query: context.query,
  },
}));

const StyledRoot = styled.div`
  width: 79.2rem;
  margin: 0 auto;
  ${applyMediaQuery('desktop', 'tablet')} {
    width: 52.9rem;
  }
`;
const StyledTop = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 3.2rem;
  padding-bottom: 2rem;
  ${applyMediaQuery('desktop', 'tablet')} {
    padding-top: 3rem;
    padding-bottom: 1.3rem;
  }
`;
const StyledTopRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default Write;
