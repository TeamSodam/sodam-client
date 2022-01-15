import { MoreFilterList } from 'constants/dropdownOptionList';
import { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface StyledMFProps {
  option: string;
  isActive: boolean;
}
function MoreFilter() {
  const [isActive, setIsActive] = useState('문구·팬시');
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  const handleClick = (e: MouseEvent, option: string) => {
    if (!(e.target instanceof HTMLElement)) return;
    e.stopPropagation();
    setIsActive(option);
    toggle();
  };

  return (
    <StyledRoot>
      <StyledWrapper onClick={toggle}>
        <span>더보기</span>
        {isOpen && (
          <StyledUl>
            {MoreFilterList.map((option) => (
              <StyledLi
                key={option}
                option={option}
                isActive={isActive === option}
                onClick={(e) => handleClick(e, option)}
              >
                {option}
              </StyledLi>
            ))}
          </StyledUl>
        )}
      </StyledWrapper>
    </StyledRoot>
  );
}

export default MoreFilter;

const StyledRoot = styled.div`
  display: flex;
`;

const StyledWrapper = styled.div`
  display: flex;
  position: relative;
  gap: 0.8rem;
  align-items: center;
  cursor: pointer;

  & > span {
    font-weight: 500;
    font-size: 2rem;
    line-height: 2rem;
    color: ${theme.colors.gray1};
  }
`;

const StyledUl = styled.ul`
  display: flex;
  position: absolute;
  flex-direction: column;
  z-index: 1;
  width: 11.5rem;
  top: 0;
  left: 0;
  box-shadow: 0px 3px 8px rgba(87, 82, 76, 0.15);
  border-radius: 0.5rem;
  background-color: white;
  padding: 1.6rem 0rem;
  gap: 0.8rem;
`;

const StyledLi = styled.li<StyledMFProps>`
  font-weight: ${({ isActive }) => (isActive ? 'bold' : '500')};
  font-size: 1.4rem;
  line-height: 2rem;
  margin-left: 1.2rem;
  color: ${({ isActive }) => (isActive ? theme.colors.purpleText : theme.colors.gray1)};
  cursor: pointer;
`;
