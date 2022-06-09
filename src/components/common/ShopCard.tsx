import Link from 'next/link';
import React from 'react';
import loadImageSafely from 'src/utils/loadImageSafely';
import parseCategorySafely from 'src/utils/parseCategorySafely';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';
import { ShopCardData } from 'types/shop';

import ImageDiv from './ImageDiv';

interface ShopCardProps {
  cardData: Omit<ShopCardData, 'rank'>;
}

function ShopCard(props: ShopCardProps) {
  const { cardData } = props;
  const { image, shopName, category, shopId } = cardData;

  return (
    <Link href={`/shop/detail/${shopId}`} passHref>
      <StyledRoot>
        <ImageDiv
          className="shop__card"
          src={loadImageSafely(image)}
          layout="fill"
          alt="thumbnail"
          placeholder="blur"
          blurDataURL={loadImageSafely(image)}
        />
        <StyledTitle>
          <h3>{shopName}</h3>
          <p>{parseCategorySafely(category)}</p>
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
  &:hover {
    cursor: pointer;
  }
  .shop__card {
    position: relative;
    width: 28.2rem;
    height: 20.8rem;
    img {
      border-radius: 10px;
    }
  }
  ${applyMediaQuery('desktop')} {
    width: 18.8rem;
    height: 18rem;
    .shop__card {
      width: 18.8rem;
      height: 13.8rem;
    }
  }
  ${applyMediaQuery('tablet')} {
    width: 17.3rem;
    height: 17.3rem;
    .shop__card {
      width: 17.3rem;
      height: 13.2rem;
      img {
        border-radius: 4px;
      }
    }
  }
  ${applyMediaQuery('mobile')} {
    width: 15.3rem;
    height: 15.3rem;
    .shop__card {
      width: 15.3rem;
      height: 11.8rem;
      img {
        border-radius: 4px;
      }
    }
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
    text-align: center;
  }
  p {
    font-size: 1.4rem;
    font-weight: 500;
    color: ${theme.colors.gray1};
    margin-top: 0.4rem;
    line-height: 2rem;
  }
  ${applyMediaQuery('desktop')} {
    h3 {
      font-size: 1.4rem;
      line-height: 2rem;
    }
    p {
      font-size: 1rem;
      margin-top: 0;
      line-height: 1.4rem;
    }
  }
  ${applyMediaQuery('tablet')} {
    h3 {
      font-size: 1.3rem;
      line-height: 1.8rem;
    }
    p {
      font-size: 1rem;
      margin-top: 0.2rem;
      line-height: 1.2rem;
    }
  }
  ${applyMediaQuery('mobile')} {
    h3 {
      font-size: 1.2rem;
      line-height: 1.7rem;
    }
    p {
      font-size: 1rem;
      margin-top: 0.2rem;
      line-height: 1.2rem;
      transform: scale(0.8);
    }
  }
`;

export default ShopCard;
