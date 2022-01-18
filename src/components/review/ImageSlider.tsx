import 'swiper/swiper.min.css';

import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import shortId from 'shortid';
import styled from 'styled-components';
import SwiperCore, { Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import ImageCard from './ImageCard';

interface ImageSliderProps {
  imageList: string[];
}

function ImageSlider(props: ImageSliderProps) {
  const { imageList } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideImageList, setSlideImageList] = useState(imageList.slice(1));

  const emptyCardCount: number = 7 - imageList.length;
  const emptyCardList: string[] | null =
    emptyCardCount > 0 ? new Array(emptyCardCount).fill('') : null; // 빈 카드 내용은 '' 로 채움

  SwiperCore.use([Navigation, Scrollbar]);

  const settings = useMemo<Swiper>(
    () => ({
      spaceBetween: 10, // px
      navigation: {
        prevEl: '.button__prev', // 이전 버튼
        nextEl: '.button__next', // 다음 버튼
      },
      scrollbar: { draggable: true, el: null },
      slidesPerView: 6,
    }),
    [],
  );

  const changeImage = (index: number): void => {
    const tempList = [...imageList];
    const newIndex = index < currentIndex ? index : index + 1;
    setCurrentIndex(newIndex);
    tempList.splice(newIndex, 1);
    setSlideImageList(tempList);
  };

  return (
    <StyledRoot>
      <ImageWrapper>
        <Image src={imageList[currentIndex]} layout="fill" alt="review" />
      </ImageWrapper>
      {imageList.length > 1 && (
        <StyledSwiper>
          <StyledButton className="button__prev">
            <Image src={'/assets/ic_prev_round.svg'} width={48} height={48} alt="prev" />
          </StyledButton>
          <Swiper {...settings}>
            {slideImageList.map((image, index) => (
              <SwiperSlide key={shortId.generate()}>
                <ImageCard data={image} onClick={() => changeImage(index)} />
              </SwiperSlide>
            ))}
            {emptyCardList &&
              emptyCardList.map((empty) => (
                <SwiperSlide key={shortId.generate()}>
                  <ImageCard data={empty} />
                </SwiperSlide>
              ))}
          </Swiper>
          <StyledButton className="button__next">
            <Image src={'/assets/ic_next_round.svg'} width={48} height={48} alt="next" />
          </StyledButton>
        </StyledSwiper>
      )}
    </StyledRoot>
  );
}

const ImageWrapper = styled.div`
  width: 79.2rem;
  height: 40.5rem;

  position: relative !important;

  & > span {
    position: unset !important;
  }

  & img {
    width: 100% !important;
  }
`;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .swiper {
    &-wrapper,
    &-container {
      width: 50rem;
      margin: 0;
    }
    &-button-disabled {
      visibility: hidden;
    }
  }
  .button {
    &__prev {
      margin-right: -2.8rem;
      margin-top: 1.1rem;
      z-index: 2;
    }
    &__next {
      margin-left: -2.8rem;
      margin-top: 1.1rem;
      z-index: 2;
    }
  }
`;
const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0;
`;
const StyledSwiper = styled.div`
  display: flex;
  margin-top: 3.2rem;
`;

export default ImageSlider;
