import SEOUL_ENUM from 'constants/SeoulAreaEnum';
import { useRouter } from 'next/router';
import styled from 'styled-components';

function MapWithAreaId() {
  const router = useRouter();
  const { areaId } = router.query;

  if (!areaId) return <div>something wrong!</div>;

  return (
    <StyledContainer>
      <TESTING_HEADER>{`${SEOUL_ENUM[+areaId]} 을 클릭하셨어요!`}</TESTING_HEADER>
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  display: flex;
  flex-direction: column;
  margin: 7.2rem 18.75% 0 18.75%;
`;

const TESTING_HEADER = styled.h1`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.purpleMain};
`;

export default MapWithAreaId;
