import Image from 'next/image';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface BannerProps {
  src: string;
  children?: ReactNode;
}

function Banner(props: BannerProps) {
  const { src, children } = props;
  return (
    <StyledBanner>
      <Image src={src} alt="banner" layout="fill" />
      {children}
    </StyledBanner>
  );
}

const StyledBanner = styled.div`
  width: 100% !important;
  position: relative !important;

  & > span {
    position: unset !important;
  }

  & img {
    width: 100% !important;
    object-fit: contain !important;
    position: relative !important;
    height: unset !important;
  }
`;

export default Banner;
