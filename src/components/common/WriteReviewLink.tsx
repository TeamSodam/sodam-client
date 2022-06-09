import Link from 'next/link';
import writeIC from 'public/assets/ic_writeReview.svg';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';

interface StyledWRBProps {
  href: string;
}
function WriteReviewLink(props: StyledWRBProps) {
  const { href } = props;

  return (
    <Link href={href} passHref>
      <StyledWriteLink>
        <span>리뷰 작성하기</span>
        <WriteIcon />
      </StyledWriteLink>
    </Link>
  );
}

export default WriteReviewLink;

const StyledWriteLink = styled.a`
  text-decoration: none;
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

  ${applyMediaQuery('desktop')} {
    height: 3.2rem;
    width: 13.6rem;

    font-size: 1.2rem;
    line-height: 1.7rem;
    font-family: 'Noto Sans KR';
  }

  ${applyMediaQuery('mobile')} {
    font-size: 0.8rem;
    line-height: 1.2rem;
    font-family: 'Noto Sans KR';

    border-radius: 5px;
    gap: 0.3rem;

    width: unset;
    height: 1.9rem;
    padding: 0.5rem 0.8rem;
  }
`;
const WriteIcon = styled(writeIC)`
  width: 1.6rem;
  height: 1.6rem;
  margin-left: 0.8rem;
  align-self: center;

  ${applyMediaQuery('mobile')} {
    order: -1;
    transform: scale(0.5) translateY(1px);
    margin: 0;
  }
`;
