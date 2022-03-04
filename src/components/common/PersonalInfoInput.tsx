import React from 'react';
import styled from 'styled-components';

function PersonalInfoInput() {
  return (
    <StyledRoot>
      <span>이름</span>
      <input />
    </StyledRoot>
  );
}

export default PersonalInfoInput;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  & > span {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 2.2rem;
    color: ${({ theme }) => theme.colors.black2};
    margin-bottom: 0.9rem;
  }
  & > input {
    width: 52.8rem;
    height: 5rem;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.colors.purpleText};
    border-radius: 5px;
    outline: 0;
    color: ${({ theme }) => theme.colors.gray1};
    font-size: 1.3rem;
    font-weight: 500;
  }
`;
