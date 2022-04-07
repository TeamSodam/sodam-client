import {
  DesktopFirstBannerBtn,
  DesktopFirstBannerText,
  DesktopThirdBannerBtn,
  FirstBannerText,
  SecondBannerText,
  ThirdBannerText,
} from './bannerElements';

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
