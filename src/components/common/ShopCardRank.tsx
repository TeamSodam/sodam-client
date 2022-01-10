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
  const { rank = null } = cardData;

  const getRankIcon = (): string => `/assets/ic_rank_${rank}.svg`;

  return (
    <div>
      <StyledImage>
        {rank && rank <= 3 && <Image src={getRankIcon()} width={32} height={40} alt="rank" />}
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
