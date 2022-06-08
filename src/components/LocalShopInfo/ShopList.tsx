import { useAppSelector } from 'app/hook';
import { selectIsLogin } from 'features/users/userSlice';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { ShopAreaResponse } from 'types/shop';

import ShopElement from './ShopElement';

function ShopList({
  shopList,
  isSaveOption,
  moveByAddress,
}: {
  shopList: ShopAreaResponse[];
  isSaveOption: boolean;
  moveByAddress: (landAddress: string, shopName: string) => void;
}) {
  const isLogin = useAppSelector(selectIsLogin);

  const emptyText = `선택 지역에 해당하는 ${isSaveOption ? '저장한 ' : ''}소품샵이 없어요`;
  const loginText = '소품샵을 저장하기 위해 로그인이 필요해요.';

  return shopList.length ? (
    <StyledShopList>
      {shopList.map((shop) => (
        <ShopElement shopInfo={shop} key={shop.shopId} moveByAddress={moveByAddress} />
      ))}
    </StyledShopList>
  ) : (
    <EmptyShopList>
      <span>{isLogin ? emptyText : loginText}</span>
    </EmptyShopList>
  );
}

const StyledShopList = styled.ul`
  flex: 5.22;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }

  ${applyMediaQuery('mobile', 'tablet')} {
    border: 0.1rem solid ${({ theme }) => theme.colors.gray2};
    margin-bottom: 1rem;
  }
`;

const EmptyShopList = styled.div`
  flex: 5.22;
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    max-width: 16rem;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 2.3rem;
    color: ${({ theme }) => theme.colors.gray1};
    word-wrap: break-word;
    opacity: 0.5;
    text-align: center;
  }

  ${applyMediaQuery('mobile')} {
    border: 0.1rem solid ${({ theme }) => theme.colors.gray2};
    padding: 30% 0;
    margin-bottom: 1rem;
  }
`;

export default ShopList;
