import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';

import Banner from 'components/common/Banner';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const bannerList = [
  { src: 'assets/banner/banner1.png', href: '/map' },
  { src: 'assets/banner/banner2.png', href: '/shop/theme/아기자기한' },
  { src: 'assets/banner/banner3.png' },
];

function BannerList() {
  SwiperCore.use([Navigation, Autoplay]);
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

  return (
    <Container>
      {swiperSetting && (
        <Swiper autoplay={{ delay: 3000 }} navigation className="mySlider">
          {bannerList.map(({ src, href }) => (
            <SwiperSlide key={src}>
              <Banner src={src} href={href} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: ${({ theme }) => theme.clientWidth}px;
  height: 517px;

  ${applyMediaQuery('desktop')} {
    height: 345px;
  }
  ${applyMediaQuery('mobile')} {
    height: 97px;
  }

  & .mySlider {
    & > div {
      width: 100%;
      height: 100%;
      & > .swiper-slide {
        width: 100%;
        height: 517px;
        ${applyMediaQuery('desktop')} {
          height: 345px;
        }

        ${applyMediaQuery('tablet')} {
          height: 180px;
        }

        ${applyMediaQuery('mobile')} {
          height: 97px;
        }
      }
    }
  }

  .mySlider .swiper-button-prev {
    width: fit-content;
    height: fit-content;

    top: 50%;
    left: 30px;
    color: white;

    ${applyMediaQuery('mobile')} {
      transform: scale(0.3);
      left: 5px;
    }
  }
  .mySlider .swiper-button-next {
    width: fit-content;
    height: fit-content;
    top: 50%;
    right: 30px;
    color: white;

    ${applyMediaQuery('mobile')} {
      transform: scale(0.3);
      right: 5px;
    }
  }
`;

export default BannerList;
