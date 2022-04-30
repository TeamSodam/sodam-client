import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';

import Banner from 'components/common/Banner';
import useMedia from 'hooks/useMedia';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import BANNER_SRC from './bannerSrcList';

function BannerList() {
  SwiperCore.use([Navigation]);
  const [swiperSetting, setSwiperSetting] = useState<Swiper | null>(null);
  const { isDesktop } = useMedia();
  const [currentBannerList, setcurrentBannerList] = useState(BANNER_SRC.wide);

  useEffect(() => {
    if (!swiperSetting) {
      setSwiperSetting({
        spaceBetween: 24, // px
        scrollbar: { draggable: true, el: null },
        slidesPerView: 1,
      });
    }
  }, [swiperSetting]);

  useEffect(() => {
    setcurrentBannerList(isDesktop ? BANNER_SRC.desktop : BANNER_SRC.wide);
  }, [isDesktop]);

  return (
    <Container>
      {swiperSetting && (
        <Swiper navigation className="mySlider">
          {currentBannerList.map((bannerSrc) => {
            const { src, Button, Text } = bannerSrc;
            return (
              <SwiperSlide key={src}>
                <Banner
                  src={src}
                  button={
                    Button && (
                      <Link href="/shop/theme/아기자기한" passHref>
                        <BannerBtn>
                          <Button />
                        </BannerBtn>
                      </Link>
                    )
                  }
                >
                  {Text}
                </Banner>
              </SwiperSlide>
            );
          })}
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

  ${applyMediaQuery('desktop')} {
    bottom: 6.6rem;
    transform: scale(0.66) translateX(-25%);
  }
  left: 0;

  &:hover {
    cursor: pointer;
  }
`;

export default BannerList;
