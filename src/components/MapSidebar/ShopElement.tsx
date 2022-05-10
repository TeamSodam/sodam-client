import useMap from 'hooks/useMap';
import Image from 'next/image';
import DelimiterIC from 'public/assets/ic_delimiter.svg';
import loadImageSafely from 'src/utils/loadImageSafely';
import parseCategorySafely from 'src/utils/parseCategorySafely';
import styled from 'styled-components';
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
          <WorkHour>{time}</WorkHour>
          <DelimiterIC />
          <ReviewInfo>{`리뷰 ${reviewCount}개`}</ReviewInfo>
        </ShopSubInfo>
      </ShopLeftWrapper>
      <Image
        width={100}
        height={100}
        src={loadImageSafely(image)}
        alt="shop-image"
        placeholder="blur"
        blurDataURL={loadImageSafely(image)}
      />
    </StyledShopElement>
  );
}

const StyledShopElement = styled.li<StyledShopElementProps>`
  width: 100%;
  height: 15.5rem;

  padding: 2.8rem 2.4rem;

  background-color: ${(props) => props.isSelected && props.theme.colors.grayBg};
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray2};

  display: grid;
  grid-template-columns: 1fr 10rem;
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
`;

const ShopAddress = styled.p`
  font-size: 1.2rem;
  line-height: 1.7rem;
  color: ${({ theme }) => theme.colors.black1};
  font-weight: 400;
  margin-top: 0.8rem;
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
`;

const ReviewInfo = styled(WorkHour)`
  color: ${({ theme }) => theme.colors.purpleMain};
`;

export default ShopElement;
