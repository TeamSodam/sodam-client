import { PriceFilterList } from 'constants/dropdownOptionList';
import styled from 'styled-components';
import { theme } from 'styles/theme';

function PriceList() {
  return (
    <StyledUl>
      {PriceFilterList.map((price) => (
        <li key={price}>{price}</li>
      ))}
    </StyledUl>
  );
}

export default PriceList;

const StyledUl = styled.ul`
  display: flex;
  position: absolute;
  z-index: 1;
  top: 5.6rem;
  left: 0;
  flex-direction: column;
  width: 17.3rem;
  box-shadow: 0px 3px 8px rgba(87, 82, 76, 0.15);
  border-radius: 0.5rem;
  background-color: ${theme.colors.grayBg};
  padding: 1.2rem 0.8rem;

  & > li {
    height: 2.8rem;
    line-height: 2.8rem;
    font-weight: 500;
    font-size: 1.4rem;
    color: ${theme.colors.black2};
    cursor: pointer;
  }
  &>li: hover {
    background-color: ${theme.colors.purpleBg};
  }
`;
