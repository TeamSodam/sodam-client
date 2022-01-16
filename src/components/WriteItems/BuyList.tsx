import styled from 'styled-components';

import DropdownItem from './DropdownItem';
import DropdownPrice from './DropdownPrice';

function BuyList() {
  return (
    <StyledRoot>
      <DropdownItem />
      <DropdownPrice />
    </StyledRoot>
  );
}

export default BuyList;

const StyledRoot = styled.div`
  display: flex;
  gap: 1.6rem;
`;
