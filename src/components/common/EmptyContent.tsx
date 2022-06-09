import Link from 'next/link';
import styled from 'styled-components';

import ImageDiv from './ImageDiv';

interface EmptyContentProps {
  emptyContentData: {
    title: string;
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
      <Header>{title}</Header>
      <ContentWrapper>
        <ImageDiv className="shop_image" width={282} height={281} src={src} alt="shop_image" />
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
`;
const Header = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black2};
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
`;
const SubLabel = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.6rem;
  margin-bottom: 4rem;
  color: ${({ theme }) => theme.colors.gray1};
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
`;

export default EmptyContent;
