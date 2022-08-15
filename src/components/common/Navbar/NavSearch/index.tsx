import { shopApi } from 'features/shops/shopApi';
import useClickOutside from 'hooks/useClickOutside';
import debounce from 'lodash-es/debounce';
import Link from 'next/link';
import SearchICDesktop from 'public/assets/ic_search_desktop.svg';
import SearchICSmall from 'public/assets/ic_search_mobile.svg';
import SearchICWide from 'public/assets/searchIcon.svg';
import { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import Screen from 'styles/Screen';
import { Shop } from 'types/shop';

function NavSearch() {
  const [search] = shopApi.useLazyGetShopSearchResultQuery();
  const searchKeywordRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<Array<Pick<Shop, 'shopName' | 'shopId'>>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  useClickOutside(searchRef, () => setIsOpen(false));
  const getSearchKeyword = () => searchKeywordRef?.current?.value || '';

  const handleChangeSearch = async () => {
    const searchKeyword = getSearchKeyword();
    if (!searchKeyword) {
      setIsOpen(false);
      return;
    }

    try {
      const { data } = await search(searchKeyword);
      if (!data || data.length === 0) throw 'No Result';

      const refinedResult = data.map(({ shopName, shopId }) => ({ shopName, shopId }));
      setResults(refinedResult);
      setIsOpen(true);
    } catch (error) {
      setResults([]);
      setIsOpen(true);
    }
  };

  const handleClickResult = () => {
    setIsOpen(false);
    if (searchKeywordRef?.current) {
      searchKeywordRef.current.value = '';
    }
  };

  return (
    <SearchTab>
      <Screen tablet mobile>
        <SearchICSmall />
      </Screen>
      <Screen desktop>
        <SearchICDesktop />
      </Screen>
      <Screen wide>
        <SearchICWide />
      </Screen>
      <input type="text" ref={searchKeywordRef} onChange={debounce(handleChangeSearch, 500)} />
      {isOpen && (
        <ResultList ref={searchRef}>
          {results.length > 0 ? (
            results.map(({ shopId, shopName }) => (
              <Link key={shopId} href={`/shop/detail/${shopId}`} passHref>
                <Result onClick={handleClickResult}>{shopName}</Result>
              </Link>
            ))
          ) : (
            <NoResult>등록된 소품샵이 없습니다.</NoResult>
          )}
        </ResultList>
      )}
    </SearchTab>
  );
}

const SearchTab = styled.div`
  position: relative;

  border: 1.5px solid ${({ theme }) => theme.colors.purpleMain};
  border-radius: 2rem;
  padding: 0.7rem 0.7rem 0.7rem 1rem;

  & > input {
    width: 24rem;
    border: none;
    outline: none;
    font-size: 1.6rem;
    font-family: 'Noto Sans KR';
    padding-left: 1rem;
  }
  ${applyMediaQuery('desktop')} {
    padding: 0.3rem 0.8rem;
    & > input {
      padding-left: 0.5rem;
      width: 14rem;
      font-size: 1.2rem;
    }
  }

  ${applyMediaQuery('tablet', 'mobile')} {
    padding: 0.2rem 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.purpleMain};
    & > input {
      padding-left: 0.3rem;
      width: 7rem;
      font-size: 1rem;
    }
  }

  display: flex;
  align-items: center;
`;

const ResultList = styled.ul`
  position: absolute;
  z-index: 5;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, calc(100% + 2px));
  background-color: ${({ theme }) => theme.colors.grayBg};
  width: 100%;
  padding: 0.8rem;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  box-shadow: 0px 3px 8px rgba(87, 82, 76, 0.15);
  border-radius: 0.5rem;

  max-height: 16rem;
  overflow-y: auto;

  ${applyMediaQuery('desktop')} {
    max-height: 12.9rem;
    gap: 0.5rem;
  }

  ${applyMediaQuery('tablet', 'mobile')} {
    max-height: 12.3rem;
    gap: 0.3rem;
  }
`;

const ResultCss = css`
  font-size: 1.4rem;
  line-height: 2rem;
  padding: 0.8rem;
  color: ${({ theme }) => theme.colors.black2};

  &:hover {
    background-color: ${({ theme }) => theme.colors.purpleBg};
  }

  ${applyMediaQuery('desktop', 'tablet', 'mobile')} {
    font-size: 1rem;
    line-height: 1.4rem;
  }
`;

const Result = styled.a`
  ${ResultCss}
  text-decoration: none;
`;

const NoResult = styled.div`
  ${ResultCss}
  color: ${({ theme }) => theme.colors.gray1};

  &:hover {
    background-color: transparent;
  }
`;

export default NavSearch;
