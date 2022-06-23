import { privacyPolicy, termsContents, termsOfService } from 'constants/TermsContents';
import CloseIC from 'public/assets/ic_termsClose.svg';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface DetailTermsProps {
  termsType: string;
  handleTerms: (termsType: string) => void;
}

function DetailTerms(props: DetailTermsProps) {
  const { termsType, handleTerms } = props;

  const contents = termsType === 'terms' ? termsOfService : privacyPolicy;

  return (
    <StyledRoot>
      <CloseIcon onClick={() => handleTerms('')} />
      <StyledContentsWrapper>
        <StyledTitle>{termsContents[termsType].title}</StyledTitle>
        <StyledContents>
          {contents.map(({ number, content }) => (
            <>
              <p>{number}</p>
              <pre dangerouslySetInnerHTML={{ __html: content }} />
            </>
          ))}
        </StyledContents>
      </StyledContentsWrapper>
    </StyledRoot>
  );
}

export default DetailTerms;

const StyledRoot = styled.div`
  position: relative;
  width: 52.8rem;
  height: 23.4rem;
  background-color: white;
  border: 1px solid ${theme.colors.purpleText};
  border-radius: 5px;
  margin-top: 2rem;
  padding: 0 2.5rem;
  color: ${theme.colors.black1};
`;

const StyledContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  padding: 2rem 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledTitle = styled.span`
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.9rem;
  margin-top: 0.3rem;
`;

const StyledContents = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  & > p {
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 1.7rem;
    margin-top: 1.8rem;
  }
  & > pre {
    font-weight: 400;
    font-size: 1.1rem;
    line-height: 1.6rem;
    white-space: pre-wrap;
  }
  & b {
    font-weight: bold;
  }
`;

const CloseIcon = styled(CloseIC)`
  position: absolute;
  top: 2.9rem;
  right: 2.3rem;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;
