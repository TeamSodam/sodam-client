import useMap from 'hooks/useMap';
import DelimiterIC from 'public/assets/ic_delimiter.svg';
import loadImageSafely from 'src/utils/loadImageSafely';
import parseCategorySafely from 'src/utils/parseCategorySafely';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { ShopAreaResponse } from 'types/shop';

interface StyledShopElementProps {
  isSelected?: boolean;
}

function ShopElement({ shopInfo }: { shopInfo: ShopAreaResponse }) {
  const { moveByAddress } = useMap();

  const { shopName, category, image, landAddress, time, reviewCount } = shopInfo;

  return (
    <StyledShopElement onClick={() => moveByAddress(landAddress, shopName)}>
      <ShopLeftWrapper>
        <ShopMainInfo>
          <h2>{shopName}</h2>
          <span>{parseCategorySafely(category)}</span>
          <ShopAddress>{landAddress}</ShopAddress>
        </ShopMainInfo>
        <ShopSubInfo>
          <WorkHour>{time || '시간 정보 없음'}</WorkHour>
          <DelimiterIC />
          <ReviewInfo>{`리뷰 ${reviewCount}개`}</ReviewInfo>
        </ShopSubInfo>
      </ShopLeftWrapper>
      <ShopImage src={loadImageSafely(image)} />
    </StyledShopElement>
  );
}

const ShopImage = styled.div<{ src: string }>`
  background-image: ${(props) => `url(${props.src})`};
  background-position: center;
  background-size: cover;
  width: 10rem;
  height: 10rem;
  ${applyMediaQuery('desktop')} {
    width: 8rem;
    height: 8rem;
  }

  ${applyMediaQuery('mobile')} {
    width: 7.6rem;
    height: 7.6rem;
  }
`;

const StyledShopElement = styled.li<StyledShopElementProps>`
  box-sizing: border-box;
  width: 100%;
  min-height: calc(18.4% + 0.1rem);

  padding: 2.8rem 2.4rem;

  ${applyMediaQuery('desktop')} {
    padding: 1.4rem 1.2rem;
  }

  ${applyMediaQuery('mobile')} {
    max-height: 11.6rem;
    padding: 2rem;
  }

  background-color: ${(props) => props.isSelected && props.theme.colors.grayBg};
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray2};

  display: flex;
  gap: 2rem;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.gray2};
  }
`;

const ShopLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const ShopMainInfo = styled.div`
  & > h2 {
    display: inline;
    font-size: 1.6rem;
    line-height: 2.3rem;
    color: ${({ theme }) => theme.colors.purpleText};
    font-weight: 700;
    word-wrap: break-all;
    white-space: pre-line;
    margin-right: 0.8rem;
  }

  & > span {
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.7rem;
    color: ${({ theme }) => theme.colors.gray1};
  }

  ${applyMediaQuery('desktop')} {
    & > h2 {
      font-size: 1.2rem;
      line-height: 1.7rem;
    }

    & > span {
      font-size: 0.8rem;
      line-height: 1rem;
    }
  }
`;

const ShopAddress = styled.p`
  font-size: 1.2rem;
  line-height: 1.7rem;
  color: ${({ theme }) => theme.colors.black1};
  font-weight: 400;
  margin-top: 0.8rem;

  ${applyMediaQuery('desktop')} {
    font-size: 0.8rem;
    line-height: 1rem;
  }
  ${applyMediaQuery('mobile')} {
    font-size: 0.8rem;
    line-height: 1rem;
  }
`;

const ShopSubInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const WorkHour = styled.span`
  font-size: 1.2rem;
  line-height: 1.7rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray1};

  ${applyMediaQuery('desktop')} {
    font-size: 0.8rem;
    line-height: 1rem;
  }
  ${applyMediaQuery('mobile')} {
    font-size: 0.8rem;
    line-height: 1rem;
  }
`;

const ReviewInfo = styled(WorkHour)`
  color: ${({ theme }) => theme.colors.purpleMain};
`;

export default ShopElement;
