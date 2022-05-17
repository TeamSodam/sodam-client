import UserInfoWrap from 'components/Mypage/UserInfoWrap';
import {
  useGetUserImageQuery,
  useGetUserInfoQuery,
  useGetUserThemeQuery,
} from 'features/users/userApi';
import React from 'react';

function Mypage() {
  const { data: userInfo } = useGetUserInfoQuery();
  const { data: userImage } = useGetUserImageQuery();
  const { data: userTheme } = useGetUserThemeQuery();

  if (!userInfo) return <>loading</>;
  if (!userImage) return <>loading</>;
  return <UserInfoWrap userInfo={userInfo} userImage={userImage} />;
}

export default Mypage;
