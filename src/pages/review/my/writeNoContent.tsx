import NoContent from 'components/common/NoContent';
import styled from 'styled-components';

const noContentData = {
  title: '내가 작성한 리뷰',
  src: '/assets/img_writeNoContent.png',
  label: '아직 작성한 리뷰가 없어요',
  subLabel: '다녀온 소품샵 후기를 기록하러 가볼까요?',
  button: '리뷰 작성하기',
  buttonUrl: '/review/my/write',
};

function noContent() {
  return (
    <Container>
      <NoContent noContentData={noContentData} />
    </Container>
  );
}
const Container = styled.main`
  width: 100%;
  height: calc(100vh - 8.2rem - 23.7rem);
`;

export default noContent;
