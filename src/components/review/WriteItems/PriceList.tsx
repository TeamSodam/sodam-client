import { PriceFilterList } from 'constants/dropdownOptionList';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';
import { PriceOptionList } from 'types/shop';

interface StyledPLProps {
  onSelectedPrice: (price: PriceOptionList) => void;
}
function PriceList(props: StyledPLProps) {
  const { onSelectedPrice } = props;

  const handleClick = (price: PriceOptionList) => {
    onSelectedPrice(price);
  };

  return (
    <StyledUl>
      {PriceFilterList.map((price) => (
        <li key={price} onClick={() => handleClick(price)} role="presentation">
          {price}
        </li>
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
  & > li:hover {
    background-color: ${theme.colors.purpleBg};
  }

  ${applyMediaQuery('desktop', 'tablet', 'mobile')} {
    top: 3.6rem;
    width: 12.6rem;
    padding: 0.8rem 0.5rem;

    & > li {
      height: 1.9rem;
      line-height: 1.9rem;
      font-size: 1rem;
      padding-left: 0.5rem;
    }
  }
  ${applyMediaQuery('mobile')} {
    width: 12.5rem;

    & > li {
      height: 2.4rem;
      line-height: 2.4rem;
    }
  }
`;
