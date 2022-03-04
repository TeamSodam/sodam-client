import React from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';

interface SignupOptionProps {
  type: string;
}
function SignupOption(props: SignupOptionProps) {
  const { type } = props;

  const getSignOption = (type: string) => {
    switch (type) {
      case '닉네임':
        return <StyledBtn>중복확인</StyledBtn>;
      case 'ID (이메일) 인증번호':
        return <StyledBtn>확인</StyledBtn>;
      case 'PW':
        return <StyledNotice>‘영문 소문자 + 숫자’ 포함하여 8글자 이상 15자 미만</StyledNotice>;
      default:
        return null;
    }
  };

  return getSignOption(type);
}

const StyledBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6.1rem;
  height: 2.2rem;
  border-radius: 5px;
  border: 0;
  outline: 0;
  background-color: ${theme.colors.purpleMain};
  color: white;
  font-weight: 500;
  font-size: 1rem;
  line-height: 2.2rem;
`;

const StyledNotice = styled.span`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.4rem;
  color: ${theme.colors.purpleText};
`;

export default SignupOption;
