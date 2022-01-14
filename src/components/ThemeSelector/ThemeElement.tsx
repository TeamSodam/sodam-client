import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface StyledELProps {
  themeType: string;
  isMain: boolean;
  currentTheme: string | undefined;
  isActive?: boolean;
  imgSrc?: string;
}

function ThemeElement(props: StyledELProps) {
  const { themeType, isMain, currentTheme } = props;

  interface CategoryType {
    [key: string]: string;
  }

  const Category: CategoryType = {
    아기자기한: 'Cute',
    힙한: 'Hip',
    모던한: 'Modern',
    빈티지한: 'Vintage',
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
    text-align: center;
    color: ${({ isActive }) => (isActive ? theme.colors.purpleText : theme.colors.black2)};
    margin-top: ${({ isActive }) => (isActive ? '-4.5rem' : '1.6rem')};
  }
`;

const StyledImgWrapper = styled.div<StyledELProps>`
  display: flex;
  width: ${({ isActive }) => (isActive ? '28.2rem' : '22.2rem')};
  height: ${({ isActive }) => (isActive ? '31.8rem' : '17.8rem')};
  background-image: ${({ imgSrc }) => `url(${imgSrc})`};
  background-repeat: no-repeat;
  background-position: center center;
  background-size: auto;
`;
