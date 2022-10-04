import Link from 'next/link';
import styled, { css } from 'styled-components';

interface BannerProps {
  src: string;
  href?: string;
}

function Banner(props: BannerProps) {
  const { src, href } = props;

  if (href) {
    return (
      <Link passHref href={href}>
        <StyledBannerLink aria-label={`소담 ${src}(으)로 이동하기`} imgUrl={src} />
      </Link>
    );
  }

  return <StyledBanner imgUrl={src} />;
}

const BannerCss = css<{ imgUrl: string }>`
  display: block;
  width: 100%;
  height: 100%;

  background-image: ${(props) => `url(${props.imgUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const StyledBanner = styled.div`
  ${BannerCss}
`;

const StyledBannerLink = styled.a`
  ${BannerCss}
`;

export default Banner;
