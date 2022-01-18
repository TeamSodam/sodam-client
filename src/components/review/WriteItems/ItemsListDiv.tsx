import { MoreFilterList } from 'constants/dropdownOptionList';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface StyledILDProps {
  onSelectedItem: (item: string) => void;
}

function ItemsListDiv(props: StyledILDProps) {
  const { onSelectedItem } = props;

  const handleClick = (item: string) => {
    onSelectedItem(item);
  };
  return (
    <StyledUl>
      {MoreFilterList.map((item) => (
        <li key={item} onClick={() => handleClick(item)} role="presentation">
          {item}
        </li>
      ))}
    </StyledUl>
  );
}

export default ItemsListDiv;

const StyledUl = styled.ul`
  display: flex;
  position: absolute;
  z-index: 1;
  top: 5.6rem;
  left: 0;
  flex-direction: column;
  width: 29.7rem;
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
