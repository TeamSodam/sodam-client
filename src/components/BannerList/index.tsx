import Banner from 'components/common/Banner';
import Link from 'next/link';
import FirstBannerBtn from 'public/assets/banner/banner_01_btn.svg';
import ThirdBannerBtn from 'public/assets/banner/banner_03_btn.svg';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

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
  const [bannerIdx, setBannerIdx] = useState(0);
  const BANNER_LIST = BANNER_SRC_LIST.map((bannerSrc) => {
    const { src, Button } = bannerSrc;
    return (
      <Banner src={src} key={src}>
        {Button && (
          <Link href="/shop/theme/아기자기한" passHref>
            <BannerBtn>
              <Button />
            </BannerBtn>
          </Link>
        )}
      </Banner>
    );
  });
  useEffect(() => {
    const intervalId = setInterval(() => {
      setBannerIdx((prevIdx) => (prevIdx + 1) % 3);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return BANNER_LIST[bannerIdx];
}

const BannerBtn = styled.div`
  position: absolute;
  bottom: 10rem;
  left: 18.75%;

  &:hover {
    cursor: pointer;
  }
`;

export default BannerList;
