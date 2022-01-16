import styled from 'styled-components';

import BuyList from './BuyList';

function index() {
  return (
    <StyledRoot>
      <BuyList />
      <BuyList />
      <BuyList />
    </StyledRoot>
  );
}

export default index;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;
