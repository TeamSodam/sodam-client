import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';
import { ShopThemeType } from 'types/shop';

interface Props {
  themeType: ShopThemeType;
  isSelected: boolean;
  canEdit: boolean;
  onToggle: (value: ShopThemeType) => void;
}
type CategoryType = {
  [key in ShopThemeType]: string;
};
interface StyledProps {
  isSelected: boolean;
}

function UserThemeItem(props: Props) {
  const { themeType, isSelected, canEdit, onToggle } = props;

  const Category: CategoryType = {
    아기자기한: 'cute',
    힙한: 'hip',
    모던한: 'modern',
    빈티지: 'vintage',
  };
  const buttonType = isSelected ? 'minus' : 'plus';

  const getCategoryOnIcon = (): string => `/assets/ic_theme_${Category[themeType]}_on.svg`;
  const getCategoryOffIcon = (): string => `/assets/ic_theme_${Category[themeType]}_off.svg`;
  const getButtonIcon = (): string => `/assets/ic_${buttonType}.png`;

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
      {canEdit && (
        <button onClick={() => onToggle(themeType)}>
          <StyledIcon>
            <Image src={getButtonIcon()} layout="fill" alt={buttonType} />
          </StyledIcon>
        </button>
      )}
    </StyledRoot>
  );
}

const StyledRoot = styled.button<StyledProps>`
  width: 9.4rem;
  height: 12.9rem;
  border: none;
  background: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  p {
    font-size: 1.2rem;
    width: inherit;
    font-weight: 500;
    color: ${({ isSelected }) => (isSelected ? theme.colors.purpleText : theme.colors.inactive)};
  }
  button {
    border: none;
    background: none;
    width: 2.4rem;
    height: 2.4rem;
    padding: 0.4rem;
    position: absolute;
    float: right;
    transform: translate(1.2rem, -1.2rem);
  }
  ${applyMediaQuery('mobile')} {
    width: 5rem;
    height: 6.6rem;
    p {
      font-size: 1rem;
    }
    button {
      width: 1.4rem;
      height: 1.4rem;
      padding: 0.2rem;
      transform: translate(0.6rem, -0.7rem);
    }
  }
`;
const StyledImage = styled.div`
  position: relative;
  width: 9.4rem;
  height: 9.4rem;
  margin-bottom: 1.8rem;
  ${applyMediaQuery('mobile')} {
    width: 5rem;
    height: 5rem;
    margin-bottom: 0.6rem;
  }
`;
const StyledIcon = styled.div`
  position: relative;
  width: 1.6rem;
  height: 1.6rem;
  ${applyMediaQuery('mobile')} {
    width: 1.3rem;
    height: 1.3rem;
  }
`;

export default UserThemeItem;
