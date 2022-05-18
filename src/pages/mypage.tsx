import UserInfoWrap from 'components/Mypage/UserInfoWrap';
import UserTheme from 'components/Mypage/UserTheme';
import {
  useGetUserImageQuery,
  useGetUserInfoQuery,
  useGetUserThemeQuery,
} from 'features/users/userApi';
import React from 'react';
import styled from 'styled-components';

function Mypage() {
  const { data: userInfo } = useGetUserInfoQuery();
  const { data: userImage } = useGetUserImageQuery();
  const { data: userTheme } = useGetUserThemeQuery();

  if (!userInfo || !userImage || !userTheme) return <>Data Not Found</>;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Mypage;
