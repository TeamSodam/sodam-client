import { ReactNode } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

interface BannerProps {
  src: string;
  button: ReactNode;
  children?: ReactNode;
}

function Banner(props: BannerProps) {
  const { src, button, children } = props;
  return (
    <StyledBanner imgUrl={src}>
      <Wrapper>
        {children}
        {button}
      </Wrapper>
    </StyledBanner>
  );
}

const StyledBanner = styled.div<{ imgUrl: string }>`
  width: 100%;
  height: 100%;

  background-image: ${(props) => `url(${props.imgUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
`;

const Wrapper = styled.div`
  position: relative;
  ${applyMediaQuery('mobile')} {
    width: 312px;
  }
  ${applyMediaQuery('desktop')} {
    width: 800px;
  }
  ${applyMediaQuery('wide')} {
    width: 1195px;
  }
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default Banner;
