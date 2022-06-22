import styled from 'styled-components';

interface LoaderProps {
  width?: string;
  height?: string;
}

function Loader(props: LoaderProps) {
  return <StLoader {...props} />;
}

const StLoader = styled.div<LoaderProps>`
  width: ${(props) => props.width || '50px'};
  height: ${(props) => props.height || '50px'};

  background-image: url(/assets/logo.svg);
  background-position: center;
  background-size: cover;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  animation: rotate infinite ease-out 2s;
  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
      opacity: 1;
    }

    50% {
      opacity: 0.5;
    }

    100% {
      transform: translate(-50%, -50%) rotate(360deg);
      opacity: 1;
    }
  }
`;

export default Loader;
