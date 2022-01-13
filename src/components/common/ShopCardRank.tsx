import React from 'react';
import styled from 'styled-components';
import { ShopCardData } from 'types/shop';

import ImageDiv from './ImageDiv';
import ShopCard from './ShopCard';

interface ShopCardRankProps {
  cardData: ShopCardData;
}

function ShopCardRank(props: ShopCardRankProps) {
  const { cardData } = props;
  const { rank = null } = cardData;

  const getRankIcon = (): string => `/assets/ic_rank_${rank}.svg`;

  return (
    <StyledRoot>
      {rank && rank <= 3 && (
        <ImageDiv className="rank__icon" src={getRankIcon()} width={32} height={40} alt="rank" />
      )}
      <ShopCard cardData={cardData} />
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  .rank__icon {
    position: absolute;
    z-index: 2;
    margin-left: 1.7rem;
  }
`;

export default ShopCardRank;
