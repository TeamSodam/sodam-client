import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from 'styles/theme';
import { UserTheme as UserThemeType } from 'types/user';

import UserThemeItem from './UserThemeItem';

interface Props {
  userTheme: UserThemeType;
}

function UserTheme(props: Props) {
  const { userTheme } = props;

  const themeList: UserThemeType = ['아기자기한', '힙한', '모던한', '빈티지'];

  const [editMode, setEditMode] = useState(false);

  const onClickHandler = () => {
    setEditMode(!editMode);
  };

  return (
    <StyledRoot>
      <div>
        <h3>선호 소품샵 테마</h3>
        <button onClick={onClickHandler}>{editMode ? '수정 완료' : '테마 수정'}</button>
      </div>
      <div>
        {themeList.map((theme) => (
          <UserThemeItem key={theme} themeType={theme} isSelected={userTheme.includes(theme)} />
        ))}
      </div>
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  width: 66.4rem;
  height: 22.1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  & > div {
    display: flex;
    justify-content: space-between;
  }
  & > div:first-child {
    width: 56rem;
    margin-bottom: 3.8rem;
    button {
      border: none;
      width: 6.2rem;
      height: 2.2rem;
      border-radius: 0.5rem;
      color: white;
      background-color: ${theme.colors.purpleMain};
      line-height: 2.2rem;
      font-size: 1rem;
      font-weight: 500;
    }
  }
  & > div:last-child {
    width: 51.9rem;
  }
  h3 {
    font-size: 1.5rem;
    font-weight: 500;
    color: ${theme.colors.purpleText};
    line-height: 2.2rem;
  }
`;

export default UserTheme;
