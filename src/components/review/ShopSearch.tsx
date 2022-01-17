import { shopApi } from 'features/shops/shopApi';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { Shop } from 'types/shop';

import ShopSearchList from './ShopSearchList';

function ShopSearch() {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState<Shop[] | undefined>();
  const [trigger] = shopApi.useLazyGetShopSearchResultQuery();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!(e.target instanceof HTMLFormElement)) return;
    e.preventDefault();
    const result = await trigger(inputValue);
    setSearchValue(result.data);
  };

  return (
    <StyledRoot>
      <StyledWrapper>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="소품샵명을 입력해주세요 (필수)"
            value={inputValue}
            onChange={handleChange}
          />
        </form>
        <Image src={'/assets/searchIcon.svg'} width={27} height={27} alt="search" />
      </StyledWrapper>
      {searchValue && <ShopSearchList shopList={searchValue} />}
    </StyledRoot>
  );
}

export default ShopSearch;

const StyledRoot = styled.div`
  display: flex;
  position: relative;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 48.6rem;
  height: 4.8rem;
  border-radius: 0.5rem;
  background-color: ${theme.colors.grayBg};
  padding: 0 1.6rem;

  & > form {
    width: 100%;
    & > input {
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 2rem;
      width: 100%;
      background-color: ${theme.colors.grayBg};
      border: 0;
      outline: 0;

      & > ::placeholder {
        color: ${theme.colors.gray1};
      }
    }
  }
`;
