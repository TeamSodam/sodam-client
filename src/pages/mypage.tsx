import UserInfoWrap from 'components/Mypage/UserInfoWrap';
import UserTheme from 'components/Mypage/UserTheme';
import {
  useGetUserImageQuery,
  useGetUserInfoQuery,
  useGetUserThemeQuery,
} from 'features/users/userApi';
import React from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

function Mypage() {
  const { data: userInfo } = useGetUserInfoQuery();
  const { data: userImage } = useGetUserImageQuery();
  const { data: userTheme } = useGetUserThemeQuery();

  if (!userInfo || !userImage || !userTheme) return null;
  return (
    <StyledRoot>
      <UserInfoWrap userInfo={userInfo} userImage={userImage} />
      <UserTheme userTheme={userTheme} />
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;
  min-height: 78.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${applyMediaQuery('mobile')} {
    min-height: 41.7rem;
    margin: 3.1rem 0;
    justify-content: flex-start;
  }
`;

export default Mypage;
