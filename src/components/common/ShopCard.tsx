import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { ShopCardData } from 'types/shop';

interface ShopCardProps {
  cardData: Omit<ShopCardData, 'rank'>;
}

function ShopCard(props: ShopCardProps) {
  const { cardData } = props;
  const { image, store, category, shopId } = cardData;

  const joinCategory = () => {
    if (typeof category === 'string') return category;
    return category.join(', ');
  };

  return (
    <Link href={`/shop/detail/${shopId}`} passHref>
      <StyledRoot>
        <Image src={image} width={282} height={208} alt="thumbnail" />
        <StyledTitle>
          <h3>{store}</h3>
          <p>{joinCategory()}</p>
        </StyledTitle>
      </StyledRoot>
    </Link>
  );
}

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 28.2rem;
  height: 27rem;
  img {
    border-radius: 10px;
  }

  &:hover {
    cursor: pointer;
  }
`;
const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 2.6rem;
  }
  p {
    font-size: 1.4rem;
    font-weight: 500;
    color: ${theme.colors.gray1};
    margin-top: 0.4rem;
    line-height: 2rem;
  }
`;

export default ShopCard;
