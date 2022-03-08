import { ChangeEvent, useState } from 'react';

function useInput(inputType: string, handleOnChange: (type: string, value: string) => void) {
  const [value, setValue] = useState('');
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    handleOnChange !== null ? handleOnChange(inputType, value) : null;
  };

  return { value, onChange };
}

export default useInput;
