import ShopSearch from 'components/review/ShopSearch';
import PreviewImageList from 'components/review/write/PreviewImageList';
import PreviewImageMain from 'components/review/write/PreviewImageMain';
import ReviewText from 'components/review/write/ReviewText';
import SubmitButton from 'components/review/write/SubmitButton';
import TagList from 'components/review/write/TagList';
import Title from 'components/review/write/Title';
import WriteItems from 'components/review/WriteItems/index';
import { usePostReviewMutation } from 'features/reviews/reviewApi';
import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router';
import { parseShopId, parseShopName } from 'pages/review/detail/[reviewId]';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Item, ReviewImage, ReviewWriteKey, ReviewWriteRequest } from 'types/review';
import { PriceOptionList, ShopCategoryType } from 'types/shop';

interface WriteProps {
  userName: string;
}

function Write(props: WriteProps) {
  const { userName = '소푸미' } = props;

  const router = useRouter();
  const { shopId, shopName } = router.query;

  const [isSubmitAvailable, setIsSubmitAvailable] = useState(false);
  const [reviewImageList, setReviewImageList] = useState<ReviewImage[]>([]);
  const [reviewData, setReviewData] = useState<ReviewWriteRequest>({
    shopId: parseShopId(shopId),
    shopName: parseShopName(shopName),
    image: [],
    content: '',
    tag: [],
    item: [],
  });

  const [postReview] = usePostReviewMutation();

  useEffect(() => {
    const { shopId, shopName } = router.query;
    const tempData = { ...reviewData };

    tempData.shopId = parseShopId(shopId);
    tempData.shopName = parseShopName(shopName);
    setReviewData(tempData);
  }, [router]);

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

  // function isArrItemTypeSame<T>(data: T, list: any[]): list is T[] {
  //   const tempArray = [data];
  //   return typeof tempArray === typeof list;
  // }

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
      await postReview(tempData);
      router.back();
    }
  };

  return (
    <StyledRoot>
      <Title name={userName} />
      <StyledTop>
        <PreviewImageMain
          mainImage={reviewImageList[0]}
          handleImageUpload={handleImageUpload}
          handleImageDelete={handleImageDelete}
        />
        <StyledTopRight>
          <ShopSearch selectedShop={reviewData.shopName} handleDataChange={handleDataChange} />
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

const StyledRoot = styled.div`
  width: 79.2rem;
  margin: 0 auto;
`;
const StyledTop = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 3.2rem;
  padding-bottom: 2rem;
`;
const StyledTopRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default Write;
