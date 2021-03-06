import { MoreFilterList } from 'constants/dropdownOptionList';
import useClickOutside from 'hooks/useClickOutside';
import { Dispatch, MouseEvent, SetStateAction, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';
import { ShopCategoryType } from 'types/shop';

interface StyledMFProps {
  option: string;
  isActive: boolean;
}

interface MoreFilterProps {
  currentCategory: string;
  updateCategory: Dispatch<SetStateAction<ShopCategoryType | undefined>>;
}

function MoreFilter(props: MoreFilterProps) {
  const { currentCategory, updateCategory } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prevIsOpen) => !prevIsOpen);
  const filterRef = useRef<HTMLUListElement>(null);
  const closeModal = useCallback(() => setIsOpen(false), []);
  useClickOutside(filterRef, closeModal, isOpen);

  const handleClick = (e: MouseEvent, option: ShopCategoryType) => {
    if (!(e.target instanceof HTMLElement)) return;
    e.stopPropagation();
    toggle();
    updateCategory(option);
  };

  return (
    <StyledRoot>
      <StyledWrapper onClick={toggle}>
        <span>더보기</span>
        {isOpen && (
          <StyledUl ref={filterRef}>
            {MoreFilterList.map((option) => (
              <StyledLi
                key={option}
                option={option}
                isActive={currentCategory === option}
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

  ${applyMediaQuery('desktop')} {
    & > span {
      font-size: 1.6rem;
    }
  }
  ${applyMediaQuery('tablet')} {
    & > span {
      font-size: 1.3rem;
    }
  }
  ${applyMediaQuery('mobile')} {
    & > span {
      font-size: 0.9rem;
      line-height: 1.3rem;
    }
  }
`;

const StyledUl = styled.ul`
  display: flex;
  position: absolute;
  flex-direction: column;
  z-index: 5;
  width: 11.5rem;
  top: 100%;
  right: 0;
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

  ${applyMediaQuery('tablet')} {
    font-size: 1.3rem;
  }
  ${applyMediaQuery('mobile')} {
    font-size: 0.9rem;
    line-height: 1.3rem;
  }
`;
