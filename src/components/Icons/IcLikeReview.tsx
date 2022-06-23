import styled from 'styled-components';
import { theme } from 'styles/theme';

interface IcProps {
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
  onClick?: () => void;
}

function IcLikeReview(props: IcProps) {
  const {
    width = 29,
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
        viewBox="0 0 29 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5586 24.6557L13.5587 24.6557L13.5491 24.6483C11.4965 23.0719 8.32796 20.554 5.67669 17.5308C3.00037 14.4791 1 11.0786 1 7.73491C1 4.03572 4.07157 1 7.90845 1C9.70079 1 11.1365 1.75973 12.1513 2.5585C12.6566 2.95625 13.0452 3.35459 13.3057 3.65122C13.4354 3.79901 13.532 3.92006 13.594 4.00109C13.625 4.04155 13.6473 4.07189 13.6607 4.09042L13.674 4.1091C13.6744 4.10979 13.6748 4.11033 13.6751 4.11071C13.6753 4.11107 13.6755 4.11129 13.6755 4.11135C13.6755 4.11137 13.6755 4.11137 13.6755 4.11136L14.5 5.32089L15.3245 4.11136C15.3245 4.11137 15.3245 4.11137 15.3245 4.11135C15.3245 4.11129 15.3247 4.11107 15.3249 4.11071C15.3252 4.11033 15.3256 4.10979 15.326 4.1091L15.3393 4.09042C15.3527 4.07189 15.375 4.04155 15.406 4.00109C15.468 3.92006 15.5646 3.79901 15.6943 3.65122C15.9548 3.35459 16.3434 2.95625 16.8487 2.5585C17.8635 1.75973 19.2992 1 21.0916 1C24.9284 1 28 4.03572 28 7.73491C28 11.0866 25.9891 14.496 23.3026 17.5538C20.6414 20.5827 17.4647 23.1026 15.418 24.6735L15.3888 24.696L15.3869 24.6977L15.3594 24.718C15.1144 24.8991 14.8129 24.9992 14.5004 25C14.1885 24.9989 13.8876 24.8988 13.6429 24.718L13.5586 24.6557Z"
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

export default IcLikeReview;
