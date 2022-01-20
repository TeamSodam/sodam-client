import React from 'react';
import styled from 'styled-components';
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
  background-color: ${(props) =>
    props.isSubmitAvailable ? theme.colors.purpleMain : theme.colors.gray2};
  &:hover {
    cursor: ${(props) => (props.isSubmitAvailable ? 'pointer' : 'default')};
  }
`;

export default SubmitButton;
