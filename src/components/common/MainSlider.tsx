import 'swiper/swiper.min.css';

import Image from 'next/image';
import { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import SwiperCore, { Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

interface MainSliderProps {
  cardList: ReactElement[];
  title: ReactElement;
  slidesPerView: 3 | 4; // 한 번에 보이는 카드 수
}
interface StyledButtonProps {
  isShopCard: boolean;
}

function MainSlider(props: MainSliderProps) {
  const { cardList, title, slidesPerView } = props;

  SwiperCore.use([Navigation, Scrollbar]);

  const isShopCard = slidesPerView === 4 ? true : false;

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperSetting, setSwiperSetting] = useState<Swiper | null>(null);

  useEffect(() => {
    if (!swiperSetting) {
      setSwiperSetting({
        spaceBetween: 24, // px
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
      <h2>{title}</h2>
      <StyledSwiper>
        <StyledButton ref={prevRef} isShopCard={isShopCard}>
          <Image src={'/assets/ic_prev.svg'} width={12} height={24} alt="prev" />
        </StyledButton>
        {swiperSetting && (
          <Swiper {...swiperSetting}>
            {cardList.map((card) => (
              <SwiperSlide key={card.key}>{card}</SwiperSlide>
            ))}
          </Swiper>
        )}
        <StyledButton ref={nextRef} isShopCard={isShopCard}>
          <Image src={'/assets/ic_next.svg'} width={12} height={24} alt="next" />
        </StyledButton>
      </StyledSwiper>
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  width: 128.8rem;
  h2 {
    font-size: 3rem;
    font-weight: bold;
    color: ${theme.colors.black2};
    margin-bottom: 3.2rem;
  }
  em,
  b {
    color: ${theme.colors.purpleText};
  }
  button {
    padding: 0;
    background: none;
    border: none;
  }
  .swiper {
    &-wrapper,
    &-container {
      width: 120rem;
      margin: 0;
    }
    &-container {
      margin: 0 3.2rem;
    }
    &-button-disabled {
      visibility: hidden;
    }
  }
`;
const StyledSwiper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -8.8rem;
`;
const StyledButton = styled.button<StyledButtonProps>`
  margin-bottom: ${(props) => (props.isShopCard ? '6.2rem' : '0')};
`;

export default MainSlider;
