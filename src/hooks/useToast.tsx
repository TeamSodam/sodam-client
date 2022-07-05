import { throttle } from 'lodash-es';
import { useState } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

function useToast(delay?: number) {
  const [isVisible, setIsVisible] = useState(false);
  const [toastText, setToastText] = useState('');

  const wait = delay || 1500;

  const fireToast = (text: string) => {
    setIsVisible(true);
    setToastText(text);

    setTimeout(() => {
      setIsVisible(false);
    }, wait);
  };

  return {
    toast: isVisible ? <StyledToast>{toastText}</StyledToast> : null,
    fireToast: throttle(fireToast, wait + 500),
  };
}

const StyledToast = styled.div`
  position: fixed;
  bottom: 1.5rem;
  z-index: 9999;

  width: fit-content;
  left: 50%;
  transform: translateX(-50%);

  border-radius: 8px;
  padding: 1rem 1.5rem;
  text-align: center;

  background-color: ${({ theme }) => theme.colors.purpleMain};
  box-shadow: 3px 3px 5px 3px lightgray;

  font-size: 1.4rem;
  color: white;

  animation: appearFromBottom ease-in-out 0.5s;

  ${applyMediaQuery('tablet', 'mobile')} {
    font-size: 1rem;
  }

  @keyframes appearFromBottom {
    from {
      transform: translate(-50%, 50%);
    }

    to {
      transform: translate(-50%, 0);
    }
  }
`;

export default useToast;
