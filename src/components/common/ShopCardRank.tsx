import React from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
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
        <div className="rank__wrap">
          <ImageDiv className="rank__icon" src={getRankIcon()} layout="fill" alt="rank" />
        </div>
      )}
      <ShopCard cardData={cardData} />
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  .rank__wrap {
    position: absolute;
    z-index: 2;
    margin-left: 1.7rem;
  }
  .rank__icon {
    position: relative;
    width: 3.2rem;
    height: 4rem;
  }
  ${applyMediaQuery('desktop')} {
    .rank__wrap {
      margin-left: 1rem;
    }
    .rank__icon {
      width: 2.2rem;
      height: 2.7rem;
    }
  }
  ${applyMediaQuery('tablet', 'mobile')} {
    .rank__wrap {
      margin-left: 0.7rem;
    }
    .rank__icon {
      width: 1.6rem;
      height: 2rem;
    }
  }
`;

export default ShopCardRank;
