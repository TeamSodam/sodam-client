import { useState } from 'react';
import styled from 'styled-components';

import BuyList from './BuyList';

function WriteItems() {
  const listIdx = [1, 2, 3];
  const [currentOpen, setCurrentOpen] = useState(0);

  const onSetCurrentOpen = (idx: number) => {
    setCurrentOpen(idx);
  };

  return (
    <StyledRoot>
      {listIdx.map((idx) => (
        <BuyList
          key={idx}
          idx={idx}
          currentOpen={currentOpen}
          onSetCurrentOpen={onSetCurrentOpen}
        />
      ))}
    </StyledRoot>
  );
}

export default WriteItems;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;
