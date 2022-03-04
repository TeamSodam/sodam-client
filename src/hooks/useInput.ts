import { ChangeEvent, useState } from 'react';

function useInput() {
  const [value, setValue] = useState('');
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  return { value, onChange };
}

export default useInput;
