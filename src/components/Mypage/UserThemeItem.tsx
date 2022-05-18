import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { ShopThemeType } from 'types/shop';

interface Props {
  themeType: ShopThemeType;
  isSelected: boolean;
}
type CategoryType = {
  [key in ShopThemeType]: string;
};

function UserThemeItem(props: Props) {
  const { themeType, isSelected } = props;

  const Category: CategoryType = {
    아기자기한: 'Cute',
    힙한: 'Hip',
    모던한: 'Modern',
    빈티지: 'Vintage',
  };

  const getCategoryIcon = (): string => `/assets/ic_theme${Category[themeType]}.png`;

  return (
    <StyledRoot>
      <StyledImage>
        <Image
          src={isSelected ? getCategoryIcon() : getCategoryIcon()}
          layout="fill"
          alt={themeType}
        />
      </StyledImage>
      <p>{themeType}</p>
    </StyledRoot>
  );
}

const StyledRoot = styled.button`
  width: 9.4rem;
  height: 12.9rem;
  border: none;
  background: none;
  padding: 0;
  p {
    font-size: 1.2rem;
    font-weight: 500;
    color: ${theme.colors.purpleText};
  }
`;
const StyledImage = styled.div`
  position: relative;
  width: 9.4rem;
  height: 9.4rem;
  margin-bottom: 1.8rem;
`;

export default UserThemeItem;
