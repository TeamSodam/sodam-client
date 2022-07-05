import LeftArrow from 'public/assets/ic_leftArrow.svg';
import RightArrow from 'public/assets/ic_rightArrow.svg';
import { Dispatch, SetStateAction, useCallback } from 'react';
import shortid from 'shortid';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

interface PageNaviagatorProps {
  pageLimit: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const PREV = 'PREV';
const NEXT = 'NEXT';

const SELECTABLE_NUM = 5;

function PageNaviagator(props: PageNaviagatorProps) {
  const { pageLimit, currentPage, setCurrentPage } = props;

  const getSelectablePages = useCallback(() => {
    const first = currentPage > 2 ? currentPage - 2 : 1;
    const last = first + SELECTABLE_NUM;

    const pages = [];
    for (let pageNum = first; pageNum < last; pageNum++) {
      if (pageNum > pageLimit) break;
      pages.push(pageNum);
    }

    return pages;
  }, [currentPage, pageLimit]);

  const showPages = () =>
    getSelectablePages().map((_) => {
      const isCurrent = _ === currentPage;
      return (
        <Page key={shortid.generate()} isCurrent={isCurrent} onClick={() => setCurrentPage(_)}>
          {_}
        </Page>
      );
    });

  const naviagtePage = (dir: typeof PREV | typeof NEXT) => {
    const value = dir === PREV ? -1 : 1;
    if (currentPage + value < 1 || currentPage + value > pageLimit) return;
    setCurrentPage((prevPage) => prevPage + value);
  };

  return (
    <Container>
      <LeftBtn disabled={currentPage === 1} onClick={() => naviagtePage(PREV)}>
        <LeftArr />
      </LeftBtn>
      <PageList>{showPages()}</PageList>
      <RightBtn disabled={currentPage === pageLimit} onClick={() => naviagtePage(NEXT)}>
        <RightArr />
      </RightBtn>
    </Container>
  );
}

const Container = styled.nav`
  width: 58rem;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;

  ${applyMediaQuery('desktop')} {
    transform: scale(0.67);
  }
  ${applyMediaQuery('mobile', 'tablet')} {
    width: 31.2rem;
  }
`;

const PageList = styled.ol`
  display: flex;
  gap: 8rem;
  ${applyMediaQuery('mobile', 'tablet')} {
    gap: 2.5rem;
  }
`;

const Page = styled.li<{ isCurrent: boolean }>`
  color: ${(props) =>
    props.isCurrent ? props.theme.colors.purpleText : props.theme.colors.black2};
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.9rem;
  ${applyMediaQuery('mobile', 'tablet')} {
    font-size: 1.2rem;
  }

  &:hover {
    cursor: pointer;
  }
`;

const LeftArr = styled(LeftArrow)`
  ${applyMediaQuery('mobile', 'tablet')} {
    transform: scale(0.5);
  }
`;

const Button = styled.button`
  all: unset;
  &:disabled {
    cursor: default;
    & > svg > path {
      stroke: lightgray;
    }
  }
`;

const LeftBtn = styled(Button)``;
const RightBtn = styled(Button)``;

const RightArr = styled(RightArrow)`
  ${applyMediaQuery('mobile', 'tablet')} {
    transform: scale(0.5);
  }
`;

export default PageNaviagator;
