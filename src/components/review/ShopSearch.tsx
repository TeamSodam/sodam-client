import Image from 'next/image';
import styled from 'styled-components';
import { theme } from 'styles/theme';

function ShopSearch() {
  return (
    <StyledRoot>
      <span>소품샵명을 입력해주세요 (필수)</span>
      <Image src={'/assets/searchIcon.svg'} width={27} height={27} alt="search" />
    </StyledRoot>
  );
}

export default ShopSearch;

const StyledRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 48.6rem;
  height: 4.8rem;
  border-radius: 0.5rem;
  background-color: ${theme.colors.grayBg};
  padding: 0 1.6rem;
  cursor: pointer;

  & > span {
    color: ${theme.colors.gray1};
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2rem;
  }
`;
