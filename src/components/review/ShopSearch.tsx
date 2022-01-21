import { shopApi } from 'features/shops/shopApi';
import Image from 'next/image';
import searchDelIC from 'public/assets/ic_searchDel.svg';
import { ChangeEvent, FormEvent, useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { ReviewWriteKey } from 'types/review';
import { ShopSearchResponse } from 'types/shop';

import ShopSearchList from './ShopSearchList';

interface ShopSearchProps {
  selectedShop: string;
  handleDataChange: (data: string, key: Extract<ReviewWriteKey, 'content' | 'shopName'>) => void;
  handleResultSelect: (shopId: number) => void;
}

function ShopSearch(props: ShopSearchProps) {
  const { selectedShop, handleDataChange, handleResultSelect } = props;

  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState<ShopSearchResponse[] | undefined>();
  const [trigger] = shopApi.useLazyGetShopSearchResultQuery();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    setInputValue(e.target.value);
  };

  const requestSearch = async () => {
    const result = await trigger(inputValue);
    console.log('r검색결과: ', result);
    setSearchValue(result.data);
    setIsOpen(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!(e.target instanceof HTMLFormElement)) return;
    e.preventDefault();
    await requestSearch();
  };

  const onSetSelected = (shop: string, shopId: number) => {
    setInputValue(shop);
    handleDataChange(shop, 'shopName');
    handleResultSelect(shopId);
  };

  const handleDelete = () => {
    handleDataChange('', 'shopName');
    setInputValue('');
  };

  return (
    <StyledRoot>
      <StyledWrapper>
        {selectedShop !== '' ? (
          <>
            <span>{selectedShop}</span>
            <SearchDelIcon onClick={handleDelete} />
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="소품샵명을 입력해주세요 (필수)"
                value={inputValue}
                onChange={handleChange}
              />
            </form>
            <Image
              src={'/assets/searchIcon.svg'}
              width={27}
              height={27}
              alt="search"
              onClick={requestSearch}
            />
          </>
        )}
      </StyledWrapper>
      {isOpen && (
        <ShopSearchList shopList={searchValue} toggle={toggle} onSetSelected={onSetSelected} />
      )}
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

  & > span {
    font-weight: bold;
    font-size: 1.4rem;
    line-height: 2rem;
    color: ${theme.colors.purpleText};
  }
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
    }
    & > input::placeholder {
      color: ${theme.colors.gray1};
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 2rem;
      font-family: 'Noto Sans KR';
    }
  }
`;

const SearchDelIcon = styled(searchDelIC)`
  cursor: pointer;
  width: 1.6rem;
  height: 1.6rem;
`;
