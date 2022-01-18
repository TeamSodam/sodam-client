import writeIC from 'public/assets/ic_writeReview.svg';
import styled from 'styled-components';
import { theme } from 'styles/theme';

function WriteReviewBtn() {
  return (
    <StyledWriteBtn>
      리뷰 작성하기
      <WriteIcon />
    </StyledWriteBtn>
  );
}

export default WriteReviewBtn;

const StyledWriteBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16.4rem;
  height: 3.5rem;
  border-radius: 1rem;
  border: 0;
  outline: 0;
  background-color: ${theme.colors.purpleMain};
  color: ${theme.colors.grayBg};
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.3rem;
`;
const WriteIcon = styled(writeIC)`
  width: 1.6rem;
  height: 1.6rem;
  margin-left: 0.8rem;
  align-self: center;
`;
