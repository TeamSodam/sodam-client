import useClickOutside from 'hooks/useClickOutside';
import { MouseEvent, useRef } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';

import { filterPropsType } from './DropDownFilter';

interface StyledFDProps {
  selected: string;
  unselected: string[];
  saveSelectedOption: (option: string) => void;
  saveUnselectedOption: (option: string) => void;
  toggle: () => void;
  filterProps?: filterPropsType[];
}

function FilterDiv(props: StyledFDProps) {
  const { selected, unselected, saveSelectedOption, saveUnselectedOption, toggle, filterProps } =
    props;
  const filterRef = useRef<HTMLUListElement>(null);
  useClickOutside(filterRef, toggle);

  const handleClick = (e: MouseEvent) => {
    if (!(e.target instanceof HTMLElement)) return;
    const currentSelected = e.target.innerText;
    saveSelectedOption(currentSelected);
    saveUnselectedOption(currentSelected);
    toggle();
    const targetFilter = filterProps?.find(
      (filterInfo) => filterInfo.filterName === currentSelected,
    );
    targetFilter?.onClick();
  };

  return (
    <StyledUl ref={filterRef}>
      <li onClick={handleClick} role="presentation">
        {selected}
      </li>
      {unselected.map((option) => (
        <li key={option} onClick={handleClick} role="presentation">
          {option}
        </li>
      ))}
    </StyledUl>
  );
}

export default FilterDiv;

const StyledUl = styled.ul`
  display: flex;
  position: absolute;
  flex-direction: column;
  z-index: 3;
  width: 11.5rem;
  top: 100%;
  right: 0;
  box-shadow: 0px 3px 8px rgba(87, 82, 76, 0.15);
  border-radius: 0.5rem;
  background-color: white;
  padding: 1.6rem 0rem;
  gap: 0.8rem;
  & > li:first-child {
    font-weight: bold;
    color: ${theme.colors.purpleText};
  }
  & > li {
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2rem;
    margin-left: 1.2rem;
    color: ${theme.colors.gray1};
    cursor: pointer;
  }

  ${applyMediaQuery('desktop', 'tablet', 'mobile')} {
    width: 8.3rem;
    padding: 1.3rem 1rem;
    gap: 0.5rem;
    & > li {
      font-size: 1rem;
      line-height: 1.4rem;
      margin-left: 0;
    }
  }
`;
