import ImageMap from 'components/ImageMap';
import styled from 'styled-components';

function MapLandingPage() {
  return (
    <StyledContainer>
      <Header>
        <b>서울</b> 지역 소품샵 한 눈에 보기
      </Header>
      <SubHeader>원하는 지역을 클릭해 자세한 소품샵 위치를 확인할 수 있어요.</SubHeader>
      <ImageMap />
    </StyledContainer>
  );
}

const StyledContainer = styled.main`
  display: flex;
  flex-direction: column;
  margin: 7.2rem 18.75% 13.4rem 18.75%;
  & > svg {
    align-self: center;
  }
`;

const Header = styled.h1`
  font-size: 3rem;
  line-height: 4.3rem;
  font-weight: 700;

  & > b {
    color: ${({ theme }) => theme.colors.purpleText};
  }
`;

const SubHeader = styled.p`
  font-size: 1.8rem;
  line-height: 2.6rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black1};
  margin-bottom: 5.2rem;
`;

export default MapLandingPage;
