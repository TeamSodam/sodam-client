import Link from 'next/link';
import CheckIC from 'public/assets/ic_check.svg';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

import { termsContents } from './TermsContents';

interface CheckedKeysType {
  [key: string]: boolean;
}

function AcceptTerms() {
  const [isChecked, setIsChecked] = useState<CheckedKeysType>({
    allCheck: false,
    terms: false,
    privacy: false,
    event: false,
  });

  const handleClick = (type: string) => {
    if (type === 'allCheck') {
      setIsChecked({
        allCheck: !isChecked.allCheck,
        terms: !isChecked.allCheck,
        privacy: !isChecked.allCheck,
        event: !isChecked.allCheck,
      });
    } else {
      setIsChecked({
        ...isChecked,
        [type]: !isChecked[type],
      });
    }
  };

  useEffect(() => {
    const isAllChecked = isChecked.terms && isChecked.privacy && isChecked.event;

    if (isChecked.allCheck !== isAllChecked)
      setIsChecked((prevIsChecked) => ({ ...prevIsChecked, allCheck: isAllChecked }));
  }, [isChecked]);

  return (
    <StyledWrapper>
      <h3>약관동의</h3>
      <StyledTermsWrapper>
        <StyledLine />
        {termsContents.map((items, idx) => (
          <StyledList key={items.title} order={idx} isNecessary={items.isNecessary}>
            <StyledCheckBtn
              onClick={() => handleClick(items.type)}
              isChecked={isChecked[items.type]}
            >
              <CheckIC />
            </StyledCheckBtn>
            <StyledListContent>
              {items.content ? <Link href={'/'}>{items.title}</Link> : items.title}
            </StyledListContent>
            <span>
              {items.type !== 'allCheck' ? (items.isNecessary ? '(필수)' : '(선택)') : null}
            </span>
          </StyledList>
        ))}
      </StyledTermsWrapper>
    </StyledWrapper>
  );
}

export default AcceptTerms;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5.6rem;
  & > h3 {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 2.2rem;
    color: ${theme.colors.black2};
  }
`;
const StyledTermsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 52.8rem;
  height: 23.4rem;
  background-color: white;
  border: 1px solid ${theme.colors.purpleText};
  border-radius: 5px;
  margin-top: 2rem;
  gap: 2rem;
`;

const StyledList = styled.div<{ order: number; isNecessary: boolean }>`
  display: flex;
  align-items: center;
  margin-left: 2.5rem;
  order: ${({ order }) => order};

  & > span {
    font-size: 1.3rem;
    font-weight: 500;
    line-height: 1.9rem;
    color: ${({ isNecessary }) => (isNecessary ? theme.colors.purpleText : theme.colors.gray2)};
  }
`;

const StyledCheckBtn = styled.div<{ isChecked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 1.4rem;
  background-color: ${({ isChecked }) => isChecked && theme.colors.purpleText};
  border: 1px solid ${theme.colors.purpleText};
  border-radius: 5px;
  cursor: pointer;
`;

const StyledListContent = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 19px;
  margin-right: 0.8rem;
  color: ${theme.colors.black2};

  & > a {
    color: ${theme.colors.black2};
  }
`;

const StyledLine = styled.div`
  height: 0.2rem;
  margin: 0 2.4rem;
  background-color: ${theme.colors.grayBg};
  order: 1;
`;
