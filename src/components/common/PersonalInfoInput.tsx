import SignupOption from 'components/Auth/SignupOption';
import useInfoType from 'hooks/useInfoType';
import useInput from 'hooks/useInput';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { UserSignupRequest } from 'types/user';

interface PersonalInfoInputProps {
  inputType: keyof UserSignupRequest;
  handleOnChange: (type: keyof UserSignupRequest, value: string) => void;
  handleComplete: (type: keyof UserSignupRequest, value: boolean) => void;
  passwordError: boolean | null | '';
  order: number;
}

function PersonalInfoInput(props: PersonalInfoInputProps) {
  const { inputType, handleOnChange, handleComplete, passwordError, order } = props;
  const inputInfo = useInfoType(inputType);
  const inputValue = useInput(inputType, handleOnChange);

  useEffect(() => {
    if (
      inputType !== 'emailConfirm' &&
      inputType !== 'nickname' &&
      inputType !== 'passwordConfirm'
    ) {
      handleComplete(inputType, !inputValue.error);
    }
  }, [inputValue.error]);

  return (
    <StyledRoot order={order}>
      <StyledTitleWrapper>
        <StyledTitle type={inputType}>
          {inputInfo.title} <em>*</em>
        </StyledTitle>
        {inputType === 'password' && (
          <StyledNotice>‘영문 소문자 + 숫자’ 포함하여 8글자 이상 15자 미만</StyledNotice>
        )}
      </StyledTitleWrapper>
      <StyledInputWrapper>
        <input type={inputInfo.type} {...inputValue} placeholder={inputInfo.placeholder} />
        <SignupOption type={inputType} error={inputValue.error} />
      </StyledInputWrapper>
      {(inputType === 'passwordConfirm' && passwordError) ||
      (inputValue.error && inputValue.value) ? (
        <StyledNoticeErr>{inputInfo.notice}</StyledNoticeErr>
      ) : (
        <StyledNoticeErr />
      )}
    </StyledRoot>
  );
}

export default PersonalInfoInput;

const StyledRoot = styled.div<Pick<PersonalInfoInputProps, 'order'>>`
  display: flex;
  flex-direction: column;
  order: ${(props) => props.order};
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTitle = styled.h3<{ type: string }>`
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 2.2rem;
  color: ${({ type }) => (type === 'emailConfirm' ? theme.colors.gray1 : theme.colors.black2)};
  & > em {
    font-size: 1.2rem;
    margin-left: 0.2rem;
    color: ${theme.colors.purpleText};
  }
`;

const StyledInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 52.8rem;
  height: 5rem;
  background-color: white;
  border: 1px solid ${theme.colors.purpleText};
  border-radius: 5px;
  margin-top: 0.9rem;
  & > input {
    flex: 1;
    outline: 0;
    border: 0;
    color: ${theme.colors.black2};
    font-size: 1.3rem;
    font-weight: 500;
    margin-left: 1.6rem;
  }
  & > input ::placeholder {
    color: ${theme.colors.tooltipSub};
  }
`;

const StyledNotice = styled.span`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.4rem;
  color: ${theme.colors.purpleText};
`;

const StyledNoticeErr = styled.div`
  height: 17px;
  font-size: 1.2rem;
  line-height: 1.7rem;
  color: ${theme.colors.purpleText};
  margin-top: 0.4rem;
`;
