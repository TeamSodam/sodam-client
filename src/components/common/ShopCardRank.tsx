import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { ShopCardData } from 'types/shop';

import ShopCard from './ShopCard';

interface ShopCardRankProps {
  cardData: ShopCardData;
}

function ShopCardRank(props: ShopCardRankProps) {
  const { cardData } = props;
  const { rank } = cardData;

  const getRankIcon = (): string | null => {
    switch (rank) {
      case 1:
        return '/assets/ic_rank_1.svg';
      case 2:
        return '/assets/ic_rank_2.svg';
      case 3:
        return '/assets/ic_rank_3.svg';
      default:
        return null;
    }
  };
  const rankIcon = getRankIcon();

  return (
    <div>
      <StyledImage>
        {rankIcon && <Image src={rankIcon} width={32} height={40} alt="rank" />}
      </StyledImage>
      <ShopCard cardData={cardData} />
    </div>
  );
}

const StyledImage = styled.div`
  position: absolute;
  z-index: 2;
  margin-left: 1.7rem;
`;

export default ShopCardRank;
