import shortid from 'shortid';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { getBackgroundImageCss } from 'styles/mixin';

export interface IconContentProps {
  iconUrl: string;
  iconName: string;
  mobileOrder: number;
  content:
    | string
    | Array<{
        icon: React.FC<React.SVGProps<SVGSVGElement>>;
        isFilled: boolean;
        link: string;
      }>;
}

function IconContent(props: IconContentProps) {
  const { iconUrl, iconName, content } = props;

  const showContent = () => {
    if (typeof content === 'string') {
      if (iconName === '홈페이지') {
        return (
          <a target="_blank" rel="noopener noreferrer" href={content || undefined}>
            {content !== '' ? '공식 홈페이지 바로가기' : '홈페이지 준비중'}
          </a>
        );
      }

      return content;
    }

    return content.map((contentEl, index) => {
      const { icon: Icon, isFilled, link } = contentEl;
      return (
        <FillableIcon
          index={index}
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
        <SvgWrapper url={iconUrl} />
        <span>{iconName}</span>
      </IconWrapper>
      <ContentWrapper isCenter={iconName === 'SNS'}>{showContent()}</ContentWrapper>
    </Container>
  );
}

const Container = styled.li`
  width: 100%;
  display: flex;
  gap: 2.4rem;
  ${applyMediaQuery('desktop')} {
    gap: 1.8rem;
  }
`;

const SvgWrapper = styled.div<{ url: string }>`
  ${applyMediaQuery('desktop')} {
    width: 2.2rem;
    height: 2.2rem;
  }
  ${applyMediaQuery('mobile', 'tablet')} {
    width: 1.4rem;
    height: 1.4rem;
  }

  ${({ url }) => getBackgroundImageCss(url)};
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

  ${applyMediaQuery('mobile', 'tablet')} {
    min-width: 6.5rem;
    gap: 1rem;
    & > span {
      font-size: 1.1rem;
      line-height: 2rem;
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

  ${applyMediaQuery('mobile', 'tablet')} {
    position: relative;
    font-size: 1.1rem;
    line-height: 2rem;

    gap: unset;

    justify-content: flex-start;
  }

  color: ${({ theme }) => theme.colors.black1};

  & a {
    color: ${({ theme }) => theme.colors.black1};
  }
`;

const FillableIcon = styled.button<{ isFilled: boolean; index: number }>`
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
  ${applyMediaQuery('mobile', 'tablet')} {
    position: absolute;
    top: 50%;
    left: ${({ index }) => 3.9 * index}rem;
    transform: translate(-25%, -45%) scale(0.5);
  }
`;

export default IconContent;
