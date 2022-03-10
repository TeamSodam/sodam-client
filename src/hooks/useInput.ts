import { ChangeEvent, useState } from 'react';

function useInput(inputType: string, handleOnChange: (type: string, value: string) => void) {
  const [value, setValue] = useState('');
  const [valueRegex, setValueRegex] = useState<RegExp>(/^$/);
  const [error, setError] = useState(false);
  const getValueRegex = (type: string) => {
    switch (type) {
      case 'name':
        setValueRegex(/^[가-힣]{2,7}$/);
        break;
      case 'nickname':
        setValueRegex(/^[가-힣a-z0-9]{2,20}$/);
        break;
      case 'email':
        setValueRegex(
          /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/,
        );
        break;
      case 'password':
        setValueRegex(/^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9$@$!%*#?&]{8,14}$/);
        break;
      case 'passwordConfirm':
        setValueRegex(/^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9$@$!%*#?&]{8,14}$/);
        break;
      default:
        break;
    }
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    getValueRegex(inputType);
    setValue(e.target.value);
    handleOnChange !== null ? handleOnChange(inputType, e.target.value) : null;

    if (!e.target.value || valueRegex.test(e.target.value)) setError(false);
    else setError(true);
  };

  return { value, onChange, error };
}

export default useInput;
