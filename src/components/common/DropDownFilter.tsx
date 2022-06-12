import { dropDownFilterList } from 'constants/dropdownOptionList';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';

import FilterDiv from './FilterDiv';

interface StyledDDFProps {
  pageType: 'detail' | 'theme' | 'collect';
  filterProps?: filterPropsType[];
}

export interface filterPropsType {
  filterName: string;
  onClick: () => void;
}

function DropDownFilter(props: StyledDDFProps) {
  const { pageType, filterProps } = props;
  const pageOptionList = dropDownFilterList[pageType];
  const [selected, setSelected] = useState(pageOptionList[0]);
  const [unselected, setUnselected] = useState(pageOptionList.filter((el) => el !== selected));
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  const saveSelectedOption = (option: string) => {
    if (pageOptionList.includes(option)) setSelected(option);
  };

  const saveUnselectedOption = (option: string) => {
    setUnselected(pageOptionList.filter((el) => el !== option));
  };

  return (
    <StyledRoot>
      {isOpen && (
        <FilterDiv
          selected={selected}
          unselected={unselected}
          saveSelectedOption={saveSelectedOption}
          saveUnselectedOption={saveUnselectedOption}
          toggle={toggle}
          filterProps={filterProps}
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
  align-items: flex-end;
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

  ${applyMediaQuery('desktop')} {
    gap: 0.4rem;
    & > span {
      font-size: 1.1rem;
      line-height: 1.6rem;
    }

    & img {
      transform: scale(0.85);
    }
  }
  ${applyMediaQuery('mobile')} {
    & > span {
      font-size: 0.9rem;
      line-height: 1.3rem;
    }
  }
`;
