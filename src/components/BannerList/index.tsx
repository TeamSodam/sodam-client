import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';

import Banner from 'components/common/Banner';
import Link from 'next/link';
import FirstBannerBtn from 'public/assets/banner/banner_01_btn.svg';
import ThirdBannerBtn from 'public/assets/banner/banner_03_btn.svg';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const BANNER_SRC_LIST = [
  {
    src: '/assets/banner/banner_01.svg',
    Button: FirstBannerBtn,
  },
  {
    src: '/assets/banner/banner_02.svg',
    Button: null,
  },
  {
    src: '/assets/banner/banner_03.png',
    Button: ThirdBannerBtn,
  },
];

function BannerList() {
  SwiperCore.use([Navigation]);
  const [swiperSetting, setSwiperSetting] = useState<Swiper | null>(null);

  useEffect(() => {
    if (!swiperSetting) {
      setSwiperSetting({
        spaceBetween: 24, // px
        scrollbar: { draggable: true, el: null },
        slidesPerView: 1,
      });
    }
  }, [swiperSetting]);

  const BANNER_LIST = (
    <Swiper navigation autoplay={{ delay: 5000 }} className="mySlider">
      {BANNER_SRC_LIST.map((bannerSrc) => {
        const { src, Button } = bannerSrc;
        return (
          <SwiperSlide key={src}>
            <Banner src={src}>
              {Button && (
                <Link href="/shop/theme/아기자기한" passHref>
                  <BannerBtn>
                    <Button />
                  </BannerBtn>
                </Link>
              )}
            </Banner>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );

  return <Container>{BANNER_LIST}</Container>;
}

const Container = styled.div`
  width: 100%;
  height: 517px;

  & .mySlider {
    & > div {
      width: 100%;
      height: 100%;
      & > .swiper-slide {
        width: 100%;
        height: 517px;
      }
    }
  }

  .mySlider .swiper-button-prev {
    width: fit-content;
    height: fit-content;
    top: 50%;
    left: 30px;
    color: white;
  }
  .mySlider .swiper-button-next {
    width: fit-content;
    height: fit-content;
    top: 50%;
    right: 30px;
    color: white;
  }
`;

const BannerBtn = styled.div`
  position: absolute;
  bottom: 10rem;
  left: 18.75%;

  &:hover {
    cursor: pointer;
  }
`;

export default BannerList;
