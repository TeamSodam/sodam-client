import type { AnyStyledComponent } from 'styled-components';
import styled from 'styled-components';
import { getBackgroundImageCss } from 'styles/mixin';

interface DetailInfoData {
  shopName: string;
  showCategory: () => string;
  showTheme: (StTheme: AnyStyledComponent) => JSX.Element | JSX.Element[];
  showIconContent: () => JSX.Element[];
  BookMarkBtn: JSX.Element;
  copyCurrentLink: () => void;
}

function MobileLayout(props: DetailInfoData) {
  const { shopName, showCategory, showTheme, BookMarkBtn, showIconContent, copyCurrentLink } =
    props;
  return (
    <Container>
      <ThemeList>{showTheme(Theme)}</ThemeList>
      <StyledWrapper>
        <StyledNames>
          <h1>{shopName}</h1>
          <p>{showCategory()}</p>
        </StyledNames>
        <IconWrapper>
          {BookMarkBtn}
          <ShareButton onClick={copyCurrentLink} />
        </IconWrapper>
      </StyledWrapper>
      <IconContents>{showIconContent()}</IconContents>
    </Container>
  );
}

export default MobileLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  position: relative;
`;

const ShareButton = styled.button`
  ${getBackgroundImageCss('/assets/ic_share.svg')};

  border: none;
  width: 1.7rem;
  height: 1.7rem;
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.purpleText};
`;

const StyledNames = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.7rem;

  & > h1 {
    font-size: 1.8rem;
    line-height: 2.6rem;
    font-weight: 700;
  }

  & > p {
    font-size: 1.1rem;
    line-height: 1.6rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.gray1};
  }
`;

const ThemeList = styled.ul`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

const Theme = styled.li`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.purpleText};
  border: 1px solid ${({ theme }) => theme.colors.purpleText};
  background-color: white;
  border-radius: 3rem;

  font-weight: 700;
  font-size: 0.9rem;
  line-height: 2rem;

  padding: 0 1rem;
  height: fit-content;

  &:before {
    content: '#';
  }
`;

const IconContents = styled.ul`
  display: flex;
  flex-direction: column;

  gap: 1.2rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;

  & svg:hover {
    cursor: pointer;
  }
`;
