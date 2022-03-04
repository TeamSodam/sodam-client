import PersonalInfoInput from 'components/common/PersonalInfoInput';
import React from 'react';
import styled from 'styled-components';

function SignupForm() {
  const SignupTypeList = ['이름', '닉네임', 'ID (이메일)', 'ID (이메일) 인증번호', 'PW', 'PW 확인'];

  return (
    <StyledRoot>
      {SignupTypeList.map((type) => (
        <PersonalInfoInput key={type} title={type} />
      ))}
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;
export default SignupForm;
