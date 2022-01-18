import ImageDiv from 'components/common/ImageDiv';
import styled from 'styled-components';

function DetailImageGrid() {
  return (
    <Container>
      <ImageDiv
        className="detail-image"
        src="/assets/dummy/shop_detail.png"
        layout="fill"
        alt="main-img"
      />
      <ImageDiv
        className="detail-image"
        src="/assets/dummy/dummy-shop.png"
        layout="fill"
        alt="sub-img"
      />
      <ImageDiv
        className="detail-image"
        src="/assets/dummy/dummy-shop.png"
        layout="fill"
        alt="sub-img"
      />
      <ImageDiv
        className="detail-image"
        src="/assets/dummy/dummy-shop.png"
        layout="fill"
        alt="sub-img"
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 59rem;

  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  gap: 1.6rem 2.7rem;

  .detail-image {
    position: relative !important;
  }

  .detail-image:first-child {
    grid-column: 1 / 2;
    grid-row: 1 / 4;
  }

  .detail-image:nth-child(2) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
  .detail-image:nth-child(3) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
  .detail-image:nth-child(4) {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
  }
`;

export default DetailImageGrid;
