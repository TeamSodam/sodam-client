import { useAppDispatch, useAppSelector } from 'app/hook';
import UserInfoWrap from 'components/Mypage/UserInfoWrap';
import UserTheme from 'components/Mypage/UserTheme';
import {
  useGetUserImageQuery,
  useGetUserInfoQuery,
  useGetUserThemeQuery,
} from 'features/users/userApi';
import { logout, selectIsLogin } from 'features/users/userSlice';
import useMedia from 'hooks/useMedia';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { applyMediaQuery } from 'styles/mediaQuery';

function Mypage() {
  const { isMobile, isTablet } = useMedia();
  const isLogin = useAppSelector(selectIsLogin);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: userInfo } = useGetUserInfoQuery();
  const { data: userImage } = useGetUserImageQuery();
  const { data: userThemeWrap } = useGetUserThemeQuery();

  const handleClickLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  useEffect(() => {
    if (!isLogin) {
      router.push('/');
    }
  }, [isLogin]);

  if (!userInfo || !userImage || !userThemeWrap)
    return (
      <StyledRoot>
        {(isMobile || isTablet) && (
          <LogoutButton onClick={handleClickLogout}>로그아웃</LogoutButton>
        )}
      </StyledRoot>
    );

  return (
    <StyledRoot>
      <UserInfoWrap userInfo={userInfo} userImage={userImage} />
      <UserTheme userTheme={userThemeWrap.theme} />
      {(isMobile || isTablet) && <LogoutButton onClick={handleClickLogout}>로그아웃</LogoutButton>}
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
  ${applyMediaQuery('mobile', 'tablet')} {
    margin: 0;
    margin-top: 3rem;
    justify-content: flex-start;
  }
  ${applyMediaQuery('mobile')} {
    margin-top: 1.4rem;
  }
`;

const LogoutButton = styled.button`
  all: unset;

  align-self: flex-end;
  margin-top: 10.5rem;
  margin-bottom: 5rem;

  padding: 0 1.2rem;
  color: ${({ theme }) => theme.colors.purpleMain};
  font-size: 1.1rem;
  line-height: 1.6rem;
  font-weight: 500;
  ${applyMediaQuery('tablet')} {
    font-size: 1.3rem;
  }
`;

export default Mypage;
