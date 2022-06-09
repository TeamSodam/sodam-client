import ImageDiv from 'components/common/ImageDiv';
import shortid from 'shortid';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

function DetailImageGrid({ imageList }: { imageList: string[] }) {
  return (
    <Container>
      {imageList.map((imageSrc) => (
        <ImageDiv
          key={shortid.generate()}
          className="detail-image"
          src={imageSrc}
          layout="fill"
          alt="main-img"
          blurDataURL={imageSrc}
          placeholder="blur"
        />
      ))}
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

  ${applyMediaQuery('desktop')} {
    height: 45rem;
  }

  ${applyMediaQuery('tablet')} {
    height: 30rem;
    gap: 1rem 1.5rem;
  }
  ${applyMediaQuery('mobile')} {
    height: 15.6rem;
    gap: 0.8rem 0.3rem;
  }

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
