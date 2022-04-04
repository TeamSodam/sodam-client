function useInfoType(inputType: string) {
  interface ObjectsType {
    [key: string]: {
      [key: string]: string;
    };
  }
  const objectsOfType: ObjectsType = {
    name: { title: '이름', type: 'text', placeholder: '', notice: '입력 형식에 맞지 않습니다' },
    nickname: {
      title: '닉네임',
      type: 'text',
      placeholder: '리뷰 작성 시 사용할 닉네임을 적어주세요',
      notice: '입력 형식에 맞지 않습니다',
      btnNotice: '이미 가입된 이메일입니다.',
    },
    email: {
      title: 'ID (이메일)',
      type: 'email',
      placeholder: 'example@naver.com',
      notice: '입력 형식에 맞지 않습니다',
      btnNotice: '이미 사용중인 닉네임입니다',
      completeNotice: '사용 가능한 닉네임입니다',
    },
    emailConfirm: {
      title: 'ID (이메일) 인증번호',
      type: 'string',
      placeholder: '',
      notice: '인증번호가 일치하지 않습니다',
    },
    password: {
      title: 'PW',
      type: 'password',
      placeholder: '',
      notice: '입력 형식에 맞지 않습니다',
    },
    passwordConfirm: {
      title: 'PW 확인',
      type: 'password',
      placeholder: '',
      notice: '비밀번호가 일치하지 않습니다',
    },
  };

  return { ...objectsOfType[inputType] };
}
export default useInfoType;
