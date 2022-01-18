import { MouseEvent } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface StyledFDProps {
  selected: string;
  unselected: string[];
  saveSelectedOption: (option: string) => void;
  saveUnselectedOption: (option: string) => void;
  toggle: () => void;
}

function FilterDiv(props: StyledFDProps) {
  const { selected, unselected, saveSelectedOption, saveUnselectedOption, toggle } = props;

  const handleClick = (e: MouseEvent) => {
    if (!(e.target instanceof HTMLElement)) return;
    const currentSelected = e.target.innerText;
    saveSelectedOption(currentSelected);
    saveUnselectedOption(currentSelected);
    toggle();
  };

  return (
    <StyledUl>
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
  top: 0;
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
`;
