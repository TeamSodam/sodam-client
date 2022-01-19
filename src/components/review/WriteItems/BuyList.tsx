import styled from 'styled-components';

import DropdownItem from './DropdownItem';
import DropdownPrice from './DropdownPrice';

interface StyledBLProps {
  idx: number;
  currentOpen: number;
  onSetCurrentOpen: (idx: number) => void;
}
function BuyList(props: StyledBLProps) {
  const { idx, currentOpen, onSetCurrentOpen } = props;
  return (
    <StyledRoot>
      <DropdownItem idx={idx} currentOpen={currentOpen} onSetCurrentOpen={onSetCurrentOpen} />
      <DropdownPrice idx={idx} currentOpen={currentOpen} onSetCurrentOpen={onSetCurrentOpen} />
    </StyledRoot>
  );
}

export default BuyList;

const StyledRoot = styled.div`
  display: flex;
  gap: 1.6rem;
`;
