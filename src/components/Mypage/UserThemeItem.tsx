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
interface StyledProps {
  isSelected: boolean;
}

function UserThemeItem(props: Props) {
  const { themeType, isSelected } = props;

  const Category: CategoryType = {
    아기자기한: 'cute',
    힙한: 'hip',
    모던한: 'modern',
    빈티지: 'vintage',
  };

  const getCategoryOnIcon = (): string => `/assets/ic_theme_${Category[themeType]}_on.png`;
  const getCategoryOffIcon = (): string => `/assets/ic_theme_${Category[themeType]}_off.png`;

  return (
    <StyledRoot isSelected={isSelected}>
      <StyledImage>
        <Image
          src={isSelected ? getCategoryOnIcon() : getCategoryOffIcon()}
          layout="fill"
          alt={themeType}
        />
      </StyledImage>
      <p>{themeType}</p>
    </StyledRoot>
  );
}

const StyledRoot = styled.button<StyledProps>`
  width: 9.4rem;
  height: 12.9rem;
  border: none;
  background: none;
  padding: 0;
  p {
    font-size: 1.2rem;
    font-weight: 500;
    color: ${({ isSelected }) => (isSelected ? theme.colors.purpleText : theme.colors.inactive)};
  }
`;
const StyledImage = styled.div`
  position: relative;
  width: 9.4rem;
  height: 9.4rem;
  margin-bottom: 1.8rem;
`;

export default UserThemeItem;
