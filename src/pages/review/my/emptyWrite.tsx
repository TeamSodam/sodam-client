import NoContent from 'components/common/EmptyContent';
import styled from 'styled-components';

const emptyContentData = {
  title: '내가 작성한 리뷰',
  src: '/assets/img_writeNoContent.png',
  label: '아직 작성한 리뷰가 없어요',
  subLabel: '다녀온 소품샵 후기를 기록하러 가볼까요?',
  button: '리뷰 작성하기',
  buttonUrl: '/review/my/write',
};

function emptyWrite() {
  return (
    <Container>
      <NoContent emptyContentData={emptyContentData} />
    </Container>
  );
}
const Container = styled.main`
  width: 100%;
`;

export default emptyWrite;
