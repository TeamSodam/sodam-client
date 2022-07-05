import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';
import { ShopThemeType } from 'types/shop';

interface StyledELProps {
  themeType: ShopThemeType;
  isMain: boolean;
  currentTheme: string | undefined;
  isActive?: boolean;
  imgSrc?: string;
}

function ThemeElement(props: StyledELProps) {
  const { themeType, isMain, currentTheme } = props;

  type CategoryType = {
    [key in ShopThemeType]: string;
  };

  const Category: CategoryType = {
    아기자기한: 'Cute',
    힙한: 'Hip',
    모던한: 'Modern',
    빈티지: 'Vintage',
  };

  const getCategoryIcon = (): string => `/assets/ic_theme${Category[themeType]}.png`;
  const getCategoryOnIcon = (): string => `/assets/ic_theme${Category[themeType]}On.png`;

  const isActive = themeType === currentTheme;
  const imgSrc = isActive ? getCategoryOnIcon() : getCategoryIcon();

  return (
    <Link passHref href={`/shop/theme/${themeType}`}>
      <StyledRoot isActive={isActive}>
        <StyledImgWrapper
          isMain={isMain}
          themeType={themeType}
          currentTheme={currentTheme}
          isActive={isActive}
          imgSrc={imgSrc}
        />
        <p>{themeType}</p>
      </StyledRoot>
    </Link>
  );
}

export default ThemeElement;

const StyledRoot = styled.div<Pick<StyledELProps, 'isActive'>>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;

  & > p {
    font-weight: bold;
    font-size: 2rem;
    line-height: 2.9rem;
    ${applyMediaQuery('desktop')} {
      font-size: 1.6rem;
      line-height: 2.3rem;
    }
    ${applyMediaQuery('tablet')} {
      font-size: 1.2rem;
      line-height: 1.8rem;
    }
    ${applyMediaQuery('mobile')} {
      font-size: 0.7rem;
      line-height: 1rem;
    }

    text-align: center;
    color: ${({ isActive }) => (isActive ? theme.colors.purpleText : theme.colors.black2)};
    margin-top: ${({ isActive }) => (isActive ? '-4.5rem' : '1.6rem')};
    ${applyMediaQuery('desktop')} {
      margin-top: ${({ isActive }) => (isActive ? '-3.3rem' : '1.3rem')};
    }
    ${applyMediaQuery('tablet')} {
      margin-top: ${({ isActive }) => (isActive ? '-2.5rem' : '0.7rem')};
    }
    ${applyMediaQuery('mobile')} {
      margin-top: ${({ isActive }) => (isActive ? '-1.7rem' : '0.3rem')};
    }
  }
`;

const StyledImgWrapper = styled.div<StyledELProps>`
  display: flex;
  width: 22.2rem;
  height: ${({ isActive }) => (isActive ? '31.8rem' : '17.8rem')};

  ${applyMediaQuery('desktop')} {
    width: 14.8rem;
    height: ${({ isActive }) => (isActive ? '21rem' : '11.4rem')};
  }
  ${applyMediaQuery('tablet')} {
    width: 10rem;
    height: ${({ isActive }) => (isActive ? '14rem' : '7rem')};
  }
  ${applyMediaQuery('mobile')} {
    width: 6.6rem;
    height: ${({ isActive }) => (isActive ? '8.7rem' : '5.2rem')};
  }
  background-image: ${({ imgSrc }) => `url(${imgSrc})`};
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
`;
