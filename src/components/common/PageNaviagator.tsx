import LeftArrow from 'public/assets/ic_leftArrow.svg';
import RightArrow from 'public/assets/ic_rightArrow.svg';
import { Dispatch, SetStateAction } from 'react';
import shortid from 'shortid';
import styled, { css } from 'styled-components';

interface PageNaviagatorProps {
  pageLimit: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const PREV = 'PREV';
const NEXT = 'NEXT';

function PageNaviagator(props: PageNaviagatorProps) {
  const { pageLimit, currentPage, setCurrentPage } = props;

  const showPages = () =>
    [...Array(pageLimit)].map((_, index) => {
      const isCurrent = index + 1 === currentPage;
      return (
        <Page
          key={shortid.generate()}
          isCurrent={isCurrent}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
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
      <LeftBtn onClick={() => naviagtePage(PREV)} />
      <PageList>{showPages()}</PageList>
      <RightBtn onClick={() => naviagtePage(NEXT)} />
    </Container>
  );
}

const hoverPointer = css`
  &:hover {
    cursor: pointer;
  }
`;

const Container = styled.nav`
  width: 58rem;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

const PageList = styled.ol`
  display: flex;
  gap: 8rem;
`;

const Page = styled.li<{ isCurrent: boolean }>`
  ${hoverPointer}
  color: ${(props) =>
    props.isCurrent ? props.theme.colors.purpleText : props.theme.colors.black2};
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.9rem;
`;

const LeftBtn = styled(LeftArrow)`
  ${hoverPointer}
`;

const RightBtn = styled(RightArrow)`
  ${hoverPointer}
`;

export default PageNaviagator;
