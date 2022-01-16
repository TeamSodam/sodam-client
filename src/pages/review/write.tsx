import PreviewImageList from 'components/review/write/PreviewImageList';
import PreviewImageMain from 'components/review/write/PreviewImageMain';
import { useState } from 'react';
import { ReviewImage } from 'types/review';

function Write() {
  const [reviewImageList, setReviewImageList] = useState<ReviewImage[]>([]);

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
    </>
  );
}

export default Write;
