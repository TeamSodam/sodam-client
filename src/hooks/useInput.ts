import { ChangeEvent, useState } from 'react';

function useInput(inputType: string, handleOnChange: (type: string, value: string) => void) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  interface RegMapperType {
    [key: string]: RegExp;
  }
  const RegMapper: RegMapperType = {
    name: /^[가-힣]{2,7}$/,
    nickname: /^[가-힣a-z0-9]{2,20}$/,
    email: /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/,
    emailConfirm: /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/,
    password: /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9$@$!%*#?&]{8,14}$/,
    passwordConfirm: /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9$@$!%*#?&]{8,14}$/,
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (handleOnChange) {
      handleOnChange(inputType, e.target.value);
    }

    if (!e.target.value || RegMapper[inputType].test(e.target.value)) setError(false);
    else setError(true);
  };

  return { value, onChange, error };
}

export default useInput;
