import { useEditUserThemeMutation } from 'features/users/userApi';
import React, { useState } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';
import { theme } from 'styles/theme';
import { ShopThemeType } from 'types/shop';
import { UserTheme as UserThemeType } from 'types/user';

import UserThemeItem from './UserThemeItem';

interface Props {
  userTheme: UserThemeType;
}

function UserTheme(props: Props) {
  const { userTheme } = props;

  const themeList: UserThemeType = ['아기자기한', '힙한', '모던한', '빈티지'];

  const [editUserTheme] = useEditUserThemeMutation();

  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState<UserThemeType>(userTheme);

  const onSubmit = async () => {
    await editUserTheme(selected);
  };

  const onClickHandler = () => {
    if (editMode) {
      onSubmit();
    }
    setEditMode(!editMode);
  };

  const onToggleTheme = (value: ShopThemeType) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <StyledRoot>
      <div>
        <h3>선호 소품샵 테마</h3>
        <button onClick={onClickHandler}>{editMode ? '수정 완료' : '테마 수정'}</button>
      </div>
      <div>
        {themeList.map((theme) => (
          <UserThemeItem
            key={theme}
            themeType={theme}
            isSelected={selected.includes(theme)}
            canEdit={editMode}
            onToggle={onToggleTheme}
          />
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
  ${applyMediaQuery('tablet')} {
    width: 55rem;
    & > div:first-child {
      width: 50.6rem;
    }
    & > div:last-child {
      width: 48rem;
    }
  }
  ${applyMediaQuery('mobile')} {
    width: 31.2rem;
    height: 13.6rem;
    & > div:first-child {
      width: 31.2rem;
      margin-bottom: 2.3rem;
      button {
        width: 4rem;
        height: 1.5rem;
        border-radius: 0.3rem;
        line-height: 1.5rem;
        font-size: 1rem;
      }
    }
    & > div:last-child {
      width: 29.6rem;
    }
    h3 {
      font-size: 1.1rem;
      line-height: 1.6rem;
    }
  }
`;

export default UserTheme;
