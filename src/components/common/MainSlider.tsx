import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';

import useMedia from 'hooks/useMedia';
import Image from 'next/image';
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import shortid from 'shortid';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
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

  SwiperCore.use(
    isMobile || isTablet ? [Navigation, Pagination, Scrollbar] : [Navigation, Scrollbar],
  );

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<HTMLDivElement>(null);
  const [swiperSetting, setSwiperSetting] = useState<Swiper | null>(null);
  const prevSlidesPerView = useRef(slidesPerView);

  const getSpaceBetween = useCallback(() => {
    if (isWide) return 20;
    if (isDesktop) return 16;
    if (isTablet) return 15;
    if (isMobile) return 6;
    return 24;
  }, [isWide, isDesktop, isTablet, isMobile]);

  useEffect(() => {
    if (!swiperSetting || slidesPerView !== prevSlidesPerView.current) {
      setSwiperSetting({
        spaceBetween: getSpaceBetween(), // px
        navigation: {
          prevEl: prevRef.current, // 이전 버튼
          nextEl: nextRef.current, // 다음 버튼
        },
        pagination: {
          clickable: false,
          renderBullet: (index, className) =>
            `<span class="${
              index % slidesPerView === 0 ? className : `${className} inactive`
            }"></span>`,
        },
        scrollbar: { draggable: true, el: null },
        slidesPerView,
        slidesPerGroup: slidesPerView,
        onBeforeInit: (swiper: SwiperCore) => {
          if (typeof swiper.params.navigation !== 'boolean') {
            if (swiper.params.navigation) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }
          swiper.navigation.update();
        },
        onActiveIndexChange(swiper: SwiperCore) {
          const bulletList = swiperRef.current?.querySelectorAll('.swiper-pagination-bullet');
          if (!bulletList || bulletList.length === 0) return;
          if (swiper.activeIndex % slidesPerView !== 0) {
            bulletList[swiper.activeIndex - (swiper.activeIndex % slidesPerView)]?.classList.add(
              'active',
            );
          } else {
            bulletList.forEach((bullet) => bullet.classList.remove('active'));
          }
        },
      });
    }

    return () => {
      prevSlidesPerView.current = slidesPerView;
    };
  }, [swiperSetting, slidesPerView, getSpaceBetween]);

  return (
    <StyledRoot>
      <StyledSwiper ref={swiperRef}>
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
  .inactive {
    display: none !important;
  }
  .active {
    background-color: ${theme.colors.purpleMain} !important;
    opacity: 1 !important;
  }
  .swiper-pagination {
    position: relative;
    top: 0;
    margin-top: 1.2rem;
    &-bullet {
      width: 0.4rem;
      height: 0.4rem;
      &-active {
        background-color: ${theme.colors.purpleMain};
      }
    }

    ${applyMediaQuery('desktop', 'wide')} {
      display: none;
    }
  }
  ${applyMediaQuery('desktop')} {
    width: 86.8rem;
    .swiper-container {
      margin: 0 2.6rem;
    }
  }
  ${applyMediaQuery('tablet')} {
    width: 55rem;
    .swiper-container {
      margin: 0;
      display: flex;
      flex-direction: column-reverse;
    }
    .swiper-pagination {
      margin-top: 1.6rem;
    }
  }
  ${applyMediaQuery('mobile')} {
    width: 31.2rem;
    .swiper-container {
      margin: 0;
      display: flex;
      flex-direction: column-reverse;
    }
    .swiper-slide {
      width: 15.3rem !important;
    }
  }
`;
const StyledSwiper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -4.4rem;
  width: 100%;
  ${applyMediaQuery('desktop')} {
    margin-left: -3.3rem;
  }
  ${applyMediaQuery('tablet', 'mobile')} {
    margin-left: 0;
  }
`;
const StyledButton = styled.button<StyledButtonProps>`
  margin-bottom: ${(props) => (props.isShopCard ? '6.2rem' : '0')};
  ${applyMediaQuery('desktop')} {
    margin-bottom: ${(props) => (props.isShopCard ? '4.1rem' : '0')};
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
