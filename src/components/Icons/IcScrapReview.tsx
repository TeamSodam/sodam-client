import styled from 'styled-components';
import { theme } from 'styles/theme';

interface IcProps {
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  onClick?: () => void;
}

function IcScrapReview(props: IcProps) {
  const {
    width = 22,
    height = 26,
    stroke = theme.colors.purpleMain,
    fill = 'white',
    onClick,
  } = props;

  return (
    <StyledButton width={width} height={height} onClick={onClick}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 22 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 24.096L12.1352 17.9846C11.4517 17.5135 10.5483 17.5135 9.86483 17.9846L0.999999 24.096L1 2.16667C1 1.73089 1.54762 1 2.75 1H19.25C20.4524 1 21 1.73089 21 2.16667L21 24.096Z"
          stroke={stroke}
          fill={fill}
          strokeWidth="2"
        />
      </svg>
    </StyledButton>
  );
}

const StyledButton = styled.button<IcProps>`
  border: none;
  background: none;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  margin: 0;
  padding: 0;
`;

export default IcScrapReview;
