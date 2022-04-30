export { default as DesktopFirstBannerBtn } from 'public/assets/banner/banner_01_btn.svg';
export { default as DesktopFirstBannerText } from 'public/assets/banner/banner_01_desktop_text.svg';
export { default as FirstBannerText } from 'public/assets/banner/banner_01_text.svg';
export { default as DesktopThirdBannerBtn } from 'public/assets/banner/banner_03_btn.svg';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

export const SecondBannerText = styled.div`
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

export const ThirdBannerText = styled.div`
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
