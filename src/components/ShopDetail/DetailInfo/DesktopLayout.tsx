import ShareIC from 'public/assets/ic_share.svg';
import type { AnyStyledComponent } from 'styled-components';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

interface DetailInfoData {
  shopName: string;
  showCategory: () => string;
  showTheme: (StTheme: AnyStyledComponent) => JSX.Element | JSX.Element[];
  showIconContent: () => JSX.Element[];
  BookMarkBtn: JSX.Element;
}

function DesktopLayout(props: DetailInfoData) {
  const { shopName, showCategory, showTheme, BookMarkBtn, showIconContent } = props;
  return (
    <Container>
      <LeftWrapper>
        <UpWrapper>
          <h1>{shopName}</h1>
          <p>{showCategory()}</p>
        </UpWrapper>
        <DownWrapper>
          <ThemeList>{showTheme(Theme)}</ThemeList>
          <IconWrapper>
            {BookMarkBtn}
            <ShareIC />
          </IconWrapper>
        </DownWrapper>
      </LeftWrapper>
      <IconContents>{showIconContent()}</IconContents>
    </Container>
  );
}

export default DesktopLayout;

const Container = styled.div`
  display: flex;
  height: 21.9rem;
  gap: 10.7rem;

  ${applyMediaQuery('desktop')} {
    gap: 4.5rem;
    height: 15.2rem;
  }
`;

const LeftWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  height: 100%;
`;

const UpWrapper = styled.div`
  max-height: 75%;

  padding-bottom: 3.2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.purpleText};

  & > h1 {
    width: 95%;
    font-size: 3rem;
    line-height: 4.4rem;
    color: ${({ theme }) => theme.colors.black2};
    font-weight: 700;
    margin-bottom: 0.8rem;
    margin-top: -1rem;

    display: -webkit-box;
    white-space: normal;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > p {
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 2.6rem;
    color: ${({ theme }) => theme.colors.gray1};
  }

  ${applyMediaQuery('desktop')} {
    & > h1 {
      font-size: 2.4rem;
      line-height: 3.2rem;
      margin-top: unset;
    }

    & > p {
      font-size: 1.2rem;
      line-height: 2rem;
    }
  }
`;

const DownWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const IconContents = styled.ul`
  list-style: none;
  flex: 1.7;
  height: 72%;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 3.7rem;

  & > * {
    height: 2.2rem;
  }

  ${applyMediaQuery('desktop')} {
    gap: 2rem 1rem;
    height: 100%;
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

  background-color: ${({ theme }) => theme.colors.purpleText};
  color: white;
  border-radius: 3rem;

  font-weight: 700;
  font-size: 1.2rem;
  line-height: 2rem;

  padding: 0.7rem 1.2rem;
  height: fit-content;

  ${applyMediaQuery('desktop')} {
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 0.7rem 1rem;
  }

  &:before {
    content: '#';
  }

  ${applyMediaQuery('desktop')} {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 2.3rem;

  & svg:hover {
    cursor: pointer;
  }

  ${applyMediaQuery('desktop')} {
    transform: scale(0.75);
  }
`;
