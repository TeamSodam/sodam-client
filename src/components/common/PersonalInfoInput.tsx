import SignupOption from 'components/Auth/SignupOption';
import { joinInfoList } from 'constants/joinInfoList';
import useInput from 'hooks/useInput';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { UserSignupRequest } from 'types/auth';

interface PersonalInfoInputProps {
  inputType: keyof UserSignupRequest;
  handleOnChange: (type: keyof UserSignupRequest, value: string) => void;
  handleComplete: (type: keyof UserSignupRequest, value: boolean) => void;
  passwordError: boolean | null | '';
  order: number;
  isCompleteList: { [key: string]: boolean };
}

function PersonalInfoInput(props: PersonalInfoInputProps) {
  const { inputType, handleOnChange, handleComplete, passwordError, order, isCompleteList } = props;
  const inputInfo = joinInfoList[inputType];
  const { isError, ...inputValue } = useInput(inputType, handleOnChange);
  const [isConfirm, setIsConfirm] = useState(false);

  useEffect(() => {
    if (inputType === 'name' || inputType === 'password') {
      handleComplete(inputType, !isError);
    }
  }, [isError, handleComplete, inputType]);

  useEffect(() => {
    setIsConfirm(false);
    if (inputType === 'nickname' || inputType === 'email') handleComplete(inputType, false);
  }, [inputValue.value, handleComplete, inputType]);

  const handleConfirm = (type: keyof UserSignupRequest, value: boolean) => {
    setIsConfirm(true);
    handleComplete(type, value);
  };

  const getNotice = (type: keyof UserSignupRequest, isConfirm: boolean) => {
    if ((type === 'passwordConfirm' && passwordError) || (isError && inputValue.value)) {
      return inputInfo.notice;
    }

    if (type === 'nickname' && isConfirm) {
      if (isCompleteList.nickname) {
        return inputInfo.completeNotice;
      }
      return inputInfo.unCompleteNotice;
    }

    if (type === 'email' && isConfirm) {
      if (!isCompleteList.email) {
        return inputInfo.unCompleteNotice;
      }
    }

    if (type === 'emailConfirm' && isConfirm) {
      if (isCompleteList.emailConfirm) {
        return inputInfo.completeNotice;
      }
      return inputInfo.unCompleteNotice;
    }

    return null;
  };

  return (
    <StyledRoot order={order}>
      <StyledTitleWrapper>
        <StyledTitle type={inputType}>
          {inputInfo.title} <em>*</em>
        </StyledTitle>
        {inputType === 'password' && (
          <StyledNotice>????????? ????????? + ????????? ???????????? 8?????? ?????? 15??? ??????</StyledNotice>
        )}
      </StyledTitleWrapper>
      <StyledInputWrapper>
        <input
          type={inputInfo.type}
          {...inputValue}
          placeholder={inputInfo.placeholder}
          disabled={inputType === 'emailConfirm' && isCompleteList[inputType]}
        />
        <SignupOption
          type={inputType}
          error={isError}
          isCompleteList={isCompleteList}
          value={inputValue.value}
          handleConfirm={handleConfirm}
        />
      </StyledInputWrapper>
      <StyledNoticeErr>{getNotice(inputType, isConfirm)}</StyledNoticeErr>
    </StyledRoot>
  );
}

export default PersonalInfoInput;

const StyledRoot = styled.div<Pick<PersonalInfoInputProps, 'order'>>`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  & > input :disabled {
    background-color: white;
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
