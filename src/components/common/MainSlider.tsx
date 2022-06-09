import 'swiper/swiper.min.css';

import useMedia from 'hooks/useMedia';
import Image from 'next/image';
import { ReactElement, useEffect, useRef, useState } from 'react';
import shortid from 'shortid';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import SwiperCore, { Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

interface MainSliderProps {
  cardList: ReactElement[];
  slidesPerView: number; // 한 번에 보이는 카드 수
  isShopCard: boolean;
}
interface StyledButtonProps {
  isShopCard: boolean;
}
interface StyledIconProps {
  type: 'prev' | 'next';
}

function MainSlider(props: MainSliderProps) {
  const { cardList, slidesPerView, isShopCard } = props;

  const { isMobile, isTablet, isDesktop, isWide } = useMedia();

  SwiperCore.use([Navigation, Scrollbar]);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperSetting, setSwiperSetting] = useState<Swiper | null>(null);

  const getSpaceBetween = (): number => {
    if (isWide) return 24;
    if (isDesktop) return 11;
    if (isTablet) return 0;
    if (isMobile) return 0;
    return 24;
  };

  useEffect(() => {
    if (!swiperSetting) {
      setSwiperSetting({
        spaceBetween: getSpaceBetween(), // px
        navigation: {
          prevEl: prevRef.current, // 이전 버튼
          nextEl: nextRef.current, // 다음 버튼
        },
        scrollbar: { draggable: true, el: null },
        slidesPerView,
        onBeforeInit: (swiper: SwiperCore) => {
          if (typeof swiper.params.navigation !== 'boolean') {
            if (swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }
          swiper.navigation.update();
        },
      });
    }
  }, [swiperSetting, slidesPerView]);

  return (
    <StyledRoot>
      <StyledSwiper>
        {(isDesktop || isWide) && (
          <StyledButton ref={prevRef} isShopCard={isShopCard}>
            <StyledIcon type="prev">
              <Image src={'/assets/ic_prev.svg'} layout="fill" alt="prev" />
            </StyledIcon>
          </StyledButton>
        )}
        {swiperSetting && (
          <Swiper {...swiperSetting}>
            {cardList.map((card) => (
              <SwiperSlide key={card.key + shortid()}>{card}</SwiperSlide>
            ))}
          </Swiper>
        )}
        {(isDesktop || isWide) && (
          <StyledButton ref={nextRef} isShopCard={isShopCard}>
            <StyledIcon type="next">
              <Image src={'/assets/ic_next.svg'} layout="fill" alt="next" />
            </StyledIcon>
          </StyledButton>
        )}
      </StyledSwiper>
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  width: 128.8rem;
  button {
    padding: 0;
    background: none;
    border: none;
  }
  .swiper {
    &-wrapper,
    &-container {
      width: 100%;
      margin: 0;
    }
    &-container {
      margin: 0 3.2rem;
    }
    &-button-disabled {
      visibility: hidden;
    }
  }
  ${applyMediaQuery('desktop')} {
    width: 83.8rem;
    .swiper-container {
      margin: 0 2.5rem;
    }
  }
`;
const StyledSwiper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -8.8rem;
  ${applyMediaQuery('desktop')} {
    margin-left: -3.3rem;
  }
`;
const StyledButton = styled.button<StyledButtonProps>`
  margin-bottom: ${(props) => (props.isShopCard ? '6.2rem' : '0')};
  ${applyMediaQuery('desktop')} {
    margin-bottom: ${(props) => (props.isShopCard ? '4.1rem' : '0')};
    /* transform: translateX(-1rem); */
  }
`;
const StyledIcon = styled.div<StyledIconProps>`
  position: relative;
  width: 1.2rem;
  height: 2.4rem;
  ${applyMediaQuery('desktop')} {
    width: 0.8rem;
    height: 1.6rem;
    transform: translateX(${({ type }) => (type === 'prev' ? '0.8rem' : '-0.8rem')});
  }
`;

export default MainSlider;
