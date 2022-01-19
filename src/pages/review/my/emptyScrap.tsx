import NoContent from 'components/common/EmptyContent';
import styled from 'styled-components';

const emptyContentData = {
  title: '스크랩한 리뷰',
  src: '/assets/img_scrapNoContent.png',
  label: '아직 스크랩한 리뷰가 없어요',
  // eslint-disable-next-line prettier/prettier
  subLabel: '홈 화면에서 \'오늘의 리뷰\' 구경하러 가볼까요?',
  button: '홈 화면 바로가기',
  buttonUrl: '/',
};

function scrapNoContent() {
  return (
    <Container>
      <NoContent emptyContentData={emptyContentData} />
    </Container>
  );
}
const Container = styled.main`
  width: 100%;
  height: calc(100vh - 8.2rem - 23.7rem);
`;

export default scrapNoContent;
