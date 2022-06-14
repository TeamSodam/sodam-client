import styled from 'styled-components';

interface IcProps {
  width: number;
  height: number;
  color?: string;
  onClick?: () => void;
}

function IcDeleteRound(props: IcProps) {
  const { width, height, color = 'white', onClick } = props;

  return (
    <StyledButton width={width} height={height} onClick={onClick}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 16C3.582 16 0 12.418 0 8C0 3.582 3.582 -4.76837e-07 8 -4.76837e-07C12.418 -4.76837e-07 16 3.582 16 8C16 12.418 12.418 16 8 16ZM8.94267 8C8.94267 8 11.0353 5.90733 11.138 5.80467C11.3987 5.544 11.3987 5.122 11.138 4.862C10.8773 4.60133 10.4553 4.60133 10.1953 4.862C10.0927 4.964 8 7.05733 8 7.05733C8 7.05733 5.90733 4.96467 5.80467 4.862C5.544 4.60133 5.122 4.60133 4.862 4.862C4.60133 5.12267 4.60133 5.54467 4.862 5.80467C4.964 5.90733 7.05733 8 7.05733 8C7.05733 8 4.96467 10.0927 4.862 10.1953C4.60133 10.456 4.60133 10.878 4.862 11.138C5.12267 11.3987 5.54467 11.3987 5.80467 11.138C5.90733 11.036 8 8.94267 8 8.94267C8 8.94267 10.0927 11.0353 10.1953 11.138C10.456 11.3987 10.878 11.3987 11.138 11.138C11.3987 10.8773 11.3987 10.4553 11.138 10.1953C11.036 10.0927 8.94267 8 8.94267 8Z"
          fill={color}
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
  padding: 0;
  margin: 0;
  &:hover {
    cursor: pointer;
  }
`;

export default IcDeleteRound;
