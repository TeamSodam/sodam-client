import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';

interface ImageCardProps {
  data: string;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

function ImageCard(props: ImageCardProps) {
  const { data, onClick } = props;

  return (
    <StyledRoot onClick={onClick}>
      {data !== '' && <Image src={data} width={75} height={75} alt="review-small" />}
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 1rem;
  background-color: ${theme.colors.grayBg};
  img {
    border-radius: 1rem;
    &:hover {
      cursor: pointer;
    }
  }
  ${applyMediaQuery('desktop', 'tablet')} {
    width: 5rem;
    height: 5rem;
  }
`;

export default ImageCard;
