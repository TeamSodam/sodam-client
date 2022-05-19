import { ChangeEvent, useState } from 'react';
import { UserSignupRequest } from 'types/user';

function useInput(
  inputType: keyof UserSignupRequest,
  handleOnChange: (type: keyof UserSignupRequest, value: string) => void,
) {
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(true);
  interface RegMapperType {
    [key: string]: RegExp;
  }
  const RegMapper: RegMapperType = {
    name: /^[가-힣]{2,7}$/,
    nickname: /^[가-힣a-z0-9]{2,20}$/,
    email: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    emailConfirm: /^[0-9]{1,}$/,
    password: /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9$@$!%*#?&]{8,14}$/,
    passwordConfirm: /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9$@$!%*#?&]{8,14}$/,
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (handleOnChange) {
      handleOnChange(inputType, e.target.value);
    }

    if (RegMapper[inputType].test(e.target.value)) setIsError(false);
    else setIsError(true);
  };

  return { value, onChange, isError };
}

export default useInput;
