import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface TitleProps {
  name: string;
}

function Title(props: TitleProps) {
  const { name } = props;

  return (
    <StyledRoot>
      <h2>
        <span>{name}</span>님의 리뷰 작성
      </h2>
      <p>소품샵에서의 경험은 즐거우셨나요? 다른 소푸미를 위해 방문 후기를 남겨주세요.</p>
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  h2 {
    font-size: 3rem;
    font-weight: bold;
    line-height: 3.6rem;
    color: ${theme.colors.black2};
    margin-top: 7.2rem;
    margin-bottom: 1.2rem;
    & span {
      color: ${theme.colors.purpleText};
    }
  }
  p {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: ${theme.colors.gray1};
  }
`;

export default Title;
