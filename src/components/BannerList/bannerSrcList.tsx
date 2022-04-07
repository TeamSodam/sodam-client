import DesktopFirstBannerBtn from 'public/assets/banner/banner_01_btn.svg';
import DesktopFirstBannerText from 'public/assets/banner/banner_01_desktop_text.svg';
import FirstBannerText from 'public/assets/banner/banner_01_text.svg';
import DesktopThirdBannerBtn from 'public/assets/banner/banner_03_btn.svg';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

const SecondBannerText = styled.div`
  & > header {
    font-weight: 700;
    font-size: 4.8rem;
    line-height: 7rem;
    ${applyMediaQuery('desktop')} {
      font-size: 3.2rem;
      line-height: 4.6rem;
    }

    color: #e15669;
  }

  & > p {
    font-style: normal;
    font-weight: 500;
    font-size: 2.8rem;
    line-height: 4.1rem;
    ${applyMediaQuery('desktop')} {
      font-size: 1.9rem;
      line-height: 2.8rem;
    }

    color: #695054;
  }
`;

const ThirdBannerText = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 4.2rem;
  line-height: 5.4rem;

  ${applyMediaQuery('desktop')} {
    font-size: 2.8rem;
    line-height: 3.4rem;
  }
  color: white;
`;

const desktopBannerList = [
  {
    src: '/assets/banner/banner_01_desktop_background.svg',
    Button: DesktopFirstBannerBtn,
    Text: <DesktopFirstBannerText />,
  },
  {
    src: '/assets/banner/banner_02_desktop_background.svg',
    Button: null,
    Text: (
      <SecondBannerText>
        <header>소푸미만을 위한 이번달 혜택</header>
        <p>을지로 소품샵을 투어하면 소담 굿즈를 선물로 드려요 !</p>
      </SecondBannerText>
    ),
  },
  {
    src: '/assets/banner/banner_03_desktop_background.png',
    Button: DesktopThirdBannerBtn,
    Text: (
      <ThirdBannerText>
        <p>1월, 소푸미와 함께 떠난</p>
        <p>소품샵 여정</p>
      </ThirdBannerText>
    ),
  },
];

const wideBannerList = [
  {
    src: '/assets/banner/banner_01_background.svg',
    Button: DesktopFirstBannerBtn,
    Text: <FirstBannerText />,
  },
  {
    src: '/assets/banner/banner_02_background.svg',
    Button: null,
    Text: (
      <SecondBannerText>
        <header>소푸미만을 위한 이번달 혜택</header>
        <p>을지로 소품샵을 투어하면 소담 굿즈를 선물로 드려요 !</p>
      </SecondBannerText>
    ),
  },
  {
    src: '/assets/banner/banner_03_background.png',
    Button: DesktopThirdBannerBtn,
    Text: (
      <ThirdBannerText>
        <div>1월, 소푸미와 함께 떠난</div>
        <div>소품샵 여정</div>
      </ThirdBannerText>
    ),
  },
];

const BANNER_SRC = {
  desktop: desktopBannerList,
  wide: wideBannerList,
};

export default BANNER_SRC;
