import PreviewImageList from 'components/review/write/PreviewImageList';
import PreviewImageMain from 'components/review/write/PreviewImageMain';
import { useState } from 'react';
import { ReviewImage } from 'types/review';

function Write() {
  const [reviewImageList, setReviewImageList] = useState<ReviewImage[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, currentIndex: number) => {
    if (e.target.files === null) return;

    const dataList = Array.from(e.target.files);
    const tempImageList = [...reviewImageList];

    dataList.forEach((data, index) => {
      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onloadend = () => {
        if (reader.result instanceof ArrayBuffer) return;

        tempImageList[currentIndex + index] = { file: data, preview: reader.result };
        setReviewImageList(tempImageList);
      };
    });
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
