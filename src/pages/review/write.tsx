import PreviewImageList from 'components/review/write/PreviewImageList';
import PreviewImageMain from 'components/review/write/PreviewImageMain';
import ReviewText from 'components/review/write/ReviewText';
import { useEffect, useState } from 'react';
import { ReviewImage } from 'types/review';

interface ReviewData {
  text: string;
  tags: string[];
}

function Write() {
  const [isSubmitAvailable, setIsSubmitAvailable] = useState(false);
  const [reviewImageList, setReviewImageList] = useState<ReviewImage[]>([]);
  const [reviewData, setReviewData] = useState<ReviewData>({ text: '', tags: [] });

  useEffect(() => {
    if (reviewImageList.length > 0 && reviewData.text.length >= 35) {
      setIsSubmitAvailable(true);
    }
  }, [reviewImageList, reviewData]);

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

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let data = e.target.value;
    if (data.length > 500) {
      data = data.slice(0, 500);
    }
    const tempData: ReviewData = { ...reviewData };
    tempData.text = data;
    setReviewData(tempData);
  };

  const handleTagSubmit = (data: string) => {
    const tempData: ReviewData = { ...reviewData };
    tempData.tags.push(data);
    setReviewData(tempData);
  };

  const handleTagDelete = (data: string) => {
    const tempData: ReviewData = { ...reviewData };
    tempData.tags = tempData.tags.filter((tag) => tag !== data);
    setReviewData(tempData);
  };

  return (
    <>
      <PreviewImageMain
        mainImage={reviewImageList[0]}
        handleImageUpload={handleImageUpload}
        handleImageDelete={handleImageDelete}
      />
      <PreviewImageList
        reviewImageList={reviewImageList}
        handleImageUpload={handleImageUpload}
        handleImageDelete={handleImageDelete}
        changeMainImage={changeMainImage}
      />
      <ReviewText text={reviewData.text} handleTextChange={handleTextChange} />
    </>
  );
}

export default Write;
