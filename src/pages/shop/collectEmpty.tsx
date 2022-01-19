import NoContent from 'components/common/EmptyContent';
import styled from 'styled-components';

const emptyContentData = {
  title: '저장한 소품샵',
  src: '/assets/img_shopNoContent.png',
  label: '아직 저장한 소품샵이 없어요',
  subLabel: '취향저격 소품샵 찾으러 가볼까요?',
  button: '테마별 소품샵 보러가기',
  buttonUrl: '/shop/theme/아기자기한',
};

function collectEmpty() {
  return (
    <Container>
      <NoContent emptyContentData={emptyContentData} />
    </Container>
  );
}
const Container = styled.main`
  width: 100%;
`;

export default collectEmpty;
