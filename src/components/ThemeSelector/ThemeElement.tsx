import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

function ThemeElement(props) {
  const { themeType } = props;

  return (
    <Link passHref href={`shop/theme/${themeType}`}>
      <StyledRoot>
        <StyledImgWrapper />
        <p>{themeType}</p>
      </StyledRoot>
    </Link>
  );
}

export default ThemeElement;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  & > p {
    font-weight: bold;
    font-size: 2rem;
    line-height: 2.9rem;
    text-align: center;
    color: ${theme.colors.black2};
    margin-top: 1.6rem;
  }
`;

const StyledImgWrapper = styled.div`
  display: flex;
  background-color: ${theme.colors.grayBg};
  width: 28.4rem;
  height: 21rem;
  border-radius: 5rem;
`;
