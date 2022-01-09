import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { ShopCardData } from 'types/shop';

interface ShopCardProps {
  cardData: Omit<ShopCardData, 'rank'>;
}

function ShopCard(props: ShopCardProps) {
  const { cardData } = props;
  const { thumbnail, name, categoryList } = cardData;

  const category = categoryList.join(', ');

  return (
    <StyledRoot>
      <Image src={thumbnail} width={282} height={208} alt="thumbnail" />
      <StyledTitle>
        <h3>{name}</h3>
        <p>{category}</p>
      </StyledTitle>
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 282px;
  height: 270px;
  img {
    border-radius: 10px;
  }
`;
const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  h3 {
    font-size: 18px;
    font-weight: 700;
    line-height: 26px;
  }
  p {
    font-size: 14px;
    font-weight: 500;
    color: ${theme.colors.gray1};
    margin-top: 4px;
    line-height: 20px;
  }
`;

export default ShopCard;
