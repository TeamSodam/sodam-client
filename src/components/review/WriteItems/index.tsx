import { useState } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { Item } from 'types/review';
import { PriceOptionList, ShopCategoryType } from 'types/shop';

import BuyList from './BuyList';

interface WriteItemsProps {
  selectedItemList: Item[];
  handleItemSubmit: (
    data: ShopCategoryType | PriceOptionList,
    index: number,
    type: keyof Item,
  ) => void;
}

function WriteItems(props: WriteItemsProps) {
  const { selectedItemList, handleItemSubmit } = props;

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
          selectedItemList={selectedItemList}
          handleItemSubmit={handleItemSubmit}
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
  ${applyMediaQuery('desktop', 'tablet')} {
    gap: 1.3rem;
  }
`;
