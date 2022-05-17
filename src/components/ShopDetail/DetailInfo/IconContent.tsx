import shortid from 'shortid';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

export interface IconContentProps {
  mainIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  iconName: string;
  content:
    | string
    | Array<{
        icon: React.FC<React.SVGProps<SVGSVGElement>>;
        isFilled: boolean;
        link: string;
      }>;
}

function IconContent(props: IconContentProps) {
  const { mainIcon: MainIcon, iconName, content } = props;

  const showContent = () => {
    if (typeof content === 'string') {
      if (iconName === '홈페이지') {
        return (
          <a target="_blank" rel="noopener noreferrer" href={content}>
            공식 홈페이지 바로가기
          </a>
        );
      }

      return content;
    }

    return content.map((contentEl) => {
      const { icon: Icon, isFilled, link } = contentEl;
      return (
        <FillableIcon
          key={shortid.generate()}
          isFilled={isFilled}
          onClick={() => {
            if (isFilled) window.open(link, '_blank');
          }}
        >
          <Icon />
        </FillableIcon>
      );
    });
  };

  return (
    <Container>
      <IconWrapper>
        <MainIcon />
        <span>{iconName}</span>
      </IconWrapper>
      <ContentWrapper isCenter={iconName === 'SNS'}>{showContent()}</ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 2.4rem;
  ${applyMediaQuery('desktop')} {
    gap: 1.8rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.7rem;

  & > span {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 2rem;
    color: ${({ theme }) => theme.colors.purpleText};
  }
  ${applyMediaQuery('desktop')} {
    gap: 1.2rem;
    & > span {
      font-size: 1.3rem;
      line-height: 1.5rem;
    }

    & > svg {
      transform: scale(0.75);
    }
  }
`;

const ContentWrapper = styled.div<{ isCenter: boolean }>`
  flex: 1;
  display: flex;
  justify-content: ${(props) => (props.isCenter ? 'center' : 'flex-start')};
  align-items: center;
  gap: 2.4rem;

  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2rem;

  ${applyMediaQuery('desktop')} {
    font-size: 1.3rem;
    line-height: 1.5rem;

    gap: unset;
  }

  color: ${({ theme }) => theme.colors.black1};

  & a {
    color: ${({ theme }) => theme.colors.black1};
  }
`;

const FillableIcon = styled.button<{ isFilled: boolean }>`
  &:hover {
    cursor: ${(props) => (props.isFilled ? 'pointer' : 'default')};
  }

  padding: 0;
  background-color: transparent;
  border: none;
  & circle {
    fill: ${(props) => props.isFilled && props.theme.colors.purpleMain};
  }

  ${applyMediaQuery('desktop')} {
    transform: scale(0.75);
  }
`;

export default IconContent;
