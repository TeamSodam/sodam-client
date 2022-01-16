import PreviewImageList from 'components/review/write/PreviewImageList';
import PreviewImageMain from 'components/review/write/PreviewImageMain';
import { useState } from 'react';

interface ReviewImage {
  file: File | null;
  preview: string | null;
}

function Write() {
  const [reviewImage, setReviewImage] = useState<ReviewImage>({ file: null, preview: null });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const data: File = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(data);

    reader.onloadend = () => {
      if (reader.result instanceof ArrayBuffer) return;
      setReviewImage({
        file: data,
        preview: reader.result,
      });
    };
  };
  const handleImageDelete = () => {
    setReviewImage({ file: null, preview: null });
  };

  return (
    <>
      <PreviewImageMain
        reviewImage={reviewImage}
        handleImageUpload={handleImageUpload}
        handleImageDelete={handleImageDelete}
      />
      <PreviewImageList />
    </>
  );
}

export default Write;
