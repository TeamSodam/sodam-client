import React from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';

interface SubmitButtonProps {
  isSubmitAvailable: boolean;
  handleFormSubmit: () => void;
}
interface StyledProps {
  isSubmitAvailable: boolean;
}

function SubmitButton(props: SubmitButtonProps) {
  const { isSubmitAvailable, handleFormSubmit } = props;

  return (
    <StyledButton type="submit" onClick={handleFormSubmit} isSubmitAvailable={isSubmitAvailable}>
      리뷰 작성완료
    </StyledButton>
  );
}

const StyledButton = styled.button<StyledProps>`
  width: 79.2rem;
  height: 5.9rem;
  border-radius: 1rem;
  border: none;
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  margin-top: 7.2rem;
  margin-bottom: 8rem;
  background-color: ${(props) =>
    props.isSubmitAvailable ? theme.colors.purpleMain : theme.colors.gray2};
  &:hover {
    cursor: ${(props) => (props.isSubmitAvailable ? 'pointer' : 'default')};
  }

  ${applyMediaQuery('desktop', 'tablet')} {
    width: 52.9rem;
    height: 4rem;
    font-size: 1.4rem;
    margin-top: 4.5rem;
    margin-bottom: 5.4rem;
  }
`;

export default SubmitButton;
