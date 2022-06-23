import { useAppDispatch } from 'app/hook';
import UserInfoWrap from 'components/Mypage/UserInfoWrap';
import UserTheme from 'components/Mypage/UserTheme';
import {
  useGetUserImageQuery,
  useGetUserInfoQuery,
  useGetUserThemeQuery,
} from 'features/users/userApi';
import { logout } from 'features/users/userSlice';
import useMedia from 'hooks/useMedia';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

function Mypage() {
  const { isMobile } = useMedia();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: userInfo } = useGetUserInfoQuery();
  const { data: userImage } = useGetUserImageQuery();
  const { data: userThemeWrap } = useGetUserThemeQuery();

  const handleClickLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  if (!userInfo || !userImage || !userThemeWrap) return null;
  return (
    <StyledRoot>
      <UserInfoWrap userInfo={userInfo} userImage={userImage} />
      <UserTheme userTheme={userThemeWrap.theme} />
      {isMobile && <LogoutButton onClick={handleClickLogout}>로그아웃</LogoutButton>}
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 11rem auto;
  ${applyMediaQuery('mobile')} {
    min-height: 41.7rem;
    margin: 3.1rem 0;
    justify-content: flex-start;
  }
`;

const LogoutButton = styled.button`
  all: unset;

  margin-top: auto;
  margin-left: auto;
  align-self: flex-end;

  padding: 0 1.2rem;
  color: ${({ theme }) => theme.colors.purpleMain};
  font-size: 1.1rem;
  line-height: 1.6rem;
  font-weight: 500;
`;

export default Mypage;
