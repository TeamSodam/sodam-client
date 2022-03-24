function useInfoType(inputType: string) {
  interface ObjectsType {
    [key: string]: {
      title: string;
      type: string;
    };
  }
  const objectsOfType: ObjectsType = {
    name: { title: '이름', type: 'text' },
    nickname: { title: '닉네임', type: 'text' },
    email: { title: 'ID (이메일)', type: 'email' },
    emailConfirm: { title: 'ID (이메일) 인증번호', type: 'string' },
    password: { title: 'PW', type: 'password' },
    passwordConfirm: { title: 'PW 확인', type: 'password' },
  };

  return { ...objectsOfType[inputType] };
}
export default useInfoType;
