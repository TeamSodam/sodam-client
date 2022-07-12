import useClipboard from 'hooks/useClipboard';
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import shortid from 'shortid';
import styled from 'styled-components';
import { theme } from 'styles/theme';

function AuthNumForm() {
  const [authNums, setAuthNums] = useState(new Array(4).fill('')); // authNums 인증번호 4자리를 배열로 관리
  const inputParentRef = useRef<HTMLDivElement>(null); // input 태그 4개를 감싸는 부모 태그의 ref
  const focusIdx = useRef(0); // 포커스를 줄 input 태그의 인덱스

  useClipboard(inputParentRef, setAuthNums);

  const focusTargetInput = useCallback((targetIdx: number) => {
    const inputParent = inputParentRef.current;
    if (inputParent) {
      const targetChild = inputParent.children[targetIdx];
      if (targetChild instanceof HTMLInputElement) targetChild.focus();
    }
  }, []);

  const handleChangeAuthNum = (e: ChangeEvent<HTMLInputElement>, authNumIdx: number) => {
    setAuthNums((prevAuthNums) => {
      const nextAuthNums = [...prevAuthNums];
      nextAuthNums.splice(authNumIdx, 1, e.target.value);
      // 첫번째인자 : 인덱스, 두번째 인자: 몇개바꿀건지, 3번째인자: 뭐로 바꿀건지??
      // authNumIdx 번째에있는 값에서 첫번쨰를, e.target.value로 바꿔라
      // 내가 입력한 값으로 해당하는 배열원소의 값을 바까라! 이해됨?
      if (e.target.value) focusIdx.current = authNumIdx + 1;
      else focusIdx.current = authNumIdx - 1 < 0 ? 0 : authNumIdx - 1;
      return nextAuthNums;
    });
  };

  const handleKeyPressAtEmpty = (e: KeyboardEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    // 백스페이스를 눌러서 포커스가 <- 이 방향으로 갱신되어야할 때.
    if (e.key === 'Backspace' && !e.target.value) {
      setAuthNums([...authNums]);
      focusIdx.current = focusIdx.current - 1 < 0 ? 0 : focusIdx.current - 1;
    }
  };

  useEffect(() => {
    focusTargetInput(focusIdx.current);
  }, [authNums, focusTargetInput]);

  return (
    <StyledRoot>
      <StyledTitleWrapper>
        <h3>인증번호 입력</h3>
        <p>회원님의 이메일로 발송된 인증번호 네자리를 입력해주세요</p>
      </StyledTitleWrapper>
      <StyledInputWrapper ref={inputParentRef}>
        {authNums.map((authNum, authNumIdx) => (
          <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={authNumIdx === 0 && focusIdx.current === 0}
            key={shortid()}
            type="tel"
            maxLength={1}
            min="0"
            max="9"
            value={authNum}
            onChange={(e) => handleChangeAuthNum(e, authNumIdx)}
            onKeyDown={handleKeyPressAtEmpty}
          />
        ))}
      </StyledInputWrapper>
      <StyledWarningMessage>인증번호가 일치하지 않습니다.</StyledWarningMessage>
      <StyledOkBtn type="submit">확인</StyledOkBtn>
      <StyledResendBtn type="submit">인증번호 재발송</StyledResendBtn>
    </StyledRoot>
  );
}
const StyledRoot = styled.div`
  width: 39.1rem;
  height: 100%;
  padding: 12rem 0 9.8rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitleWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 5.8rem;

  & > h3 {
    margin-bottom: 1.6rem;
    font-weight: 700;
    font-size: 2.6rem;
    line-height: 3.8rem;
    color: ${theme.colors.purpleText};
  }

  & > p {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 2.2rem;
    color: ${theme.colors.black2};
  }
`;

const StyledInputWrapper = styled.div`
  width: 26.2rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3.2rem;

  & > input {
    width: 5.5rem;
    height: 7.1rem;
    border: 1px solid ${theme.colors.purpleText};
    border-radius: 5px;
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 3.4rem;
    color: ${theme.colors.black2};
    text-align: center;
  }
`;

const StyledWarningMessage = styled.p`
  font-size: 1.4rem;
  margin-bottom: 1.6rem;
  line-height: 2rem;
  margin-bottom: 1.6rem;
  color: ${theme.colors.purpleText};
`;

const StyledOkBtn = styled.button`
  width: 39.1rem;
  height: 4.6rem;
  margin-bottom: 1.6rem;
  background-color: ${theme.colors.gray2};
  border-radius: 5px;
  border: 0;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
`;

const StyledResendBtn = styled.button`
  width: 39.1rem;
  height: 4.6rem;
  background-color: ${theme.colors.purpleMain};
  border-radius: 5px;
  border: 0;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
`;

export default AuthNumForm;
