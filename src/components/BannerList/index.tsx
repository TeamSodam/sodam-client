import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';

import Banner from 'components/common/Banner';
import Link from 'next/link';
import FirstBannerBtn from 'public/assets/banner/banner_01_btn.svg';
import ThirdBannerBtn from 'public/assets/banner/banner_03_btn.svg';
import styled from 'styled-components';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

SwiperCore.use([Navigation]);
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
  const BANNER_LIST = BANNER_SRC_LIST.map((bannerSrc) => {
    const { src, Button } = bannerSrc;
    return (
      <SwiperSlide className="mySlider" key={src}>
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
  });

  return (
    <Container>
      <Swiper navigation>{BANNER_LIST}</Swiper>
    </Container>
  );
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

  .swiper-button-prev {
    left: 30px;
    color: white;
  }
  .swiper-button-next {
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
