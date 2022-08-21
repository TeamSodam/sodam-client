import Link from 'next/link';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

import ImageDiv from './ImageDiv';

interface EmptyContentProps {
  emptyContentData: {
    title?: string;
    src: string;
    label: string;
    subLabel: string;
    button: string;
    buttonUrl: string;
  };
}

function EmptyContent(props: EmptyContentProps) {
  const { emptyContentData } = props;

  const { title, src, label, subLabel, button, buttonUrl } = emptyContentData;

  return (
    <StyledContainer>
      {title && <Header>{title}</Header>}
      <ContentWrapper>
        <ImageDiv className="shop_image_empty" layout="fill" src={src} alt="shop_image" />
        <Label>{label}</Label>
        <SubLabel>{subLabel}</SubLabel>
        <Link href={buttonUrl} passHref>
          <Button>{button}</Button>
        </Link>
      </ContentWrapper>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .shop_image_empty {
    position: relative;
    width: 28.2rem;
    height: 28.1rem;
    ${applyMediaQuery('desktop', 'tablet')} {
      width: 18.7rem;
      height: 18.7rem;
      margin-top: 3.2rem;
    }
    ${applyMediaQuery('tablet')} {
      margin-top: 10rem;
    }
    ${applyMediaQuery('mobile')} {
      width: 12.4rem;
      height: 12.3rem;
      margin-top: 10rem;
    }
  }
`;
const Header = styled.h2`
  font-size: 3rem;
  line-height: 4.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black2};
  ${applyMediaQuery('desktop')} {
    font-size: 2.6rem;
    line-height: 3.8rem;
  }
  ${applyMediaQuery('tablet')} {
    font-size: 2rem;
    line-height: 2.9rem;
  }
  ${applyMediaQuery('mobile')} {
    font-size: 1.4rem;
    line-height: 2rem;
  }
`;
const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.p`
  text-align: center;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3.4rem;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.purpleText};
  ${applyMediaQuery('desktop', 'tablet')} {
    font-size: 2rem;
    line-height: 2.9rem;
    margin-top: 0.6rem;
    margin-bottom: 0.4rem;
  }
  ${applyMediaQuery('mobile')} {
    font-size: 1.4rem;
    line-height: 2rem;
    margin-top: 0.5rem;
    margin-bottom: 0.4rem;
  }
`;
const SubLabel = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.6rem;
  margin-bottom: 4rem;
  color: ${({ theme }) => theme.colors.gray1};
  ${applyMediaQuery('desktop', 'tablet')} {
    font-size: 1.4rem;
    line-height: 2rem;
    margin-bottom: 3rem;
  }
  ${applyMediaQuery('mobile')} {
    font-size: 1.1rem;
    line-height: 1.6rem;
    margin-bottom: 2.2rem;
  }
`;
const Button = styled.button`
  font-size: 1.6rem;
  font-weight: 700;
  width: 38.3rem;
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.purpleMain};
  color: white;
  border: 0;
  border-radius: 5px;
  ${applyMediaQuery('desktop', 'tablet')} {
    font-size: 1.2rem;
    width: 25.5rem;
    height: 3.3rem;
  }
  ${applyMediaQuery('mobile')} {
    font-size: 1rem;
    width: 16.8rem;
    height: 2.6rem;
  }
`;

export default EmptyContent;
