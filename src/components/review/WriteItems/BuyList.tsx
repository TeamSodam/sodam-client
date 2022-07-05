import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { Item } from 'types/review';
import { PriceList, ShopCategoryType } from 'types/shop';

import DropdownItem from './DropdownItem';
import DropdownPrice from './DropdownPrice';

interface StyledBLProps {
  idx: number;
  currentOpen: number;
  onSetCurrentOpen: (idx: number) => void;
  selectedItemList: Item[];
  handleItemSubmit: (data: ShopCategoryType | PriceList, index: number, type: keyof Item) => void;
}
function BuyList(props: StyledBLProps) {
  const { idx, currentOpen, onSetCurrentOpen, selectedItemList, handleItemSubmit } = props;
  return (
    <StyledRoot>
      <DropdownItem
        idx={idx}
        currentOpen={currentOpen}
        onSetCurrentOpen={onSetCurrentOpen}
        selectedItem={selectedItemList[idx]?.itemName}
        handleItemSubmit={handleItemSubmit}
      />
      <DropdownPrice
        idx={idx}
        currentOpen={currentOpen}
        onSetCurrentOpen={onSetCurrentOpen}
        selectedItem={selectedItemList[idx]?.price}
        handleItemSubmit={handleItemSubmit}
      />
    </StyledRoot>
  );
}

export default BuyList;

const StyledRoot = styled.div`
  display: flex;
  gap: 1.6rem;
  ${applyMediaQuery('desktop', 'tablet')} {
    gap: 1.1rem;
  }
  ${applyMediaQuery('mobile')} {
    gap: 1rem;
  }
`;
