import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

import FilterDiv from './FilterDiv';

interface StyledDDFProps {
  pageType: string;
}

function DropDownFilter(props: StyledDDFProps) {
  const { pageType } = props;
  interface OptionListType {
    [key: string]: string[];
  }
  const dropDownOptionList: OptionListType = {
    detail: ['좋아요 많은 순', '스크랩 많은 순', '최신 순'],
    theme: ['저장 많은 순', '리뷰 많은 순'],
    collect: ['저장 많은 순', '리뷰 많은 순', '최근 저장한 순'],
  };
  const pageOptionList = dropDownOptionList[pageType];
  const [selected, setSelected] = useState(pageOptionList[0]);
  const [unselected, setUnselected] = useState(pageOptionList.filter((el) => el !== selected));
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  return (
    <StyledRoot>
      {isOpen && (
        <FilterDiv
          pageOptionList={pageOptionList}
          selected={selected}
          unselected={unselected}
          setSelected={setSelected}
          setUnselected={setUnselected}
          toggle={toggle}
        />
      )}
      <StyledWrapper onClick={toggle}>
        <span>{selected}</span>
        <Image src={'/assets/ic_dropdown.svg'} width={14} height={10} alt="dropdown" />
      </StyledWrapper>
    </StyledRoot>
  );
}

export default DropDownFilter;

const StyledRoot = styled.div`
  display: flex;
  position: relative;
`;
const StyledWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  cursor: pointer;

  & > span {
    font-weight: bold;
    font-size: 1.4rem;
    line-height: 2rem;
    color: ${theme.colors.purpleText};
  }
`;
